import { useEffect, useState } from "react";
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from "../abi/kip17Abi.js";
import axios from "axios";
import Web3 from "web3";
import Caver from 'caver-js';
import useLocalStorage from '../storage/useLocalStorage';

import LikeButton from './Likebutton.js';
import Comment from '../components/comment.js';
import CommentLoad from '../components/commentLoad.js';
import Nodata from '../components/Nodata';
import Loading from "./Loading.js";

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
  const [test, setTest] = useState([])

  useEffect(async () => {
    // 팔로워 목록 조회
    await axios.get(`http://localhost:4000/follow/${userId}`)
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
      const postInfo = await (await axios.get(`http://localhost:4000/post/${tokenId}/${networkType}`)).data.data;

      if (String(tokenOwner).toLowerCase() !== account.toLowerCase()) {
        // isAll이 true면 본인 제외 전체 피드 로드
        if (isAll) {
          setNFTList((prevState) => {
            return [...prevState, { postInfo, tokenId, metadata }];
          });
        } else {  // false면 팔로워 피드만 로드(...정상작동하지 않음 전체 피드만 불러옴)
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
      const follow = await axios.post('http://localhost:4000/follow/', followInfo)
        .then((res) => {
          const result = res.data.data;
          if (result !== null) {
            for (let el of elements) {
              el.textContent = 'unfollow';
            }
          }
        });
    } else {
      const unfollow = await axios.post('http://localhost:4000/follow/unfollow/', followInfo)
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
    await axios.get(`http://localhost:4000/follow/${userId}`)
      .then((res) => {
        setFollowList(res.data.data);
      });
  }

  const UserSelected = (e) => {
    const targetId = e.target.getAttribute('data-selectuser-id')
    const targetWallet = e.target.getAttribute('data-selectuser-wallet')

    localStorage.setItem('selectedUser', targetId)
    localStorage.setItem('selectedUserWallet', targetWallet);
    window.location.replace(`http://localhost:3000/${targetId}`);
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
                  <div className="user">
                    <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                      <div className="d-flex flex-row align-items-center feed-text px-2" >
                        <img className="rounded-circle" src={token.postInfo.user.profile_image} alt={"profile"} width="45" onClick={UserSelected} data-selectuser-id={token.postInfo.user._id} data-selectuser-wallet={token.postInfo.user.wallet_address}></img>
                        <div className="d-flex flex-column flex-wrap ml-2">
                          <span class="username" onClick={UserSelected} data-selectuser-id={token.postInfo.user._id} data-selectuser-wallet={token.postInfo.user.wallet_address}>
                            {token.postInfo.user.user_name.length > 10 ?
                              token.postInfo.user.user_name.slice(0, 4) + '···' + token.postInfo.user.user_name.slice(-4) :
                              token.postInfo.user.user_name
                            }
                          </span>
                        </div>
                      </div>
                      <div className="post-time">
                        <span>{token.postInfo.post_date.split('T')[0]}</span>
                      </div>
                      <div className="follow">
                        <button className={`follow_${token.postInfo.user._id}`} data-user={token.postInfo.user._id} onClick={followHandler}>
                          {followList.filter(follow => (follow.follower._id === token.postInfo.user._id)).length > 0 ? "unfollow" : "follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="post-image">
                    <img src={token.metadata.image} className="post-image" alt={token.tokenId} />
                  </div>
                  <div className="post-content">
                    <LikeButton postId={token.postInfo._id} userId={userId} postAddress={token.postInfo.user.wallet_address} />
                    <p className="description">
                      {
                        token.metadata.description.split("\n").map((line) => {
                          return (
                            <span>{line}<br /></span>
                          );
                        })
                      }
                    </p>
                    <div className="comments" id={`comments_${token.postInfo._id}`}>
                      <CommentLoad postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} />
                    </div>
                  </div>
                  <Comment postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} />
                </div>
              </div>
            );
          })
          : <Nodata />
      }
    </div>
  );
}

export default NFTList