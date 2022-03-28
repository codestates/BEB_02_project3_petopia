import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.js';
import ReplyLoad from "./replyLoad.js";
import Button from "@restart/ui/esm/Button";

const CommentLoad = ({postId, userId, postUser}) =>{
    
    const [comments, setComments] = useState([]);
    
    
        useEffect(() => {
            loadComment();
        
        }, [])

    const loadComment = async() =>{
        await axios.get(`http://localhost:4000/comment/${postId}`)
        .then((res) => {
            setComments(res.data.data);
        });
    }
    
    const deleteButton = async(e) => {

        const commentUser = e.target.getAttribute('data-user')
        const commentId = e.target.getAttribute('data-id')
        const element = document.getElementById(commentId)

        if((commentUser === userId) ||
            (userId === postUser)){
                
                await axios.post(`http://localhost:4000/comment/${commentId}`)
                element.remove()  
                                                 
        }
    }
    
    const addReplyhandler = async(e) =>{

        const commentId = e.target.getAttribute('data-id');
        const parent = document.getElementById(commentId)

        const divEl = document.createElement('div');
        
        divEl.className = 'Reply-wrapper'
        divEl.innerHTML = `<img src=${''} class="icon" alt=${''}/>
        <input defaultValue=${""} type="text" class="Reply-box" placeholder="Add a Reply" onChange=${''} value= ${''}/>
        <button className="Reply-btn" onClick=${''}>post</button>`

        parent.appendChild(divEl);


        /*
        <div className="Reply-wrapper">
            <img src={userInfo.profile_image} class="icon" alt={userInfo._id}/>
            <input defaultValue={""} type="text" class="Reply-box" placeholder="Add a Reply" onChange={handleChangeMsg} value= {msg}/>
            <button className="Reply-btn" onClick={ReplyButtonClick}>post</button>
        </div>
        */

    }
    
    return(
        <div className="comments">
            {comments.map((comment) => {
                return (
                    <div className = "commentForm_wrapper" id= {comment._id} >
                        <img className="rounded-circle" src={comment.user.profile_image} alt={"profile"} width="45"/>
                        <div className="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">{comment.user.user_name}</span></div>
                        <p className="commentUser">{comment.contents}</p>
                        <div className="post-time">
                            <span>{comment.comment_date.split('T')[0]}</span>
                        </div>
                        
                            
                            <button onClick={
                                deleteButton
                            } data-user={comment.user._id} data-id={comment._id}> delete 
                            </button>
                            
                            <button onClick={
                                addReplyhandler
                            } data-user={comment.user._id} data-id={comment._id}> 대댓글 
                            </button>

                        
                        
                        <ReplyLoad commentId={comment._id} 
                        userId={userId} 
                        commentUser={comment.user.user_name}/>

                    </div>
                )
            })}
        </div>
    );

}
export default CommentLoad;