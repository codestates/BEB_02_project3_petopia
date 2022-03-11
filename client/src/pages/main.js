import { Button, Jumbotron, Carousel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Main_Carousel from './Main_Carousel';


function Main() {
    // const [web3, setWeb3] = useState();
    const [account, setAccount] = useState('');


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
            <p class="lead">지갑이 없으신가요?</p> 
            <p class="lead">
            <a class="btn btn-dark" href="#" role="button" onClick={() => {
                    connectWallet();}}>Connect Wallet</a>
             </p>
             <div className="userInfo"><h3>Connected: {account}</h3></div> 

             <hr class="my-4"></hr> 
             {/* <p class="lead">지갑이 없으신가요?</p>
             <Link to= "/wallet-download" class="wallet-lead">지갑 다운로드</Link> */}
              <p class="lead">이더리움 객체 가져오기 앞서, EIP-1139를 통해 지갑 소프트웨어는 웹 페이지에 자바스크립트 객체 형태로 
                  window.ethereum 객체를 제공한다고 배웠습니다. 이 window.ethereum은 공급자 객체이기 때문에 
                  web3.js를 사용할 수 있게 해줍니다. 먼저, web3를 npm에서 설치합니다.이더리움 객체 가져오기 앞서, 
                  EIP-1139를 통해 지갑 소프트웨어는 웹 페이지에 자바스크립트 객체 형태로 window.ethereum 객체를
                  이더리움 객체 가져오기 앞서, EIP-1139를 통해 지갑 소프트웨어는 웹 페이지에 자바스크립트 객체 형태로 
                  window.ethereum 객체를 제공한다고 배웠습니다. 이 window.ethereum은 공급자 객체이기 때문에 
                  web3.js를 사용할 수 있게 해줍니다. 먼저, web3를 npm에서 설치합니다.이더리움 객체 가져오기 앞서, 
                  EIP-1139를 통해 지갑 소프트웨어는 웹 페이지에 자바스크립트 객체 형태로 window.ethereum 객체를
                  이더리움 객체 가져오기 앞서, EIP-1139를 통해 지갑 소프트웨어는 웹 페이지에 자바스크립트 객체 형태로 
                  window.ethereum 객체를 제공한다고 배웠습니다. 이 window.ethereum은 공급자 객체이기 때문에 
                  web3.js를 사용할 수 있게 해줍니다. 먼저, web3를 npm에서 설치합니다.이더리움 객체 가져오기 앞서, 
                  EIP-1139를 통해 지갑 소프트웨어는 웹 페이지에 자바스크립트 객체 형태로 window.ethereum 객체를</p>
        </div>
        
        
    );
}

export default Main;


//할 일 
//1. web3 에러 해결
//2. 지갑 연결 버튼을 눌렀을 때 연결되었다는 텍스트와 주소 뜨도록 만들기
//3. 서버로 전달 후 데이터베이스에 저장하기!