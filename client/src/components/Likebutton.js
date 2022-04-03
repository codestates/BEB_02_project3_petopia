import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import axios from 'axios';
import './NFTList.js'
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

const LikeButton = ({postId, userId, postUser, postAddress}) => {
  const [isClick, setClick] = useState(false);
  const [likeCnt, setlikeCnt] = useState(0);

  // like 상태 확인
  useEffect(() => {
    initSetLikes();
  }, [])
  
  const initSetLikes = async() => {
    await axios.get(`${host}/like/${postId}`)
    .then((res) => {
      const data = res.data.data;
      if(data !== null) {
        setlikeCnt(data.length);
        data.filter((like) => like.user === userId).length > 0 ? setClick(true) : setClick(false);
      }
    })
  }

  const LikeButtonClick = async() =>{
    if(!isClick) { // 낙장불입
      if(userId === postUser) {
        return alert('본인 게시물은 좋아요를 누를 수 없습니다.');
      }
      
      const txResult = await axios.post((`${host}/contract/like`), { address : postAddress });
      
      if(txResult.data.data) {
          await axios.post(`${host}/like`,{postId: postId, userId: userId});
          setClick(!isClick);
          setlikeCnt(likeCnt + 1);
      }
    }
  }  

  return (
    <div className="reaction-wrapper">
      <Heart isClick={isClick} onClick={LikeButtonClick} />
      <p className="likes"> {likeCnt} likes</p>
    </div>
  );

};

export default LikeButton;