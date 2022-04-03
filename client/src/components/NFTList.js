import { useEffect, useState } from "react";
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from "../abi/kip17Abi.js";
import axios from "axios";
import Web3 from "web3";
import Caver from 'caver-js';
import useLocalStorage from '../storage/useLocalStorage';
import { Modal } from "react-bootstrap";

import LikeButton from './Likebutton.js';
import Comment from './Comment.js';
import CommentLoad from './CommentLoad.js';
import Nodata from '../components/Nodata';
import Loading from "./Loading.js";
import Create from '../components/CreatePost.js';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;
const domain = process.env.REACT_APP_DOMAIN;

function NFTList({ account, isAll }) {
  const [NFTList, setNFTList] = useState([]);
  const [followList, setFollowList] = useState([]);
  const userId = localStorage.getItem('userId');
  const contractAddress = JSON.parse(localStorage.getItem('contractAddress'));
  const networkType = localStorage.getItem('networkType')
  const web3 = new Web3(window.ethereum);
  const caver = new Caver(window.klaytn);
  const isOpenReply = useLocalStorage('isOpenReply', false);
  const [isLoading, setIsLoading] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    // 팔로워 목록 조회
    await axios.get(`${host}/follow/${userId}`)
      .then((res) => {
        setFollowList(res.data.data);
      });

    loadNFT();
  }, [isAll]);

  const loadNFT = async () => {
    setIsLoading(true);
    // const tokenContract = await new web3.eth.Contract(erc721Abi, contractAddress);
    const tokenContract = await new caver.klay.Contract(kip17Abi, contractAddress);
    const totalSupply = await tokenContract.methods.totalSupply().call();
    setNFTList([]);
    let arr = [];

    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }
    arr = arr.map(el => el).reverse();

    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
      const metadata = await (await axios.get(`${tokenURI}`)).data;
      const postInfo = await (await axios.get(`${host}/post/${tokenId}/${networkType}`)).data.data;

      // isAll이 true면 전체 피드 로드
      if (isAll) {
        setNFTList((prevState) => {
          return [...prevState, { postInfo, tokenId, metadata }];
        });
      } else {  // false면 팔로워 피드만 로드
        if (String(tokenOwner).toLowerCase() !== account.toLowerCase()) {
          for (let follow of followList) {
            if (postInfo.user._id === follow.follower._id) {
              setNFTList((prevState) => {
                return [...prevState, { postInfo, tokenId, metadata }];
              });
            }
          }
        }
      }
      
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (<Loading />)
  }

  const followHandler = async (e) => {
    const btnText = e.target.textContent;
    const targetUser = e.target.getAttribute('data-user');
    const elements = document.getElementsByClassName(`follow_${targetUser}`);
    const followInfo = {
      followee: userId,
      follower: targetUser
    };

    if (btnText === 'follow') {
      const follow = await axios.post(`${host}/follow/`, followInfo)
        .then((res) => {
          const result = res.data.data;
          if (result !== null) {
            for (let el of elements) {
              el.textContent = 'unfollow';
            }
          }
        });
    } else {
      const unfollow = await axios.post(`${host}/follow/unfollow/`, followInfo)
        .then((res) => {
          const result = res.data.data;
          if (result) {
            for (let el of elements) {
              el.textContent = 'follow';
            }

            // only follow 페이지일 경우 언팔로우시 게시물 안 보이도록 처리
            if (!isAll) {

              const el = document.getElementsByName(`post_${targetUser}`)

              while (el.length > 0) {
                var sidebarAd = el[0];
                sidebarAd.parentNode.removeChild(sidebarAd);
              }
            }
          }
        });
    }

    // followList 재지정
    await axios.get(`${host}/follow/${userId}`)
      .then((res) => {
        setFollowList(res.data.data);
      });
  }

  const UserSelected = (e) => {
    const targetId = e.target.getAttribute('data-selectuser-id')
    const targetWallet = e.target.getAttribute('data-selectuser-wallet')

    localStorage.setItem('selectedUser', targetId)
    localStorage.setItem('selectedUserWallet', targetWallet);

    console.log(host)
    console.log(domain)
    console.log(targetId)
    console.log(userId)
    // if(targetId === userId) {
    //   window.location.href = `${domain}/mypage`;  
    // } else {
    //   window.location.href = `${domain}/${targetId}`;  
    // }
  }

  const modalOpen = () => {
    setShowModal(true)
  }

  const modalClose = () => {
    setShowModal(false)
  }

  return (
    <div className="nftList">
      {
        NFTList.length > 0
          ?
          NFTList.map((token) => {
            return (
              <div class="right-col">
                <div key={token.tokenId} className="post" name={`post_${token.postInfo.user._id}`}>

                <div className = "post-wrapper">
                  <div className="post-image">
                    <img src={token.metadata.image}  className="post-image" alt={token.tokenId}/>
                  </div>
                  <div class="right-contentWrapper">

                  {/* <div className="user"> */}
                    <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                      <div className="d-flex flex-row align-items-center feed-text px-2" >
                        <img className="rounded-circle" src={token.postInfo.user.profile_image} alt={"profile"} width="45" height="45" onClick={UserSelected} data-selectuser-id={token.postInfo.user._id} data-selectuser-wallet={token.postInfo.user.wallet_address}></img>
                          <span class="content-username" onClick={UserSelected} data-selectuser-id={token.postInfo.user._id} data-selectuser-wallet={token.postInfo.user.wallet_address}>
                            {token.postInfo.user.user_name.length > 10 ?
                              token.postInfo.user.user_name.slice(0, 4) + '···' + token.postInfo.user.user_name.slice(-4) :
                              token.postInfo.user.user_name
                            }
                          </span>
                      </div>
                      {
                        userId !== token.postInfo.user._id ?
                        <button className = "follow-button">
                          <div class="follow" className={`follow_${token.postInfo.user._id}`} data-user={token.postInfo.user._id} onClick={followHandler}>
                            {followList.filter(follow => (follow.follower._id === token.postInfo.user._id)).length > 0 ? "unfollow" : "follow"}
                          </div>
                        </button>
                        :<></>
                      }
                      <div className="post-time">
                        <span>{token.postInfo.post_date.split('T')[0]}</span>
                      </div>
                    </div>

                  <div className="post-content">
                  <p className="description">
                      {
                        token.metadata.description.split("\n").map((line) => {
                          return (
                            <span>{line}<br /></span>
                          );
                        })
                      }
                  </p>
                    <LikeButton postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} postAddress={token.postInfo.user.wallet_address} />
                    </div>
                  </div>
                  </div>


                  <Comment postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} />

                {/* <div className="comments" id={`comments_${token.postInfo._id}`}> */}
                      <CommentLoad postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} />
                    {/* </div> */}
                </div>
              </div>
            );
          })
          : <Nodata />
      }
      <div className = "modal-start"><button className="create-modal-all" onClick={modalOpen}>+</button></div> 
      <Modal show={showModal} onHide={modalClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-post-modal">
          <Create />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NFTList