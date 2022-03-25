import React, { useEffect, useState } from 'react';
import MyNFTList from '../components/myNFTList';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { create } from "ipfs-http-client";

function Mypage() {
    const account = JSON.parse(localStorage.getItem('account'));
    const [web3, setWeb3] = useState();
    const [userInfo, setUserInfo] = useState({
        // user_name: null,
        // wallet_address: null,
        // profile_image: null,
        // greetings: null
    });

    const [showModal, setShowModal] = useState(false)
    const [username, setUsername] = useState(userInfo.user_name)
    const [email, setEmail] = useState(userInfo.email)
    const [greetings, setGreetings] = useState(userInfo.greetings)
    const [image, setImage] = useState(userInfo.profile_image)
    const [uploadImage, setUploadImage] = useState('')

    useEffect(async () => {
        await axios.post('http://localhost:4000/user/getUserInfo', { address: account })
            .then((res) => {
                setUserInfo(res.data.data);
            });
    }, []);

    const changeImgae = async (e) => {
        // setImage(e.target.files[0]);
        setUploadImage(e.target.files[0])
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changeGreeting = (e) => {
        setGreetings(e.target.value)
    }

    const modalOpen = () => {
        setShowModal(true)
    }

    const modalClose = () => {
        setShowModal(false)
    }

    const SubmitInfo = async () => {

        let imagePath = '';
        let profileimage = '';
     
        if (uploadImage !== '') {
            imagePath = await uploadIPFS(uploadImage);
            profileimage = 'https://ipfs.infura.io/ipfs/' + imagePath
        } else { //undefined 일때,
            profileimage = userInfo.profile_image;
        }

        axios.post('http://localhost:4000/user/update', {
            'user_name': username,
            'wallet_address': userInfo.wallet_address,
            'email': email,
            'greetings': greetings,
            'profile_image': profileimage
        })

        // console.log(username, userInfo.wallet_address, email, greetings, 'https://ipfs.infura.io/ipfs/' + imagePath)

        setShowModal(false)

        // window.location.replace('http://localhost:3000/mypage')

    }

    const uploadIPFS = async (file) => {
        const ipfs = create("https://ipfs.infura.io:5001/api/v0");
        return (await ipfs.add(file)).path;
    }


    return (
        <div className='Mypage'>
            <h1 style={{ marginLeft: "10%", marginTop: "20px" }}>Mypage</h1>
            <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", height: "300px" }} class="p-3 mb-2 bg-light text-dark">
                <div className='Profile' style={{ height: "85%", float: "left" }}>
                    {userInfo.profile_image !== null ? <img style={{ width: "250px", height: "250px" }} src={userInfo.profile_image} /> : <img src="https://bafybeidktemjjnwwjqh2c7yjiauho63xzxwcxmbrxyp5mxsj2tyvrfelea.ipfs.infura-ipfs.io/" />}
                </div>
                <br />

                <div className='Info' style={{ height: "85%" }}>
                    <div>
                        <h6>USERNAME : {userInfo.user_name} </h6>
                    </div>
                    <div>
                        <h6>ADDRESS : {userInfo.wallet_address}</h6>
                    </div>
                    <div>
                        <h6>EMAIL : {userInfo.email}</h6>
                    </div>
                    <div>
                        <h6>GREETINGS : {userInfo.greetings}</h6>
                    </div>
                    <div>
                        {/* <!-- Button trigger modal --> */}
                        <Button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={modalOpen}>
                            EDIT PROFILE
                        </Button>

                        <Modal show={showModal} onHide={modalClose} size='lg'>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <label for="file">
                                    {<img style={{ width: "200px", height: "200px" }} src={uploadImage === '' ? userInfo.profile_image : URL.createObjectURL(uploadImage)} />}
                                </label>
                                <input id="file" name="file" type="file" onChange={changeImgae} accept="image/png, image/jpeg" style={{display:"none"}}/> <br />
                                Username : <input type="textbox" onChange={changeUsername} style={{ width: "400px" }} placeholder={userInfo.user_name} ></input> <br />
                                Address : <h7>{userInfo.wallet_address}</h7> <br></br>
                                E-MAIL : <input type="textbox" onChange={changeEmail} placeholder={userInfo.email}></input>
                                Greeting : <input type="textbox" onChange={changeGreeting} style={{ width: "410px" }} placeholder={userInfo.greetings}></input>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={modalClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={SubmitInfo}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className='Token' style={{ float: "left", width: "80%", display: "flex", alignItems: "center" }}>
                    <h6>ERC20 TOKEN : 2311</h6>
                    {/* <Button sytle={{ marginLeft: "10px" }}>ERC20 Transfer</Button>
                    <Button style={{ marginLeft: "10px" }} href="http://localhost:3000/transaction">VIEW TRANSACTION</Button> */}
                </div>
            </div>

            <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                <h3>My Post</h3>
                <hr></hr>
                <div>
                    <MyNFTList />
                </div>
            </div>
        </div >
    );
}

export default Mypage;