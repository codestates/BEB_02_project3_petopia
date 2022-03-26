import React, { useState } from "react";
import Heart from "react-animated-heart";
import axios from 'axios';



const LikeButton = () => {
  const [users, setUsers] = useState(null);
  const [isClick, setClick] = useState(false);
  const [error, setError] = useState(null);

  // like 상태 확인
  window.onload = function() {
    likeCheck();
    
  };

  const likeCheck = async () =>{
    try{
      const responseLike = await axios.get('http://localhost:5000/like'); // GET findAll
      setUsers(responseLike.data);
      console.log(responseLike);
    } catch (e){
      setError(e);
    }
    console.log(setUsers);
  }
  

  const LikeButtonClick = () =>{
    
    if(isClick==false) // 낙장불입
    {
      axios.post('http://localhost:5000/like',{       // POST
      postId: 'Fred321',
      walletAddress: 'Flintstone'})
      
      setClick(!isClick)
      

    }
  }  


  return (
    <div className="like-button">
      
      <Heart isClick={isClick} onClick={ () => 
        
        LikeButtonClick()
        
        } />
      
    </div>
    
    
    
  );


};

export default LikeButton;