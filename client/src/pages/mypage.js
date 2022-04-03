/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import MyNFTList from '../components/myNFTList';
import ReserveList from '../components/ReserveList';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { create } from "ipfs-http-client";
import MyFollowList from "../components/myFollowList";
import TxHistoryList from '../components/TxHistoryList'
import Caver from 'caver-js';
import './mypage.css';

function Mypage() {
    const caver = new Caver(window.klaytn);
    const account = JSON.parse(localStorage.getItem('account'));
    const userId = localStorage.getItem('userId');
    const [userInfo, setUserInfo] = useState({user_name:'', wallet_address:''});
    const [showModal, setShowModal] = useState(false)
    const [showReserveModal, setShowReserveModal] = useState(false)
    const [username, setUsername] = useState(userInfo.user_name)
    const [email, setEmail] = useState(userInfo.email)
    const [greetings, setGreetings] = useState(userInfo.greetings)
    const [image, setImage] = useState(userInfo.profile_image)
    const [uploadImage, setUploadImage] = useState('')
    const [myReservations, setMyReservations] = useState([]);
    const [getName, setGetName] = useState([]);
    const [isCheck, setIsCheck] = useState(false);
    const [ballance, setBallance] = useState(0);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [txHistoryList, setTxHistoryList] = useState([]);



    useEffect(async () => {
        await axios.get(`http://localhost:4000/user/${userId}`)
            .then((res) => {
                setUserInfo(res.data.data);
            });

        await axios.get(`http://localhost:4000/reserve/${userId}`)
            .then((res) => {
                setMyReservations(res.data.data);
            });

        await axios.get(`http://localhost:4000/user/getNames/${userId}`)
            .then((res) => {
                setGetName(res.data.data)
            });

        const ki7Instance = new caver.kct.kip7('0x70C0327f5A6F2fb72C084055f9E5C05f5a1A4560');
        await ki7Instance.balanceOf(account).then((res) => {
            setBallance(res.toNumber()/1E18)
        });

        setTxHistoryList(await (await axios.get(`http://localhost:4000/contract/${account}`)).data.data.items);

    }, []);

    const changeImgae = async (e) => {
        // setImage(e.target.files[0]);
        setUploadImage(e.target.files[0])
    }

    const changeUsername = (e) => {
        const el = document.getElementById('username-check')

        if (getName.filter(name => name.user_name === e.target.value).length > 0) {
            el.textContent = '이미 사용중인 이름입니다.'
            setIsCheck(true)
        } else {
            setUsername(e.target.value)
            el.textContent = '사용 가능한 이름입니다.'
            setIsCheck(false)
        }
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

    const reserveModalOpen = () => {
        setShowReserveModal(true)
    }

    const reserveModalClose = () => {
        setShowReserveModal(false)
    }

    const historyModalOpen = async() => {
        setShowHistoryModal(true);
    }

    const historyModalClose = () => {
        setShowHistoryModal(false);
    }

    const SubmitInfo = async (e) => {

        let imagePath = '';
        let profileimage = '';

        if (uploadImage !== '') {
            imagePath = await uploadIPFS(uploadImage);
            profileimage = 'https://ipfs.infura.io/ipfs/' + imagePath
        } else { //undefined 일때,
            profileimage = userInfo.profile_image;
        }

        if (isCheck) {
            alert('노노');
            return
        }
        axios.post('http://localhost:4000/user/update', {
            '_id': userId,
            'user_name': username,
            'wallet_address': userInfo.wallet_address,
            'email': email,
            'greetings': greetings,
            'profile_image': profileimage
        })
        setShowModal(false)

        window.location.replace('http://localhost:3000/mypage')
    }

    const uploadIPFS = async (file) => {
        const ipfs = create("https://ipfs.infura.io:5001/api/v0");
        return (await ipfs.add(file)).path;
    }

    return (
        <div className='Mypage'>
            <h1 className="header">Mypage</h1>

            <div className = "mypage-wrapper">

                    <div className = "mypage-left-wrapper">
                        <div className = "profile-img-wrapper">
                                {/* {userInfo.profile_image !== null ? <img className = "profile-img"style={{ width: "250px", height: "250px" }} src={userInfo.profile_image} /> : <img src="https://bafybeidktemjjnwwjqh2c7yjiauho63xzxwcxmbrxyp5mxsj2tyvrfelea.ipfs.infura-ipfs.io/" />} */}
                                {/* <img style={{ width: "250px", height: "250px" }} src={userInfo.profile_image}></img> */}
                                {userInfo.profile_image !== null ? <img className = "profile-img" src={userInfo.profile_image} /> : <img src="https://bafybeidktemjjnwwjqh2c7yjiauho63xzxwcxmbrxyp5mxsj2tyvrfelea.ipfs.infura-ipfs.io/" />}

                        </div>

                        <div className = "profile-left-down-wrapper">

                            <h6 className='peto'>{ballance} PETO</h6>

                        </div>
                    </div>

                    <div className='Info'>

                        <div className="Info-header-wrapper">
                            <h6 className="Info-header-greeting">{userInfo.greetings}</h6>

                            <div className = "Info-content-wrapper">
                                <div >
                                    <h6 className="Info-text">USERNAME :
                                    {
                                        userInfo.user_name.length > 10 ?
                                        userInfo.user_name.slice(0, 4) + '···' + userInfo.user_name.slice(-4)
                                        : userInfo.user_name
                                    }
                                    </h6>
                                </div>
                                <div>
                                    <h6 className="Info-text">ADDRESS : { userInfo.wallet_address.slice(0, 4) + '···' + userInfo.wallet_address.slice(-4) }</h6>
                                </div>
                                <div>
                                    <h6 className="Info-text">EMAIL : {userInfo.email}</h6>
                                </div>

                            </div>

                            <div>
                                <MyFollowList userId={userId} account={account} />
                            </div>
                        </div>

                        <div className='mypage-btn-wrapper'>
                            <div className='Token' >

                                <Button type="button" class="btn btn-primary" value="history" onClick={historyModalOpen}>히스토리</Button>
                                {/* <button value="history" onClick={historyModalOpen}/> */}
                            </div>

                            <div>
                                {/* <!-- Button trigger modal --> */}
                                <Button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={modalOpen}>
                                    프로필 수정
                                </Button>
                            </div>
                            <div>
                                <Button type="button" class="btn btn-primary" onClick={reserveModalOpen}>
                                    나의 예약
                                </Button>
                            </div>
                        </div>
                            {/* Modal 창 */}
                            <Modal show={showModal} onHide={modalClose} size='lg'>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Profile</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <label for="file">
                                        {<img style={{ width: "200px", height: "200px" }} src={uploadImage === '' ? userInfo.profile_image : URL.createObjectURL(uploadImage)} />}
                                    </label>
                                    <input id="file" name="file" type="file" onChange={changeImgae} accept="image/png, image/jpeg" style={{ display: "none" }} /> <br />
                                    Username : <input type="textbox" id="username" onChange={changeUsername} style={{ width: "400px" }} placeholder={userInfo.user_name}></input> <span id='username-check'></span><br />
                                    Address : <h7>{userInfo.wallet_address}</h7> <br></br>
                                    E-MAIL : <input type="textbox" onChange={changeEmail} placeholder={userInfo.email}></input>
                                    Greeting : <input type="textbox" onChange={changeGreeting} style={{ width: "410px" }} placeholder={userInfo.greetings}></input>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={modalClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={SubmitInfo} >
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={showReserveModal} onHide={reserveModalClose} size='lg'>
                                <Modal.Header closeButton>
                                    <Modal.Title>My Reservation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ReserveList />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={reserveModalClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                </div>



            </div>


            {/* 내 게시물 */}
            <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                <h3 className="header">My Post</h3>
                <hr></hr>
                <div>
                    <MyNFTList account={account} />
                </div>
            </div>
            <Modal show={showHistoryModal} onHide={historyModalClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Token Histoty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TxHistoryList txHistoryList={txHistoryList} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={historyModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default Mypage;
