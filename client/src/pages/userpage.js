import axios from "axios";
import React, { useEffect, useState } from "react";
import MyNFTList from '../components/myNFTList';

function Userpage() {
    const selectedUser = localStorage.getItem('selectedUser');
    const selectedUserWallet = localStorage.getItem('selectedUserWallet');
    
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getInfoList();
    }, []);

    const getInfoList = () => {
        
        axios.post('http://localhost:4000/user/getUser', {
            userName: selectedUser
        })
            .then((res) => {
                setUserInfo(res.data.data)
            })
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

                    {/* <button>follow</button> */}

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