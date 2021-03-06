import { useState, useEffect } from "react";
import axios from "axios";
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from "../abi/kip17Abi.js";
import Web3 from "web3";
import Caver from 'caver-js';
import { Modal } from "react-bootstrap";
import PostDetail from "./PostDetail";
import Nodata from "./Nodata";
import Loading from "./Loading.js";
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

function MyNFTList({ account }) {
    const [NFTList, setNFTList] = useState([]);
    const [showDetail, setShowDetail] = useState(false)
    const contractAddress = JSON.parse(localStorage.getItem('contractAddress'));
    const web3 = new Web3(window.ethereum);
    const caver = new Caver(window.klaytn);
    const [selectedToken, setSelectedToken] = useState();
    const networkType = localStorage.getItem('networkType')
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        loadNFT();
    }, []);

    const loadNFT = async () => {
        setIsLoading(true);
        const postList = await (await axios.get(`${host}/post/${networkType}`)).data.data;
        // const tokenContract = await new web3.eth.Contract(erc721Abi, contractAddress);
        const tokenContract = await new caver.klay.Contract(kip17Abi, contractAddress);
        const totalSupply = await tokenContract.methods.totalSupply().call();

        let arr = [];

        for (let i = 1; i <= totalSupply; i++) {
            arr.push(i);
        }
        arr = arr.map(el => el).reverse()
        let cnt = 0;

        for(let postInfo of postList) {
            for (let tokenId of arr) {
                if(tokenId === postInfo.token_id && !postInfo.isDelete) {
                    let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
                    let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
                    const metadata = await (await axios.get(`${tokenURI}`)).data;
                    setIsLoading(true);
        
                    if (String(tokenOwner).toLowerCase() === account.toLowerCase()) {
        
                        setNFTList((prevState) => {
                            return [...prevState, { tokenId, metadata, postInfo }];
                        });
                        cnt += 1;
                    }
                }
            }
        }
        localStorage.setItem('postCnt', cnt);
        setIsLoading(false);
    };

    if (isLoading) {
        return (<Loading />)
    }

    const modalOpen = (e) => {
        setShowDetail(true)
        const token = e.target.getAttribute('data-json')
        setSelectedToken(JSON.parse(token));
    }

    const modalClose = () => {
        setShowDetail(false)
    }

    return (
        <div className="MynftList">
            {
                NFTList.length > 0
                    ?
                    NFTList.map((token) => {
                        return (
                            <div key={token.tokenId} className="Mypost">
                                <img className="post-img" src={token.metadata.image} alt={token.tokenId} onClick={modalOpen} data-json={JSON.stringify(token)} />
                            </div>

                        );
                    })
                    : <Nodata />
            }
            <Modal show={showDetail} onHide={modalClose} size='lg' >
                <PostDetail token={selectedToken} />
            </Modal>
        </div>
    )
}

export default MyNFTList;
