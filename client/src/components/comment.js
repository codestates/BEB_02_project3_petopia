import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../pages/main.css';

const Comment = () => {
    const [msg , setMsg] = useState('');

    const handleChangeMsg = (event) => {
        setMsg(event.target.value)
      };

    const commentButtonClick = () =>{
        
        setMsg()

        axios.post('http://localhost:5000/comment',{       // POST
            postId: '123',
            walletAddress: 'Flintstone',
            commentDate: new Date().toLocaleDateString('ko-KR'),
            contents : msg })
      
    }
    
    

    return(
        <div class="comment-wrapper">
            <img src="https://i.imgur.com/aoKusnD.jpg" class="icon" alt=""/>
            <input defaultValue={""} type="text" class="comment-box" placeholder="Add a comment" onChange={handleChangeMsg} value= {msg}/>
            <button class="comment-btn" onClick={commentButtonClick}>post</button>
            
        </div>
   
   
    );

    

};

export default Comment;