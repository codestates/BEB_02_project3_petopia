import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import axios from 'axios';
import './NFTList.js'

const LikeButton = ({postId, userId, postUser, postAddress, postDate}) => {
  const [isClick, setClick] = useState(false);
  const [likeCnt, setlikeCnt] = useState(0);

  // like 상태 확인
  useEffect(() => {
    initSetLikes();
  }, [])
  
  const initSetLikes = async() => {
    await axios.get(`http://localhost:4000/like/${postId}`)
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
      
      const txResult = await axios.post(('http://localhost:4000/contract/like'), { address : postAddress });
      
      if(txResult.data.data) {
          await axios.post('http://localhost:4000/like',{postId: postId, userId: userId});
          setClick(!isClick);
          setlikeCnt(likeCnt + 1);
      }
    }
  }  

  return (
    <div className="reaction-wrapper">
      <Heart isClick={isClick} onClick={LikeButtonClick} />
      <h className="likes"> {likeCnt} likes</h>
      <div className="post-time">
        <span>{postDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      
    </div>
  );

};

export default LikeButton;