import { React, useEffect, useState } from 'react';
import {create} from "ipfs-http-client";
import axios from 'axios';
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from "../abi/kip17Abi.js";
import Web3 from 'web3';
import Caver from 'caver-js';
import noImage from '../css/image/noimage.png';

function Create() {
    const [web3, setWeb3] = useState();
    const [caver, setCaver] = useState();
    const [imageFile, setImageFile] = useState();
    const [uploadImage, setUploadImage] = useState(null);
    const [inputText, setInputText] = useState();
    const contractAddress = JSON.parse(localStorage.getItem('contractAddress'));
    const account = JSON.parse(localStorage.getItem('account'));

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const web = new Web3(window.ethereum);
                setWeb3(web);
            } catch (err) {
                console.log(err);
            }    
        } else {
          alert('Please Install MetaMask.')
        }

        if (typeof window.klaytn !== "undefined") {
            try {
              const caver = new Caver(window.klaytn);
              setCaver(caver);
            } catch (err) {
              console.log(err);
            }
        }
    }, []);

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
        // const tokenContract = await new web3.eth.Contract(erc721Abi, contractAddress, {
        //     from: account
        // });
        const tokenContract = await new caver.klay.Contract(kip17Abi, contractAddress, {
            from: account
        });
        tokenContract.options.address = contractAddress;
        // const newTokenId = await tokenContract.methods.mintNFT(account, tokenURI).send();
        const newTokenId = await tokenContract.methods.mintNFT(tokenURI).send({from: account, gas: 0xf4240});
        
        const postInfo = {
            "postId": newTokenId.events.Transfer.returnValues.tokenId,
            "walletAddress" : account,
            "postDate" : new Date(),
        };
        
        await axios.post('http://localhost:4000/create', postInfo, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            const postInfo = res.data.data;
            if(postInfo !== null) {
                alert(res.data.message);
                window.location.replace('http://localhost:3000/mypage');
            } else {
                alert(res.data.message);
            }
        });
    };

    return (
        <div className='Create'>
            <div className='input_file'>
                <label for="file">
                    {uploadImage !== null ? <img src={uploadImage} alt="preview" style={{width:"300px", height:"300px"}} /> : <img src={noImage} alt="noImage" style={{width:"300px", height:"300px"}} /> }
                </label>
                <input type="file" accept='image/*'id="file" name="file" onChange={changedFile} style={{display:"none"}} />
                {/* <button onClick={deleteFile}>delete</button> */}
            </div>
            <div className='input_text'>
                <textarea onChange={changedText} style={{width:"300px", height:"150px"}} ></textarea>
            </div>
            <div className='submit'>
                <button onClick={clickedSubmit}>submit</button>
            </div>
        </div>
    );
}

export default Create;