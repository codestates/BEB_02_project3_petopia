import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from '../abi/kip17Abi.js';
import Caver from "caver-js";
import Web3 from "web3";

function MyFollowList({ userId, account }) {
    const [followerModal, setFollowerModal] = useState(false);
    const [followModal, setFollowModal] = useState(false);

    const [followList, setFollowList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [postCnt, setPostCnt] = useState(0);
    // const web3 = new Web3(window.ethereum);
    // const caver = new Caver(window.klaytn);
    // const contractAddress = JSON.parse(localStorage.getItem('contractAddress'));

    setTimeout(() => {
        setPostCnt(localStorage.getItem('postCnt'))
    }, 3000);

    useEffect(async () => {
        // await loadNFT();
        // 내가 팔로우하는사람(팔로잉)
        await axios.get(`http://localhost:4000/follow/${userId}`)
            .then((res) => {
                setFollowList(res.data.data);
            });

        //나를 팔로우하는사람 (팔로워)
        await axios.get(`http://localhost:4000/follow/follower/${userId}`)
            .then((res) => {
                setFollowerList(res.data.data);
            });

    }, [])

    // const loadNFT = async () => {
    //     // const tokenContract = await new web3.eth.Contract(erc721Abi, contractAddress);
    //     const tokenContract = await new caver.klay.Contract(kip17Abi, contractAddress);
    //     const totalSupply = await tokenContract.methods.totalSupply().call();

    //     let arr = [];

    //     for (let i = 1; i <= totalSupply; i++) {
    //         arr.push(i);
    //     }
    //     arr = arr.map(el => el).reverse()
    //     let cnt = 0;
    //     for (let tokenId of arr) {
    //         let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
    //         if (String(tokenOwner).toLowerCase() === account.toLowerCase()) {
    //             cnt += 1;
    //         }
    //     }
    //     setPostCnt(cnt);
    // };

    const followerBtn = () => {
        setFollowerModal(true)
    }

    const followBtn = () => {
        setFollowModal(true)
    }

    const ModalClose = () => {
        setFollowModal(false)
        setFollowerModal(false)

        window.location.reload()
    }

    const userSelect = (e) => {
        const targetId = e.target.getAttribute('data-id');
        const targetWallet = e.target.getAttribute('data-wallet');
        const loginId = localStorage.getItem('userId');

        if (targetId === loginId) {
            window.location.replace(`http://localhost:3000/mypage`);
        } else {
            localStorage.setItem('selectedUser', targetId)
            localStorage.setItem('selectedUserWallet', targetWallet);
            window.location.replace(`http://localhost:3000/${targetId}`);
        }
    }

    const followHandler = async (e) => {
        const btnName = e.target.getAttribute('name');
        const btnText = e.target.textContent;
        const followInfo = {
            followee: userId,
            follower: e.target.getAttribute('data-user')
        };

        if (btnText === 'follow') {
            await axios.post('http://localhost:4000/follow/', followInfo)
                .then((res) => {
                    const result = res.data.data;
                    if (result !== null) {
                        // follower 모달이면 팔로우 하면 버튼 삭제 following 모달이면 unfollow로 변경
                        btnName === 'follower' ? e.target.remove() : e.target.textContent = 'unfollow';
                    }
                });
        } else {
            await axios.post('http://localhost:4000/follow/unfollow/', followInfo)
                .then(async (res) => {
                    if (res.data.data) {
                        document.getElementById(`follow_${e.target.getAttribute('data-id')}`).remove();
                    }
                });
        }
    }

    const deleteFollowHandler = async (e) => {
        const followInfo = {
            followee: e.target.getAttribute('data-user'),
            follower: userId
        };

        await axios.post('http://localhost:4000/follow/delete/', followInfo)
            .then(async (res) => {
                if (res.data.data) {
                    document.getElementById(`follow_${e.target.getAttribute('data-id')}`).remove();
                }
            });

    }


    return (
        <div className="MyFollowList" >
            <span style={{ padding: "10px" }}>
                게시물 : {postCnt}
            </span>

            <span style={{ padding: "10px" }} onClick={followerBtn}>
                팔로워 : {followerList.length}
            </span>

            <span style={{ padding: "10px" }} onClick={followBtn} >
                팔로잉 : {followList.length}
            </span>

            <Modal show={followModal} onHide={ModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>팔로잉</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* user이미지, user이름, follow 상태 */}
                    {
                        followList.map((info) => {
                            return (
                                <div key={info._id} id={`follow_${info._id}`}>
                                    <img style={{ width: "50px", height: "50px" }} src={info.follower.profile_image} data-id={info.follower._id} data-wallet={info.follower.wallet_address} onClick={userSelect} />
                                    <span data-id={info.follower._id} onClick={userSelect}>
                                        {info.follower.user_name.length > 10 ?
                                            info.follower.user_name.slice(0, 4) + '···' + info.follower.user_name.slice(-4) :
                                            info.follower.user_name
                                        }
                                    </span>
                                    {
                                        userId === localStorage.getItem('userId')
                                            ? <button data-user={info.follower._id} data-id={info._id} name="following" onClick={followHandler}>unfollow</button>
                                            : ''
                                    }
                                </div>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>

            <Modal show={followerModal} onHide={ModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>팔로워</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            followerList.map((info) => {
                                return (
                                    <div key={info._id} id={`follow_${info._id}`}>
                                        <img style={{ width: "50px", height: "50px" }} src={info.followee.profile_image} data-id={info.followee._id} data-wallet={info.followee.wallet_address} onClick={userSelect} />
                                        <span data-id={info.followee._id} data-wallet={info.followee.wallet_address} onClick={userSelect}>
                                            {info.followee.user_name.length > 10 ?
                                                info.followee.user_name.slice(0, 4) + '···' + info.followee.user_name.slice(-4) :
                                                info.followee.user_name
                                            }
                                        </span>
                                        <button data-user={info.followee._id} data-id={info._id} onClick={deleteFollowHandler}>delete</button>
                                        {
                                            userId === localStorage.getItem('userId') && followList.filter(follow => (follow.follower._id === info.followee._id)).length === 0
                                                ? <button data-user={info.followee._id} data-id={info._id} name="follower" onClick={followHandler}>follow</button>
                                                : ''
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal.Body>
            </Modal>


        </div >
    )

}

export default MyFollowList;