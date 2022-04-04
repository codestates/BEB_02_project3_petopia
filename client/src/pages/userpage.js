import axios from "axios";
import React, { useEffect, useState } from "react";
import MyNFTList from '../components/MyNFTList';
import MyFollowList from "../components/MyFollowList";
import './mypage.css'
import './userpage.css'
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

function Userpage() {
    const userId = localStorage.getItem('userId');
    const selectedUser = localStorage.getItem('selectedUser');
    const selectedUserWallet = localStorage.getItem('selectedUserWallet');

    const [userInfo, setUserInfo] = useState({
        user_name: '',
        wallet_address:'',
        profile_image: ''
    });
    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        getInfoList();
    }, []);

    const getInfoList = async () => {

        await axios.get(`${host}/follow/${userId}`)
            .then((res) => {
                setFollowList(res.data.data);
            });

        await axios.get(`${host}/user/${selectedUser}`)
            .then((res) => {
                setUserInfo(res.data.data)
            })
    }

    const followHandler = async (e) => {
        const btnText = e.target.textContent;
        const followInfo = {
            followee: userId,
            follower: e.target.getAttribute('data-user')
        };

        if (btnText === 'follow') {
            const follow = await axios.post(`${host}/follow/`, followInfo)
                .then((res) => {
                    const result = res.data.data;
                    if (result !== null) {
                        e.target.textContent = 'unfollow';
                    }
                });

        } else {
            const unfollow = await axios.post(`${host}/follow/unfollow/`, followInfo)
                .then((res) => {
                    const result = res.data.data;
                    if (result) {
                        e.target.textContent = 'follow';
                    }
                });
        }
    }

    return (
        <div class='Userpage'>
            <h1 className ="header">
                {
                    userInfo.user_name.length > 10 ?
                    userInfo.user_name.slice(0, 4) + '···' + userInfo.user_name.slice(-4)
                    : userInfo.user_name
                }
            </h1>
            <button className= "user-follow">
                <div class= "user-follow" className="user-follow" data-user={userInfo._id} onClick={followHandler}>
                    {followList.filter(follow => (follow.follower._id === userInfo._id)).length > 0 ? "unfollow" : "follow"}
                </div>
            </button>
            <div className = "user-wrapper">
                <div className = "mypage-left-wrapper">
                    <div className = "profile-img-wrapper">
                            {/* {userInfo.profile_image !== null ? <img className = "profile-img"style={{ width: "250px", height: "250px" }} src={userInfo.profile_image} /> : <img src="https://bafybeidktemjjnwwjqh2c7yjiauho63xzxwcxmbrxyp5mxsj2tyvrfelea.ipfs.infura-ipfs.io/" />} */}
                            {/* <img style={{ width: "250px", height: "250px" }} src={userInfo.profile_image}></img> */}
                            {userInfo.profile_image !== null ? <img className = "profile-img" src={userInfo.profile_image} /> : <img src="https://bafybeidktemjjnwwjqh2c7yjiauho63xzxwcxmbrxyp5mxsj2tyvrfelea.ipfs.infura-ipfs.io/" />}
                    </div>
                </div>
                <div className="user-Info">
                    <div className="user-header-wrapper">
                        <h6 className="user-header-greeting">
                            {
                                userInfo.greetings === '' || userInfo.greetings === null || userInfo.greetings === 'undefined'
                                ? `"소개글이 없습니다."`
                                : `"${userInfo.greetings}"`
                            }
                        </h6>

                        <div className = "Info-content-wrapper">
                            <div >
                                <h6 className="Info-text">USERNAME :
                                {
                                    userInfo.user_name.length > 10 ?
                                    userInfo.user_name.slice(0, 4) + '···' + userInfo.user_name.slice(-4)
                                    : userInfo.user_name
                                }
                                </h6>
                            </div>
                            <div>
                                <h6 className="Info-text">ADDRESS : { userInfo.wallet_address.slice(0, 4) + '···' + userInfo.wallet_address.slice(-4) }</h6>
                            </div>
                            <div>
                                <h6 className="Info-text">EMAIL : {userInfo.email}</h6>
                            </div>

                        </div>

                        <div style={{ display: "flex" }}>
                            <MyFollowList userId={selectedUser} account={userInfo.wallet_address} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                <h3 className="header">Post</h3>
                <hr></hr>
                <div>
                    <MyNFTList account={selectedUserWallet} />
                </div>
            </div>
        </div>
    );
}

export default Userpage
