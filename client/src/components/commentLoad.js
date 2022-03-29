import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.js';
// import ReplyLoad from "./replyLoad.js";
import Button from "@restart/ui/esm/Button";

const CommentLoad = ({postId, userId, postUser}) =>{
    
    const [comments, setComments] = useState([]);
    const [replyMsg, setreplyMsg] = useState('');

    
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

    const replyDelete = async(target) => {

        const replyUser = target.getAttribute('data-user')
        const replyId = target.getAttribute('data-id')
        const element = document.getElementById(replyId)
        
        if((replyUser === userId) ||
            (userId === postUser)){
                
                await axios.post(`http://localhost:4000/reply/${replyId}`)
                element.remove()  
                                                 
        }
    }
    
    const addReplyhandler = async(e) =>{

        const commentId = e.target.getAttribute('data-id');
        const parent = document.getElementById(commentId)

        const divEl = document.createElement('div');
        divEl.id = `form_${commentId}`

        divEl.className = 'Reply-wrapper'
        divEl.innerHTML = `<img src="${''}" class="icon" alt="${''}"/>
        <input id="input_${commentId}" defaultValue="${""}" type="text" class="Reply-box" placeholder="Add a Reply"  />
        <button id="btn_${commentId}"className="Reply-btn" data-id="${commentId}"">post</button>`

        parent.appendChild(divEl);
        document.getElementById(`input_${commentId}`).addEventListener('change', function(e){
            setreplyMsg(e.target.value)
            
        })

        document.getElementById(`btn_${commentId}`).addEventListener('click', function(e){
            insertReply(e.target.getAttribute('data-id'))
            
        })


    }

    

    const insertReply = async(commentId) =>
    {

            console.log(replyMsg)
        await axios.post('http://localhost:4000/reply',{       // POST
            commentId: commentId,
            userId: userId,
            replyDate: new Date().toLocaleDateString('ko-KR'),
            contents : replyMsg })
        .then((res) =>{
            setreplyMsg('');
            
            const reply = res.data.data;
            const parent = document.getElementById(`replies_${commentId}`)
            
            console.log(parent);

            const divEl = document.createElement('div');
        
            divEl.className = 'Reply-wrapper'
            divEl.id = reply._id;
            divEl.innerHTML = `<div>대댓글입니다.</div>
            <img className="rounded-circle" src=${''} alt=${''} width="45"/>
            <div className="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">${reply.user}</span></div>
            <p className="replyUser">${reply.contents}</p>
            <div className="post-time">
                <span>${reply.reply_date.split('T')[0]}</span>
            </div>
            
            <button id="btn_${reply._id}" data-user=${reply.user} data-id=${reply._id}> delete </button>
            `
            parent.append(divEl)
            
            document.getElementById(`btn_${reply._id}`).addEventListener('click', function(e){
                replyDelete(e.target)
                
            })

            document.getElementById(`form_${commentId}`).remove();


        })
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
                            <div className='replies' id={`replies_${comment._id}`}>
                            </div>
                        
                        
                        {/* <ReplyLoad commentId={comment._id} 
                        userId={userId} 
                        commentUser={comment.user._id}/> */}

                    </div>
                )
            })}
        </div>
    );

}
export default CommentLoad;