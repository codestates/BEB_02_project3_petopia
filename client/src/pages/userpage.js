import axios from "axios";
import React, { useEffect, useState } from "react";
import MyNFTList from '../components/myNFTList';
import MyFollowList from "../components/myFollowList";

function Userpage() {
    const userId = localStorage.getItem('userId');
    const selectedUser = localStorage.getItem('selectedUser');
    const selectedUserWallet = localStorage.getItem('selectedUserWallet');

    const [userInfo, setUserInfo] = useState({});
    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        getInfoList();
    }, []);

    const getInfoList = async () => {

        await axios.get(`http://localhost:4000/follow/${userId}`)
            .then((res) => {
                setFollowList(res.data.data);
            });

        await axios.get(`http://localhost:4000/user/${selectedUser}`)
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
                        e.target.textContent = 'follow';
                    }
                });
        }
    }

    return (
        <div class='Userpage'>
            <h1 style={{ marginLeft: "10%", marginTop: "20px" }}>Username</h1>
            <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", height: "300px" }} class="p-3 mb-2 bg-light text-dark">
                <div className="Profile" style={{ height: "85%", float: "left" }}>
                    <img style={{ width: "250px", height: "250px" }} src={userInfo.profile_image}></img>
                </div>
                <br />

                <div className="Info" style={{ height: "85%" }}>
                    <div style={{ display: "flex" }}>
                        {/* <MyFollowList followlist={followList} /> */}
                        <MyFollowList userId={selectedUser} />
                        {/* {userInfo._id} */}
                    </div>
                    <div>
                        <h5>USERNAME : {userInfo.user_name}</h5>
                    </div>
                    <div>
                        <h5>ADDRESS : {userInfo.wallet_address}</h5>
                    </div>
                    <div>
                        <h5>EMAIL : {userInfo.email}</h5>
                    </div>
                    <div>
                        <h5>Greeting : {userInfo.greetings}</h5>
                    </div>
                    <button data-user={userInfo._id} onClick={followHandler}>
                        {followList.filter(follow => (follow.follower._id === userInfo._id)).length > 0 ? "unfollow" : "follow"}
                    </button>
                </div>

            </div>

            <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                <h3>Post</h3>
                <hr></hr>
                <div>
                    <MyNFTList account={selectedUserWallet} />
                </div>
            </div>
        </div>
    );
}

export default Userpage