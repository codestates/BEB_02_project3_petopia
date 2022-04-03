import React from 'react';
import Web3 from 'web3';
import Caver from 'caver-js';
import Web3Token from 'web3-token';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginCarousel from './loginCarousel';
import './login.css';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;
const domain = process.env.REACT_APP_DOMAIN;

function Login() {
  const [web3, setWeb3] = useState('');
  const [caver, setCaver] = useState('');

  useEffect(() => {
    // if (typeof window.ethereum !== "undefined") {
    //   try {
    //     const web = new Web3(window.ethereum);
    //     setWeb3(web);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } else {
    //   alert('Please Install MetaMask.')
    // }

    if (typeof window.klaytn !== "undefined") {
      try {
        const web = new Caver(window.klaytn);
        setCaver(web);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please Install Kaikas')
    }
  }, []);

  const handleSignToken = async () => {
    // Connection to MetaMask wallet
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // getting address from which we will sign message
    const your_address = (await web3.eth.getAccounts())[0];
    let username = '';

    await axios.post(`${host}/user/login`, { address: your_address })
      .then((res) => {
        const userInfo = res.data.data;
        if (userInfo !== null) {
          username = userInfo.user_name;
          localStorage.setItem('userId', userInfo._id);
        } else {
          signup(your_address);
          username = your_address;
        }
      });

    // generating a token with 1 day of expiration time
    const token = await Web3Token.sign(
      (msg) => web3.eth.personal.sign(msg, your_address, ""),
      "id"
    );
    const { address, body } = await Web3Token.verify(token);

    //token LocalStorage 저장
    localStorage.setItem('user-token', token);
    const token_data = localStorage.getItem('user-token');

    localStorage.setItem('token-verification', body);
    const tokenverification_data = localStorage.getItem('token-verification');

    if (token_data) {
      localStorage.setItem('isConnected', true);
      localStorage.setItem('account', JSON.stringify(your_address));
      localStorage.setItem('networkType', 0);
      alert(`Welcome, ${username}!`);
    } else {
      localStorage.setItem('isConnected', false);
    }

    window.location.reload();
  };

  const signup = async (address) => {
    await axios.post(`${host}/user/signup`, {
      address: address,
      image: 'https://ipfs.io/ipfs/QmbLqHKBnwSUg6xS7aRUDShjwz34Gj5dg97aQqstM5xFHz?filename=dogdogdog.png'
    })
      .then((res) => {
        localStorage.setItem('userId', res.data.data._id);
      });
  }

  const connectKaikas = async () => {
    const accounts = await window.klaytn.enable();
    let username = '';

    await axios.post(`${host}/user/login`, { address: accounts[0] })
      .then((res) => {
        const userInfo = res.data.data;
        if (userInfo !== null) {
          const username = userInfo.user_name === accounts[0] ?
            userInfo.user_name.slice(0, 4) + '···' + userInfo.user_name.slice(-4)
            : userInfo.user_name;

          localStorage.setItem('userId', userInfo._id);
          localStorage.setItem('isConnected', true);
          localStorage.setItem('account', JSON.stringify(accounts[0]));
          localStorage.setItem('networkType', 1);
          alert(`Welcome, ${username}!`);
          window.location.reload();
        } else {
          signup(accounts[0]);
          const username = accounts[0].slice(0, 4) + '···' + accounts[0].slice(-4)
          localStorage.setItem('isConnected', true);
          localStorage.setItem('account', JSON.stringify(accounts[0]));
          localStorage.setItem('networkType', 1);
          alert(`Welcome, ${username}!`);
          window.location.href = `${domain}/mypage`;
        }
      });
  }

  return (
    <div class="jumbotron">
      <div className = "left-beforeLogin">
        <div style={{ width: '400px' }}><LoginCarousel /></div>
        
      </div>
      <div className = "homepage-wrapper">
          <div className = "right-beforeLogin">
            <h1 class="display-4" style={{ marginBottom: '50px' }}>Welcome to Petopia!</h1>
            {/* metaMask connect */}
            {/* <div className="btn btn-dark login-wallet" onClick={handleSignToken}> */}
            {/* kaikas connect */}
            <div className="btn btn-dark login-wallet" onClick={connectKaikas}>
              <div className="left-status">
                <div className="status-icon disconnected"></div>
              </div>
              <div className="right-status" style={{ width: '310px' , paddingTop: '9px', paddingBottom: '9px'}}>Login with Wallet</div>
            </div>

            <hr class="my-4"></hr>
            <p class="lead" style={{ fontSize: '14px'}} >지갑이 없으신가요?</p>
            
            
            <a class="save-wallet"
              href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
              // style={{ width: '339px', height: '65px', fontSize: '15px', fontWeight: '700', marginTop: '20px', borderWidth: '0.5px', border: 'solid', borderColor: 'black', paddingTop: '15px', paddingBottom:'15px' }}
              role="button"
              target="_blank" >Create Wallet</a>
            </div>
        </div>  
      </div>
  );
}


export default Login;