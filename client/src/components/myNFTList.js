import { useState, useEffect } from "react";
import axios from "axios";
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from "../abi/kip17Abi.js";
import Web3 from "web3";
import Caver from 'caver-js';

function MyNFTList({account}) {   
    const [NFTList, setNFTList] = useState([]);
    const contractAddress = JSON.parse(localStorage.getItem('contractAddress'));
    const web3 = new Web3(window.ethereum);
    const caver = new Caver(window.klaytn);

    useEffect(() => {
        loadNFT();
    }, []);
    
    const loadNFT = async () => {
        // const tokenContract = await new web3.eth.Contract(erc721Abi, contractAddress);
        const tokenContract = await new caver.klay.Contract(kip17Abi, contractAddress);
        const totalSupply = await tokenContract.methods.totalSupply().call();
        
        let arr = [];
    
        for (let i = 1; i <= totalSupply; i++) {
          arr.push(i);
        }
        for (let tokenId of arr) {
            let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
            let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
            const metadata = await (await axios.get(`${tokenURI}`)).data;

            if (String(tokenOwner).toLowerCase() === account.toLowerCase()) {
                setNFTList((prevState) => {
                    return [...prevState, { tokenId, metadata }];
                });
            }
        }
    };

    return (
        <div className="nftList">
            {NFTList.map(token => token).reverse().map((token)=> {
            return (
                <div key={token.tokenId} className="post">
                    <img src={token.metadata.image} alt={token.tokenId}/>
                </div>
            );
            })}
    </div>
    )
}

export default MyNFTList;