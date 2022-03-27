import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../pages/main.css';
import './NFTList.js'


const Comment = () => {
    const [msg , setMsg] = useState('');

    const handleChangeMsg = (event) => {
        setMsg(event.target.value)
      };

    const commentButtonClick = () =>{
        
        setMsg()

        axios.post('http://localhost:4000/comment',{       // POST
            postId: '123',
            walletAddress: comment.userName,
            commentDate: new Date().toLocaleDateString('ko-KR'),
            contents : msg })
      
    }
    
    

    return(
        <div class="comment-wrapper">
            <div className="comment">
                <img src={comment.profile} alt={comment.profile} style={{width:"50px", height:"50px"}}/>
                <span>{comment.userName}</span>
                <span>{comment.content}</span>
                <div className="replies">
                    {comment.replies.map((reply) => {
                        return (
                            <div className="reply">
                                &emsp;
                                <img src={reply.profile} alt={reply.profile} style={{width:"50px", height:"50px"}}/>
                                <span>{reply.userName}</span>
                                <span>{reply.content}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <img src={token.postInfo.profile} class="icon" alt=""/>
                <input defaultValue={""} type="text" class="comment-box" placeholder="Add a comment" onChange={handleChangeMsg} value= {msg}/>
                <button class="comment-btn" onClick={commentButtonClick}>post</button>
            </div>
        </div>
   
   
    );

    

};

export default Comment;