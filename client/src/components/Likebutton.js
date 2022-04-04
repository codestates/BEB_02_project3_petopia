import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import axios from 'axios';
import './NFTList.js'
import { Modal } from "react-bootstrap";
import dotenv from 'dotenv';
import useLocalStorage from "../storage/useLocalStorage.js";
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

const LikeButton = ({ postId, userId, postUser, postAddress, postDate, postUserName }) => {
  const [isClick, setClick] = useState(false);
  const [likeCnt, setlikeCnt] = useState(0);
  const [isTransacted, setIsTransacted] = useLocalStorage('isTransacted', false)

  // like 상태 확인
  useEffect(() => {
    initSetLikes();
  }, [])

  const initSetLikes = async () => {
    await axios.get(`${host}/like/${postId}`)
      .then((res) => {
        const data = res.data.data;
        if (data !== null) {
          setlikeCnt(data.length);
          data.filter((like) => like.user === userId).length > 0 ? setClick(true) : setClick(false);
        }
      })
  }

  const modalOpen = async () => {
    await localStorage.setItem('isTransacted', true)
    setIsTransacted(JSON.parse(localStorage.getItem('isTransacted')))
  }

  const modalClose = () => {

    localStorage.setItem('isTransacted', false)
    setIsTransacted(JSON.parse(localStorage.getItem('isTransacted')))
  }

  const LikeButtonClick = async () => {
    if (!isClick) { // 낙장불입
      if (userId === postUser) {
        return alert('본인 게시물은 좋아요를 누를 수 없습니다.');
      }

      modalOpen()

      const txResult = await axios.post((`${host}/contract/like`), { address: postAddress });

      if (txResult.data.data) {
        await axios.post(`${host}/like`, { postId: postId, userId: userId });
        setClick(!isClick);
        setlikeCnt(likeCnt + 1);
      }

      setTimeout(() => {
        modalClose()
      }, 1000);
    }
  }

  return (
    <div className="reaction-wrapper">
      <Heart isClick={isClick} onClick={LikeButtonClick} />
      <h className="likes"> {likeCnt} likes</h>
      <div className="post-time">
        <span>{postDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>

      <Modal show={isTransacted} onHide={!isTransacted} size='sm'>
        <Modal.Body>
          {postUserName} 님께 $PETO를 지급중입니다.
          <br></br>
          잠시만 기다려주세요...
        </Modal.Body>
      </Modal>
    </div>
  );

};

export default LikeButton;