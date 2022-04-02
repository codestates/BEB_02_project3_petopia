import { React, useEffect, useState } from 'react';
import { create } from "ipfs-http-client";
import axios from 'axios';
import erc721Abi from "../abi/erc721Abi.js";
import kip17Abi from "../abi/kip17Abi.js";
import Web3 from 'web3';
import Caver from 'caver-js';
import noImage from '../css/image/PETO.png';
import Loading from '../components/Loading.js';
import './create.css';

function Create() {
    const [web3, setWeb3] = useState();
    const [caver, setCaver] = useState();
    const [imageFile, setImageFile] = useState();
    const [uploadImage, setUploadImage] = useState(null);
    const [inputText, setInputText] = useState();
    const contractAddress = JSON.parse(localStorage.getItem('contractAddress'));
    const account = JSON.parse(localStorage.getItem('account'));
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        // if (typeof window.ethereum !== "undefined") {
        //     try {
        //         const web = new Web3(window.ethereum);
        //         setWeb3(web);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // } else {
        //     alert('Please Install MetaMask.')
        // }

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
        setIsLoading(true);
        const ipfsUrl = 'https://ipfs.infura.io/ipfs/';
        const imagePath = await uploadIPFS(imageFile);
        const metadata = {
            "description": inputText,
            "image": `${ipfsUrl}${imagePath}`,
            "name": "test_name",
        };
        const metadataPath = await uploadIPFS(JSON.stringify(metadata));
        createNFT(`${ipfsUrl}${metadataPath}`);
        setIsLoading(false);
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
        const newTokenId = await tokenContract.methods.mintNFT(tokenURI).send({ from: account, gas: 0xf4240 });

        const postInfo = {
            "tokenId": newTokenId.events.Transfer.returnValues.tokenId,
            "userId": localStorage.getItem('userId'),
            "postDate": new Date(),
            "networkType": localStorage.getItem('networkType')
        };

        await axios.post('http://localhost:4000/post/', postInfo)
            .then((res) => {
                const postInfo = res.data.data;
                if (postInfo !== null) {
                    alert(res.data.message);
                    window.location.replace('http://localhost:3000/mypage');
                } else {
                    alert(res.data.message);
                }
            });
    };

    if (isLoading) {
        return (<Loading />)
    }

    return (
        <div className='Create-Panel'>
            <div className='Create-text'></div>
            <hr className='Create-Line'></hr>
            <div className='Create'>
                <div className='input_file'>
                    <label for="file">
                        {uploadImage !== null ? <img src={uploadImage} alt="preview" style={{ width: "300px", height: "300px" }} /> : <div class = 'uploader'><img src={noImage} alt="noImage" style={{ width: "200px", height: "200px" }} /></div>}
                    </label>
                    <input type="file" accept='image/*' id="file" name="file" onChange={changedFile} style={{ display: "none" }} />
                    {/* <button onClick={deleteFile}>delete</button> */}
                </div>
                <div className='input_text'>
                    <textarea onChange={changedText} style={{ width: "858px", height: "411px" }} wrap="hard"></textarea>
                </div>
            </div>
            <div className='submit'>
            <button className = 'create-button' onClick={clickedSubmit}>Create</button>
            </div>
        </div>

    );
}

export default Create;