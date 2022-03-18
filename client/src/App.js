import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import Web3 from 'web3';
import { useEffect, useState } from 'react';
import Login from "./pages/login";
import Layout from './layout';
import Footer from './footer';

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [isLogin, setIsLogin] = useState(false);
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

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setIsLogin(true);
  };

  return (
    <BrowserRouter>
      {isLogin ? <Layout account={account} web3={web3} contractAddress={contractAddress} isLogin={isLogin} /> : <Login connectWallet={connectWallet} account={account} web3={web3} contractAddress={contractAddress} isLogin={isLogin} />}
      <Footer/>
      {/* <Navigation />
      <Routes>
        <Route exact path="/main" element={<Main nftList={totalNFTs}/>} />
        <Route exact path="/mypage" element={<Mypage nftList={myNFTs} loadNFT={loadNFT} account={account} />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/" element={<Login connectWallet={connectWallet} account={account} totalNFTs={myNFTs}/>} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
