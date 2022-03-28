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
                        {/* 
                            
                            댓글삭제버튼 필요
                            댓글작성자 본인이거나 포스트 작성자만 삭제가능하도록 버튼 가변 생성
                            
                        */
                            
                            <button onClick={
                                deleteButton
                            } data-user={comment.user._id} data-id={comment._id}> delete </button>
                            
                        }
                        
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