import { useState, useEffect } from 'react';
import { create } from "ipfs-http-client";
import axios from 'axios';
import kip17Abi from "../abi/kip17Abi.js";
import noImage from '../css/image/PETO.png';
import Caver from 'caver-js';
import '../pages/create.css'

function CreatePost() {

    const [caver, setCaver] = useState();
    const [imageFile, setImageFile] = useState();
    const [uploadImage, setUploadImage] = useState(null);
    const [inputText, setInputText] = useState();
    const contractAddress = JSON.parse(localStorage.getItem('contractAddress'));
    const account = JSON.parse(localStorage.getItem('account'));

    useEffect(() => {
        if (typeof window.klaytn !== "undefined") {
            try {
                const caver = new Caver(window.klaytn);
                setCaver(caver);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    const changedText = (e) => {
        setInputText(e.target.value);
    };

    const changedFile = async (e) => {
        setImageFile(e.target.files[0]);
        setUploadImage(URL.createObjectURL(e.target.files[0]));
    };

    const createMetadata = async () => {

        const ipfsUrl = 'https://ipfs.infura.io/ipfs/';
        const imagePath = await uploadIPFS(imageFile);
        const metadata = {
            "description": inputText,
            "image": `${ipfsUrl}${imagePath}`,
            "name": "test_name",
        };
        const metadataPath = await uploadIPFS(JSON.stringify(metadata));
        createNFT(`${ipfsUrl}${metadataPath}`);

    };

    const uploadIPFS = async (file) => {
        const ipfs = create("https://ipfs.infura.io:5001/api/v0");
        return (await ipfs.add(file)).path;
    };

    const clickedSubmit = () => {
        createMetadata();
    }

    const createNFT = async (tokenURI) => {
        const tokenContract = await new caver.klay.Contract(kip17Abi, contractAddress, {
            from: account
        });
        tokenContract.options.address = contractAddress;

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
                    window.location.replace('http://localhost:3000/');
                } else {
                    alert(res.data.message);
                }
            });
    };

    return (
        <>
            <div className='create' style={{ display: 'flex' }}>
                <div className='input_file'>
                    <label for="file">
                        {uploadImage !== null ?
                            <img src={uploadImage} alt="preview" style={{ width: "400px", height: "400px" }} /> :
                            <div className='uploader'>
                                <img src={noImage} alt="noImage" style={{ width: "200px", height: "200px" }} />
                            </div>
                        }
                    </label>
                    <input type="file" accept='image/*' id="file" name="file" onChange={changedFile} style={{ display: "none" }} />
                </div>
                <div className='input_text'>
                    <textarea onChange={changedText} style={{ resize: "none", width: "364px", height: "411px" }} wrap="hard" placeholder=' Your Message'></textarea>
                </div>
            </div >
            <div className='submit' style={{ display: 'inline' }}>
                <button className='create-button' onClick={clickedSubmit}>Create</button>
            </div>
        </>
    )
}

export default CreatePost