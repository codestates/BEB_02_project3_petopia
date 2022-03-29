import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';

function MyFollowList({ userId }) {



    const selectedUser = localStorage.getItem('selectedUser');
    const [followerModal, setFollowerModal] = useState(false);
    const [followModal, setFollowModal] = useState(false);

    const [followList, setFollowList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(async () => {

        console.log("dsds", userId);

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

        // await axios.get(`http://localhost:4000/user/${selectedUser}`)
        //     .then((res) => {
        //         setUserInfo(res.data.data)
        //     })
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

    const userSelect = () => {

    }


    const followHandler = async (e) => {
        const btnText = e.target.textContent;
        const followInfo = {
            followee: userId,
            follower: e.target.getAttribute('data-user')
        };

        if (btnText === 'follow') {
            const follow = await axios.post('http://localhost:4000/follow/', followInfo)
                .then((res) => {
                    const result = res.data.data;
                    if (result !== null) {
                        e.target.textContent = 'unfollow';
                    }
                });

        } else {
            const unfollow = await axios.post('http://localhost:4000/follow/unfollow/', followInfo)
                .then((res) => {
                    const result = res.data.data;
                    if (result) {
                        document.getElementById(`follow_${e.target.getAttribute('data-id')}`).remove()
                    }
                });
        }
    }

    const unfollow = async (e) => {

        await axios.post('http://localhost:4000/follow/unfollow/', {
            followee: userId,
            follower: e.target.getAttribute('data-user')
        })
            .then((res) => {
                console.log(res)
                const result = res.data.data;

                if (result) {
                    document.getElementById(`follow_${e.target.getAttribute('data-id')}`).remove()
                }
            });
    }


    return (
        <div className="MyFollowList" >

            <span style={{ padding: "10px" }}>
                게시물 : 7
            </span>

            <span style={{ padding: "10px" }} onClick={followerBtn}>
                팔로워 : {
                    followerList.length
                }
            </span>

            <span style={{ padding: "10px" }} onClick={followBtn} >
                팔로잉 : {
                    followList.length
                }
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
                                <div onclick={userSelect} id={`follow_${info._id}`} data-id={info._id}>
                                    <img style={{ width: "50px", height: "50px" }} src={info.follower.profile_image} />
                                    <span>{info.follower.user_name}</span>
                                    {userId === localStorage.getItem('userId') ? <button data-user={info.follower._id} data-id={info._id} onClick={followHandler}>
                                        unfollow</button> : ''
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
                                    <div onClick={userSelect} id={`follower_${info._id}`} data-id={info._id}>
                                        <img style={{ width: "50px", height: "50px" }} src={info.followee.profile_image} />
                                        <span>{info.followee.user_name}</span>
                                        {
                                            userId === localStorage.getItem('userId')
                                                ?
                                                <button data-user={info.followee._id} data-id={info._id} onClick={followHandler}>
                                                    {followList.filter(follow => (follow.follower._id === info._id)).length > 0 ? "unfollow" : "follow"}
                                                </button>
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