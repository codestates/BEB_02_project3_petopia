import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.js';
import Button from "@restart/ui/esm/Button";

const replyLoad = ({commentId, userId, commentUser}) =>{
    
    const [replies, setReplies] = useState([]);
    
        useEffect(() => {
            loadReplies();
        
        }, [])

    const loadReplies = async() =>{
        await axios.get(`http://localhost:4000/reply/${commentId}`)
        
        .then((res) => {
            setReplies(res.data.data);
        });
    }
    
    const deleteButton = async(e) => {

        const replyUser = e.target.getAttribute('data-user')
        const replyId = e.target.getAttribute('data-id')
        const element = document.getElementById(replyId)

        if((replyUser === userId) ||
            (userId === commentUser)){
                
                await axios.post(`http://localhost:4000/reply/${replyId}`)
                element.remove()  
                                                 
        }
    }
    
    
    return(
        <div className="reply">
            {replies.map((reply) => {
                return (
                    <div className = "reply_wrapper" id= {reply._id} >
                        <div>대댓글입니다.</div>
                        <img className="rounded-circle" src={reply.user.profile_image} alt={"profile"} width="45"/>
                        <div className="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">{reply.user.user_name}</span></div>
                        <p className="replyUser">{reply.contents}</p>
                        <div className="post-time">
                            <span>{reply.reply_date.split('T')[0]}</span>
                        </div>
                        {/* 
                            
                            댓글삭제버튼 필요
                            댓글작성자 본인이거나 포스트 작성자만 삭제가능하도록 버튼 가변 생성
                            
                        */
                            
                            <button onClick={
                                deleteButton
                            } data-user={reply.user._id} data-id={reply._id}> delete </button>
                            
                        }

                        
                    </div>
                )
            })}
        </div>
    );

}
export default replyLoad;