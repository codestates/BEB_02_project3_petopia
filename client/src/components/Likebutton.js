import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import axios from 'axios';
import './NFTList.js'

const LikeButton = ({postId, userId, postAddress}) => {
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
      <p className="likes"> {likeCnt} likes</p>
    </div>
  );

};

export default LikeButton;