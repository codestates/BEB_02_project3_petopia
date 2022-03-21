import React, { useState } from 'react';
import { create } from "ipfs-http-client";
import axios from 'axios';

function Createcp() {

    const username = localStorage.getItem('username');
    const address = localStorage.getItem('address');

    const [inputText, setInputText] = useState("")
    const [uploadImage, setUploadImage] = useState(null);
    const [imageFile, setImageFile] = useState();

    const imagechangeHandler = (e) => {
        // console.log(e.target.files[0])
        setImageFile(e.target.files[0]);
    }

    // Metadata 생성
    const submitHandler = () => {
        createMetadata()
    }

    //
    const textchangeHandler = (e) => {
        setInputText(e.target.value);
    }

    const createMetadata = async () => {
        // console.log('imageFile', imageFile)
        // console.log('desc', inputText)
        const imagePath = await uploadIPFS(imageFile);
        const metadata = {
            "description": inputText,
            "image": 'https://ipfs.infura.io/ipfs/' + imagePath,
            "username": username,
            "address": address
        }
        console.log(metadata);

        axios.post('http://localhost:4000/createNFT', metadata);
    }

    // IPFS Add -> cid 값 얻기
    const uploadIPFS = async (file) => {
        const ipfs = create("https://ipfs.infura.io:5001/api/v0");
        return (await ipfs.add(file)).path;
    }

    return (
        <div className='CreateCP'>
            <div className='input_file'>
                {uploadImage !== null ? <img src={uploadImage} /> : <i className='image outline icon'></i>}
                <input type="file" accept='image/*' onChange={imagechangeHandler} />
            </div>

            <div className='input_desc'>
                <textarea onChange={textchangeHandler}></textarea>
            </div>

            <div className='submit'>
                <button onClick={submitHandler}>Submit</button>
            </div>

        </div >
    );
}

export default Createcp;