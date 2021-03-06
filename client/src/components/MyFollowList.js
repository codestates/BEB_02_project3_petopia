import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from 'react-bootstrap';
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from '../abi/kip17Abi.js';
import Caver from "caver-js";
import Web3 from "web3";
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;
const domain = process.env.REACT_APP_DOMAIN;

function MyFollowList({ userId, account }) {
    const [followerModal, setFollowerModal] = useState(false);
    const [followModal, setFollowModal] = useState(false);

    const [followList, setFollowList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [postCnt, setPostCnt] = useState(0);
    const [isShow, setIsShow] = useState(false);

    setTimeout(() => {
        setPostCnt(localStorage.getItem('postCnt'));
        setIsShow(true);
    }, 1500);

    useEffect(async () => {
        // 내가 팔로우하는사람(팔로잉)
        await axios.get(`${host}/follow/${userId}`)
            .then((res) => {
                setFollowList(res.data.data);
            });

        //나를 팔로우하는사람 (팔로워)
        await axios.get(`${host}/follow/follower/${userId}`)
            .then((res) => {
                setFollowerList(res.data.data);
            });

    }, [])


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
            window.location.replace(`${domain}/mypage`);
        } else {
            localStorage.setItem('selectedUser', targetId)
            localStorage.setItem('selectedUserWallet', targetWallet);
            window.location.replace(`${domain}/${targetId}`);
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
            await axios.post(`${host}/follow/`, followInfo)
                .then((res) => {
                    const result = res.data.data;
                    if (result !== null) {
                        // follower 모달이면 팔로우 하면 버튼 삭제 following 모달이면 unfollow로 변경
                        btnName === 'follower' ? e.target.remove() : e.target.textContent = 'unfollow';
                    }
                });
        } else {
            await axios.post(`${host}/follow/unfollow/`, followInfo)
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

        await axios.post(`${host}/follow/delete/`, followInfo)
            .then(async (res) => {
                if (res.data.data) {
                    document.getElementById(`follow_${e.target.getAttribute('data-id')}`).remove();
                }
            });

    }


    return (
        <div className="MyFollowList" >
            <span className="Info-text" style={{ padding: "30px" }}>
                게시물 :&nbsp;
                {
                    !isShow ?
                        <Spinner className="loading" animation="border" role="status" size="sm">
                            <span className="visually"></span>
                        </Spinner>
                        : postCnt
                }
            </span>

            <span className="Info-text" style={{ padding: "30px" }} onClick={followerBtn}>
                팔로워 : {followerList.length}
            </span>

            <span className="Info-text" style={{ padding: "30px" }} onClick={followBtn} >
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
                                    <img style={{ width: "50px", height: "50px", borderRadius:"50%", marginRight:"20px" }} src={info.follower.profile_image} data-id={info.follower._id} data-wallet={info.follower.wallet_address} onClick={userSelect} />
                                    <span data-id={info.follower._id} onClick={userSelect}>
                                        {info.follower.user_name.length > 10 ?
                                            info.follower.user_name.slice(0, 4) + '···' + info.follower.user_name.slice(-4) :
                                            info.follower.user_name
                                        }
                                    </span>
                                    {
                                        userId === localStorage.getItem('userId')
                                            ? <button data-user={info.follower._id} data-id={info._id} name="following" onClick={followHandler} style={{background:"rgb(0, 162, 255)", fontSize:"12px",color:"white",fontWeight:"bold",borderRadius:"5px", border:"solid 1px white", width:"65px", height:"25px", marginLeft:"20px"}}>unfollow</button>
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
                                        <img style={{ width: "50px", height: "50px", borderRadius:"50%", marginRight:"20px" }} src={info.followee.profile_image} data-id={info.followee._id} data-wallet={info.followee.wallet_address} onClick={userSelect} />
                                        <span data-id={info.followee._id} data-wallet={info.followee.wallet_address} onClick={userSelect}>
                                            {info.followee.user_name.length > 10 ?
                                                info.followee.user_name.slice(0, 4) + '···' + info.followee.user_name.slice(-4) :
                                                info.followee.user_name
                                            }
                                        </span>
                                        <span style={{float:"right", "margin-top":"10px"}}>
                                        {
                                            userId === localStorage.getItem('userId') ?
                                            <button data-user={info.followee._id} data-id={info._id} onClick={deleteFollowHandler} style={{background:"rgb(0, 162, 255)", fontSize:"12px",color:"white",fontWeight:"bold",borderRadius:"5px", border:"solid 1px white", width:"65px", height:"25px", marginLeft:"20px"}}>delete</button>
                                            :<></>
                                        }
                                        
                                        {
                                            userId === localStorage.getItem('userId') && followList.filter(follow => (follow.follower._id === info.followee._id)).length === 0
                                                ? <button data-user={info.followee._id} data-id={info._id} name="follower" onClick={followHandler} style={{background:"rgb(0, 162, 255)", fontSize:"12px",color:"white",fontWeight:"bold",borderRadius:"5px", border:"solid 1px white", width:"65px", height:"25px", marginLeft:"10px"}}>follow</button>
                                                : ''
                                        }
                                        </span>
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