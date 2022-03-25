import React from 'react';
import Web3 from 'web3';
import Caver from 'caver-js';
import Web3Token from 'web3-token';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginCarousel from './loginCarousel';

function Login() {
  const [web3, setWeb3] = useState('');
  const [caver, setCaver] = useState('');

  useEffect(() => {
      if (typeof window.ethereum !== "undefined") {
          try {
              const web = new Web3(window.ethereum);
              setWeb3(web);
          } catch (err) {
              console.log(err);
          }
      } else {
        alert('Please Install MetaMask.')
      }

      if (typeof window.klaytn !== "undefined") {
        try {
          const web = new Caver(window.klaytn);
          setCaver(web);
        } catch (err) {
          console.log(err);
        }
      }
  }, []);
  
  const handleSignToken = async () => {
    // Connection to MetaMask wallet
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // getting address from which we will sign message
    const your_address = (await web3.eth.getAccounts())[0];
    let username = '';

    await axios.post('http://localhost:4000/user/login', {address:your_address})
    .then((res) => {
      const userInfo = res.data.data;
      if(userInfo !== null) {
        username = userInfo.user_name;
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
    
    if(token_data){
      localStorage.setItem('isConnected', true);
      localStorage.setItem('account', JSON.stringify(your_address));
      alert(`Welcome, ${username}!`);
    } else {
      localStorage.setItem('isConnected', false);
    }

    window.location.reload();
  };

  const signup = async (address) => {
    await axios.post('http://localhost:4000/user/signup', {address:address});
  }

  const connectKaikas = async() => {
    const accounts = await window.klaytn.enable();
    let username = '';

    await axios.post('http://localhost:4000/user/login', {address:accounts[0]})
    .then((res) => {
      const userInfo = res.data.data;
      if(userInfo !== null) {
        username = userInfo.user_name;
      } else {
        signup(accounts[0]);
        username = accounts[0];
      }
    });

    localStorage.setItem('isConnected', true);
    localStorage.setItem('account', JSON.stringify(accounts[0]));
    alert(`Welcome, ${username}!`);
    window.location.reload();
  }

  return (
      <div class="jumbotron">
          <div style={{width:'400px'}}><LoginCarousel /></div>
          <h1 class="display-4">Welcome to Petopia!</h1>
          {/* metaMask connect
            <div className="btn btn-dark login-wallet" onClick={handleSignToken}>
           */}
          <div className="btn btn-dark login-wallet" onClick={connectKaikas}>
            <div className="left-status">
              <div className="status-icon disconnected"></div>
            </div>
            <div className="right-status" style={{width: '100%' }}>Login with Wallet</div>
          </div>
            <hr class="my-4"></hr> 
            <p class="lead">지갑이 없으신가요?</p>
            <a class="btn btn-white save-wallet" 
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" 
                style={{width: '439px', height: '65px', paddingTop: '17px', fontSize: '15px', fontWeight: '700', marginTop:'20px', borderWidth: '0.5px', border: 'solid', borderColor:'black'}} 
                role="button"
                target="_blank" >Create Wallet</a>
      </div>  
  );
}

export default Login;