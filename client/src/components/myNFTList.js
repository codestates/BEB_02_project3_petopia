import { useState, useEffect } from "react";
import axios from "axios";
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from "../abi/kip17Abi.js";
import Web3 from "web3";
import Caver from 'caver-js';
import { Modal } from "react-bootstrap";
import PostDetail from "../components/PostDetail"


function MyNFTList({ account }) {
    const [NFTList, setNFTList] = useState([]);
    const [showDetail, setShowDetail] = useState(false)
    const contractAddress = JSON.parse(localStorage.getItem('contractAddress'));
    const web3 = new Web3(window.ethereum);
    const caver = new Caver(window.klaytn);
    const [selectedToken, setSelectedToken] = useState();
    const networkType = localStorage.getItem('networkType')

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
        arr = arr.map(el => el).reverse()
        for (let tokenId of arr) {
            let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
            let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
            const metadata = await (await axios.get(`${tokenURI}`)).data;

            const postInfo = await (await axios.get(`http://localhost:4000/post/${tokenId}/${networkType}`)).data.data;
            if (String(tokenOwner).toLowerCase() === account.toLowerCase()) {
                setNFTList((prevState) => {
                    return [...prevState, { tokenId, metadata, postInfo }];
                });
            }
        }
    };

    const modalOpen = (e) => {
        setShowDetail(true)
        const token = e.target.getAttribute('data-json')
        setSelectedToken(JSON.parse(token));
    }

    const modalClose = () => {
        setShowDetail(false)
    }

    return (
        <div className="nftList">
            {NFTList.map((token) => {
                return (
                    <div key={token.tokenId} className="post">
                        <img src={token.metadata.image} alt={token.tokenId} onClick={modalOpen} data-json={JSON.stringify(token)} />
                    </div>
                );
            })}
            <Modal show={showDetail} onHide={modalClose} size='lg' >
                <PostDetail token={selectedToken} />
            </Modal>
        </div>
    )
}

export default MyNFTList;