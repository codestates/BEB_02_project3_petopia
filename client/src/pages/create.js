import { React, useEffect, useState } from 'react';
import {create} from "ipfs-http-client";
import axios from 'axios';
import erc721Abi from "../abi/erc721Abi.js";
import Web3 from 'web3';

function Create() {
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState();
    const [erc721List, setErc721List] = useState([]);
    const [imageFile, setImageFile] = useState();
    const [uploadImage, setUploadImage] = useState(null);
    const [inputText, setInputText] = useState();

    const contractAddress = '0x2ead9cc4a6b8da962412e85c71473870c80dab64';

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
    };

    const loadNFT = async () => {
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
            if (String(tokenOwner).toLowerCase() === account) {
              let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
              const metadata = await (await axios.get(`${tokenURI}`)).data;
              setErc721List((prevState) => {
                return [...prevState, { tokenId, metadata }];
              });
            }
        }
    };

    const changedFile = async (e) => {
        setImageFile(e.target.files[0]);
        setUploadImage(URL.createObjectURL(e.target.files[0]));
    };

    const deleteFile = () => {
        URL.revokeObjectURL(uploadImage);
        setUploadImage("");
    };

    const changedText = (e) => {
        setInputText(e.target.value);
    };

    const clickedSubmit = () => {        
        createMetadata();
    };

    const createMetadata = async () => {
        const ipfsUrl = 'https://ipfs.infura.io/ipfs/';
        const imagePath = await uploadIPFS(imageFile);
        const metadata = {
            "description" :inputText,
            "image" : `${ipfsUrl}${imagePath}`,
            "name" :"test_name",
        };
        const metadataPath = await uploadIPFS(JSON.stringify(metadata));
        createNFT(`${ipfsUrl}${metadataPath}`);
    };

    const uploadIPFS = async (file) => {
        const ipfs = create("https://ipfs.infura.io:5001/api/v0");
        return (await ipfs.add(file)).path;
    };

    const createNFT = async (tokenURI) => {
        const tokenContract = await new web3.eth.Contract(erc721Abi, contractAddress, {
            from: account
        });
        tokenContract.options.address = contractAddress;
        const newTokenId = await tokenContract.methods.mintNFT(account, tokenURI).send();
        
        const postInfo = {
            "postId": newTokenId.events.Transfer.returnValues.tokenId,
            "walletAddress" : account,
            "postDate" : new Date(),
        };
        
        await axios.post('http://localhost:3000/create', postInfo, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            const postInfo = res.data.data;
            if(postInfo !== null) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        });
    };

    return (
        <div className='Create'>
            <div className='button'>
                <button onClick={connectWallet}>지갑연결</button>{account ? account : "없음"}
                <button onClick={loadNFT}>NFT불러오기</button>
            </div>
            <div className='input_file'>
                {uploadImage !== null ? <img src={uploadImage} alt="preview" /> : <i class="image outline icon"></i>}
                <input type="file" accept='image/*'id="file" name="file" onChange={changedFile} />
                <button onClick={deleteFile}>delete</button>
            </div>
            <div className='input_text'>
                <textarea onChange={changedText}></textarea>
            </div>
            <div className='submit'>
                <button onClick={clickedSubmit}>submit</button>
            </div>
        </div>
    );
}

export default Create;