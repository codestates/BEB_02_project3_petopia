// eslint-disable-next-line
import { Button, Jumbotron, Carousel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import Web3Token from 'web3-token';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main_Carousel from './Main_Carousel';
// import { disconnect } from 'process';
// import { sendStatus } from 'express/lib/response';

import { 
    leftStatus,
    statusIconConnected,
    statusIconDisconnected,
  } from './styles/styles.js'


function Main() {
  // eslint-disable-next-line
    const [ web3, setWeb3 ] = useState();
    const [ account, setAccount ] = useState('');
    // eslint-disable-next-line
    const [ visible, setVisible ] = useState(false);
    const [ walletAccount, setWalletAccount ] = useState('')
    // eslint-disable-next-line
    const [ chain, setChain ] = useState('')
    const [ isConnected, setConnected ] = useState(false)

    

    //Server Test
    
    useEffect(() => {
        axios.post('http://localhost:4000/api/hello')
        .then(res => console.log(res))
    }, [])


    useEffect(() => {
        if(typeof window.ethereum !== 'undefined') {       
            //새로운 web3 객체를 만든다
            try {
                const web = new Web3(window.ethereum);  
                setWeb3(web);
                } catch (err) {
                console.log(err);
                }

            // accounts switch
            window.ethereum.on('accountsChanged', (accounts) => {
              console.log('Account changed: ', accounts[0])
              setWalletAccount(accounts[0]) 
            })
            
            // Chain change
            window.ethereum.on('chainChanged', (chaindId) => {
              console.log('Chain ID changed: ', chaindId)
              setChain(chaindId)
            })
    
        } else {
            alert('Please install MetaMask.')
    
        }
      }, [])


    useEffect(() => {
      setConnected(walletAccount ? true : false)
    }, [walletAccount])


    const handleConnect = async () => {
        
      console.log('Connecting MetaMask...')
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        const account = accounts[0]
        console.log('Account: ', account)
        setWalletAccount(account)      
    }

    const handleDisconnect = async () => {

        console.log('Disconnecting MetaMask...')
        setConnected(false)
        console.log('Account: ', account)
        setWalletAccount('')
    }

    const handleSignToken = async () => {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const your_address = (await web3.eth.getAccounts())[0];

      const token = await Web3Token.sign(
        (msg) => web3.eth.personal.sign(msg, your_address, ""),
        "id"
      );
        console.log('TOKEN CREATED', token)

        const { address, body } = await Web3Token.verify(token);
        console.log("ADDRESS RECOVERED", address, body);
    };

    return (
    
        <div class="jumbotron">
            <Main_Carousel />
            <h1 class="display-4">Welcome to Petopia!</h1>
            <p class="lead">
                    Click the button again to disconnect
             </p>
              <div className="btn btn-dark connect-wallet" onClick={!isConnected ? handleConnect : handleDisconnect}>
                  <div className="left-status" style={leftStatus}>
                      {
                        isConnected ? (
                          <div className="status-icon connected" style = {statusIconConnected} ></div>
                        ) : (               
                          <div className="status-icon disconnected" style = {statusIconDisconnected} ></div>
                        )
                      }
                  </div>
                      {
                        isConnected ? (   
                            <div className="right-status" style={{width: '100%', textOverflow: 'ellipsis', overflow: 'hidden'}}>{walletAccount}</div>      
                          ) : (
                            <div className="right-status" style={{width: '100%' }}>Connect Wallet</div>
                          )
                      }
              </div>

              <a class="btn btn-dark login-wallet" 
                  href="#" 
                  style={{width: '439px', height: '66px', paddingTop: '20px', fontSize: '15px', fontWeight: '700', marginTop:'20px'}} 
                  role="button" 
                  onClick={() => {handleSignToken(); setVisible(!visible);}}>{visible ? "Token Created" : "Login with Wallet"}</a>

              { visible && <div className="userInfo"> Your Public Address is <h2 style={{color : "#7BFCCD"}}> {walletAccount} </h2> </div> }



             <hr class="my-4"></hr> 
             <p class="lead">지갑이 없으신가요?</p>
             <Link to= "/wallet-download" class="wallet-lead">지갑 다운로드</Link>
              <p class="lead">
              </p>
        </div>     
    );
}

export default Main;


