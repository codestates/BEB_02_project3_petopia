import { Button, Jumbotron, Carousel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Main_Carousel from './Main_Carousel';
import { disconnect } from 'process';

function Main() {
    // const [web3, setWeb3] = useState();
    const [account, setAccount] = useState('');
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
            try {
                // const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
                // setWeb3(web);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

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
            {/* <p class="lead">지갑이 없으신가요?</p>  */}
            <p class="lead">
            <a class="btn btn-dark connect-wallet" href="#" role="button" onClick={() => {
                    connectWallet(); setVisible(!visible);}}>{visible ? "Disconnect Wallet" : "Connect Wallet"}</a>
            {/* <a class="btn btn-dark download-wallet" href="#" role="button" onClick={() => {
                    connectWallet();}}>Download Wallet</a> */}
             </p>
             {visible && <div className="userInfo"><h3>Connected: {account}</h3></div> }
             

             <hr class="my-4"></hr> 
             <p class="lead">지갑이 없으신가요?</p>
             <Link to= "/wallet-download" class="wallet-lead">지갑 다운로드</Link>
              <p class="lead"></p>
        </div>
        
        
    );
}

export default Main;


//할 일 
//1. web3 에러 해결
//2. 지갑 연결 버튼을 눌렀을 때 연결되었다는 텍스트와 주소 뜨도록 만들기
//3. Disconnect 누르면 지갑 disconnect되기
//4. 서버로 전달 후 데이터베이스에 저장하기!