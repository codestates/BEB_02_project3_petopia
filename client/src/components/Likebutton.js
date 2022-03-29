import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import axios from 'axios';
import './NFTList.js'

const LikeButton = ({postId, userId}) => {
  const [isClick, setClick] = useState(false);
  const [likeCnt, setlikeCnt] = useState(0);
  const [likes, setLikes] = useState([]);

  // like 상태 확인
  useEffect(() => {
    initSetLikes();
  }, [])
  
  const initSetLikes = async() => {
    await axios.get(`http://localhost:4000/like/${postId}`)
    .then((res) => {
      const data = res.data.data;
      if(data !== null) {
        setLikes(data);
        setlikeCnt(data.length);
        // TODO : 데이터 초기 셋팅시 좋아요 하트 셋팅 안됨..아마도 고질적으로 겪었던 useEffect 관련 데이터 읽는 순서인 듯 
        data.filter(like => (like.user === userId).length > 0 ? setClick(true) : setClick(false));
      }
    })
  }

  const LikeButtonClick = async() =>{
    if(!isClick) // 낙장불입
    {
      await axios.post('http://localhost:4000/like',{postId: postId, userId: userId});
      setClick(!isClick);
      setlikeCnt(likeCnt + 1)      
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