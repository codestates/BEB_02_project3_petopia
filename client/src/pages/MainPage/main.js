// eslint-disable-next-line
import { Button, Jumbotron, Carousel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
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
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState('');
    // eslint-disable-next-line
    const [visible, setVisible] = useState(false);
    const [ walletAccount, setWalletAccount ] = useState('')
    // eslint-disable-next-line
    const [ currentChain, setCurrentChain ] = useState('')
    const [ isConnected, setIsConnected ] = useState(false)

    // useEffect(() => {
    //     if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
    //         try {
    //             const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
    //             setWeb3(web);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        if(typeof window.ethereum !== 'undefined') {
            
            //새로운 web3 객체를 만든다
            try {
                const web = new Web3(window.ethereum);  
                setWeb3(web);
                } catch (err) {
                console.log(err);
                }

            // when accounts switch
            window.ethereum.on('accountsChanged', (accounts) => {
              console.log('Account changed: ', accounts[0])
              setWalletAccount(accounts[0]) 
            })
            
            // when Chain changes
            window.ethereum.on('chainChanged', (chaindId) => {
              console.log('Chain ID changed: ', chaindId)
              setCurrentChain(chaindId)
            })
    
        } else {
            alert('Please install MetaMask to use this service!')
    
        }
      }, [])

    useEffect(() => {
      setIsConnected(walletAccount ? true : false)
    }, [walletAccount])

    //Server Test
    useEffect(() => {
      axios.post('http://localhost:4000/api/hello')
      .then(res => console.log(res))
    }, [])


    const handleConnectWallet = async () => {
        
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
        setIsConnected(false)
        console.log('Account: ', account)
        setWalletAccount('')
    }

    const connectWallet = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
    };

    return (
    
        <div class="jumbotron">
            <Main_Carousel />
            <h1 class="display-4">Welcome to Petopia!</h1>
            <p class="lead">
                    Click the button again to disconnect
             </p>
             {visible && <div className="userInfo"><h1>Connected: {account} </h1></div> }
              <div className="btn btn-dark connect-wallet" onClick={!isConnected ? handleConnectWallet : handleDisconnect}>
                  <div className="left-status" style={leftStatus}>
                      {
                        isConnected ? (
                          <div className="status-icon connected" style={statusIconConnected}></div>
                        ) : (               
                          <div className="status-icon disconnected" style={statusIconDisconnected}></div>
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

              <a class="btn btn-dark download-wallet" 
                  href="#" 
                  style={{width: '439px', height: '66px', paddingTop: '20px', fontSize: '15px', fontWeight: '700', marginTop:'20px'}} 
                  role="button" 
                  onClick={() => {
                    connectWallet();}}>Login with Wallet</a>
              {/* <a class="btn btn-dark connect-wallet" href="#" role="button" onClick={() => {
                    connectWallet(); setVisible(!visible);}}>{visible ? "Hide Address" : "Show Address"}</a> */}

             <hr class="my-4"></hr> 
             <p class="lead">지갑이 없으신가요?</p>
             <Link to= "/wallet-download" class="wallet-lead">지갑 다운로드</Link>
              <p class="lead"></p>
        </div>     
    );
}

export default Main;


