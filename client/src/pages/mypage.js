import React, { useEffect, useState } from 'react';
import MyNFTList from '../components/myNFTList';
import axios from 'axios';

function Mypage() {
    const account = JSON.parse(localStorage.getItem('account'));
    const [web3, setWeb3] = useState();
    const [userInfo, setUserInfo] = useState({
        user_name: null,
        wallet_address:null,
        profile_image:null,
        greetings:null
    });
    
    useEffect(async() => {
        await axios.post('http://localhost:3000/user/getUserInfo', {address:account})
        .then((res) => {
            setUserInfo(res.data.data);
        });
    }, []);

    const changedImg = () => {
        
    }

    return (
        <div className='Mypage'>
            <h1 style={{ marginLeft: "10%", marginTop: "20px" }}>Mypage</h1>
            <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", height: "300px" }} class="p-3 mb-2 bg-light text-dark">
                <div className='Profile' style={{ height: "85%", float: "left" }}>
                    <label for="file">
                        {userInfo.profile_image !== null ? <img src={userInfo.profile_image} /> : <img src="ddd" />}
                    </label>
                    <input type="file" id="file" name="file" style={{display:"none"}} onchange={changedImg}/>
                </div>
                <div className='Greetings'>
                    {userInfo.greetings !== null ? <p>{userInfo.greetings}</p> : <p>소개글이 없습니다.</p> }
                </div>
                <div className='Info' style={{ height: "85%" }}>
                    <div>
                        <h6>USERNAME : {userInfo.user_name} </h6>
                    </div>
                    <div>
                        <h6>ADDRESS : {userInfo.wallet_address}</h6>
                    </div>
                </div>
                <div className='Token' style={{ float: "left", width: "80%", display: "flex", alignItems: "center" }}>
                    <h6>ERC20 TOKEN : 2311</h6>
                    {/* <Button sytle={{ marginLeft: "10px" }}>ERC20 Transfer</Button>
                    <Button style={{ marginLeft: "10px" }} href="http://localhost:3000/transaction">VIEW TRANSACTION</Button> */}
                </div>
            </div>

            <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                <h3>My Post</h3>
                <hr></hr>
                <div>
                   <MyNFTList />
                </div>
            </div>
        </div>
    );
}

export default Mypage;