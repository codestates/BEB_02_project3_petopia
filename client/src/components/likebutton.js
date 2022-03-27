import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import axios from 'axios';

const LikeButton = () => {
  const [users, setUsers] = useState(null);
  const [isClick, setClick] = useState(false);
  const [likeCnt, setlikeCnt] = useState(0);

  // like 상태 확인
  useEffect(() => {
    likeCheck();
  }, [])
  
  
  const likeCheck = async () =>{
      
      await axios.get('http://localhost:5000/like/')
            .then((res) => {
                setUsers(res.data.data)
      });
      
      // 불러 온 데이터에 if wallet_address가 있다면 isClick은 true
      const filterLike = users.filter(function(value){
        return value.wallet_address === 'Flintstone'
      });

      if(filterLike !== null)
      {
        setClick(true)
      }

      // setUsers의 개수를 count
      setlikeCnt(users.length);
    
  }

  const LikeButtonClick = () =>{
    
    if(isClick==false) // 낙장불입
    {
      axios.post('http://localhost:5000/like',{       // POST
      postId: 'Fred321',
      walletAddress: 'Flintstone'})
      
      setClick(!isClick)
      setlikeCnt(likeCnt + 1)      

    }
  }  


  return (
    <div className="reaction-wrapper">
      
      <Heart isClick={isClick} onClick={ () => 
        LikeButtonClick()
        } />
      <p class="likes"> {likeCnt} likes</p>
                        
    </div>
    
    
    
  );


};

export default LikeButton;