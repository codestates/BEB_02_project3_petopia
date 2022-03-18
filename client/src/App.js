import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Mypage from './pages/mypage';
import Main from './pages/main';
import Navigation from './components/navbar';
import Create from './pages/create';
import erc721Abi from "./abi/erc721Abi.js";
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from "./pages/login";

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [myNFTs, setMyNFTs] = useState([]);
  const [totalNFTs, setTotalNFTs] = useState([]);
  const [contractAddress, setContractAddress] = useState('0x2ead9cc4a6b8da962412e85c71473870c80dab64');

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
        try {
            const web = new Web3(window.ethereum);
            setWeb3(web);
        } catch (err) {
            console.log(err);
        }
    }
  }, []);

  const loadNFT = async(_account) => {
    const tokenContract = await new web3.eth.Contract(erc721Abi, contractAddress);

    // const name = await tokenContract.methods.name().call();
    // const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();
    
    let arr = [];

    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }
    for (let tokenId of arr) {
        let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        const metadata = await (await axios.get(`${tokenURI}`)).data;
        /*
          TODO : 유저 좋아요 댓글 DB 요청해서 넣어줘야함
         */
        // 포스팅 작성자 정보
        const postInfo = {
          userName:"감자맘마",
          proFile:"",
          postDate:"2022-03-18"
        }
        const likeCnt = 0;
        const comments = [
          {
            profile:"",
            userName:"감자맘마",
            content:"안녕",
            replies:[{
              profile:"",
              username:"감자파파",
              content:"안녕22",
            }]
          },
          {
            profile:"",
            userName:"감자파파",
            content:"하이",
            replies:[]
          },
        ];

        // 전체 NFT 목록 셋팅
        setTotalNFTs((prevState) => {
          return [...prevState, { postInfo, tokenId, metadata, likeCnt, comments }];
        });

        // 한 개의 지갑 NFT 목록 셋팅
        if (String(tokenOwner).toLowerCase() === _account) {
          setMyNFTs((prevState) => {
            return [...prevState, { postInfo, tokenId, metadata, likeCnt, comments }];
          });
        }
    }


  };

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    loadNFT(accounts[0]);
  };

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/main" element={<Main nftList={totalNFTs}/>} />
        <Route exact path="/mypage" element={<Mypage nftList={myNFTs} loadNFT={loadNFT} account={account} />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/" element={<Login connectWallet={connectWallet} account={account} totalNFTs={myNFTs}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
