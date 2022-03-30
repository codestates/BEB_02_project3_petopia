import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.css';


const Comment = ({postId, userId, postUser}) => {
    const [userInfo, setUserInfo] = useState({})
    const [msg , setMsg] = useState('');
    
    useEffect(async() => {
        await axios.get(`http://localhost:4000/user/${userId}`)
            .then((res) => {
                setUserInfo(res.data.data);
            });
    }, []);

    const commentDelete = async(target) => {

        const commentUser = target.getAttribute('data-user')
        const commentId = target.getAttribute('data-id')

        const element = document.getElementById(commentId);

        if((commentUser === userId)){
            await axios.post(`http://localhost:4000/comment/${commentId}`);
            element.remove();
        }
    }

    const handleChangeMsg = (event) => {
        setMsg(event.target.value)
      };
    
    const addReplyhandler = async(target) =>{
        
        if(!JSON.parse(localStorage.getItem('isOpenReply'))) {
            const commentId = target.getAttribute('data-id');
            const parent = document.getElementById(commentId)
            const divEl = document.createElement('div');
            divEl.id = `form_${commentId}`
            divEl.className = 'Reply-wrapper'
            divEl.innerHTML = `
                <img src=${userInfo.profile_image} class="icon" alt=${userInfo._id} width="45"/>
                <input id="input_${commentId}" type="text" class="Reply-box" placeholder="Add a Reply" />
                <button id="submit_${commentId}"className="Reply-btn" data-id=${commentId}>submit</button>
                <button id="cancel_${commentId}"className="Reply-btn" data-id=${commentId}>cancle</button>`
    
            parent.appendChild(divEl);
    
            document.getElementById(`submit_${commentId}`).addEventListener('click', function(e){
                insertReply(e.target.getAttribute('data-id'))
            })

            document.getElementById(`cancel_${commentId}`).addEventListener('click', function(e){
                localStorage.setItem('isOpenReply', false);
                divEl.remove();
            })
            localStorage.setItem('isOpenReply', true);
        }
    }

    const insertReply = async(commentId) => {
        await axios.post('http://localhost:4000/reply',{       // POST
            commentId: commentId,
            userId: userId,
            replyDate: new Date().toLocaleDateString('ko-KR'),
            contents : document.getElementById(`input_${commentId}`).value })
        .then((res) =>{
            localStorage.setItem('isOpenReply', false);
            const reply = res.data.data;
            const parent = document.getElementById(`replies_${commentId}`)
            
            const divEl = document.createElement('div');
            divEl.className = 'reply-wrapper'
            divEl.id = reply._id;
            divEl.innerHTML = `
                <span>└</span>
                <img className="rounded-circle" src=${reply.user.profile_image} alt="profile" width="45"/>
                <div className="d-flex flex-column flex-wrap ml-2">
                    <span class="font-weight-bold">
                    ${
                        reply.user.user_name.length > 10 ?
                        reply.user.user_name.slice(0, 4) + '···' + reply.user.user_name.slice(-4)
                        : reply.user.user_name
                    }
                    </span>
                </div>
                <p className="replyUser">${reply.contents}</p>
                <div className="post-time">
                    <span>${reply.reply_date.split('T')[0]}</span>
                </div>
                <button id="btn_${reply._id}" data-user=${reply.user._id} data-id=${reply._id}> delete </button>`
            
            parent.append(divEl)
            
            document.getElementById(`btn_${reply._id}`).addEventListener('click', function(e){
                replyDelete(e.target)
            });

            document.getElementById(`form_${commentId}`).remove();
        })
    }

    const replyDelete = async(target) => {
        const replyUser = target.getAttribute('data-user')
        const replyId = target.getAttribute('data-id')
        const element = document.getElementById(replyId)
        
        if((replyUser === userId) || (userId === postUser)){
            await axios.post(`http://localhost:4000/reply/${replyId}`)
            element.remove()
        }
    }

    const commentButtonClick = async() =>{
        await axios.post('http://localhost:4000/comment',{       // POST
            postId: postId,
            userId: userId,
            commentDate: new Date().toLocaleDateString('ko-KR'),
            contents : msg })
        .then((res) => {
            
            setMsg('');
            
            const newComment = res.data.data;
            const parent = document.getElementById(`comments_${postId}`);
            const divElWrapper = document.createElement('div')
            divElWrapper.className = 'commentForm_wrapper'
            divElWrapper.id = newComment._id
            divElWrapper.innerHTML = `
                <img className="rounded-circle" src=${newComment.user.profile_image} alt="profile" width="45"/> 
                <div className="d-flex flex-column flex-wrap ml-2">
                    <span class="font-weight-bold">
                        ${
                            newComment.user.user_name.length > 10 ?
                            newComment.user.user_name.slice(0, 4) + '···' + newComment.user.user_name.slice(-4)
                            : newComment.user.user_name
                        }
                    </span>
                </div>
                <p className="commentUser">${newComment.contents}</p>
                <div className="post-time">
                    <span>${newComment.comment_date.split('T')[0]}</span>
                </div>
                <button id="del_btn_${newComment._id}" data-user=${newComment.user._id} data-id=${newComment._id}> delete </button>
                <button id="add_btn_${newComment._id}" data-user=${newComment.user._id} data-id=${newComment._id}> 대댓글 </button>
                <div className='replies' id="replies_${newComment._id}"}>`

            parent.append(divElWrapper);
            
            document.getElementById(`del_btn_${newComment._id}`).addEventListener('click', function(e){
                commentDelete(e.target)
            })

            document.getElementById(`add_btn_${newComment._id}`).addEventListener('click', function(e){
                addReplyhandler(e.target)
            })

        });
    }
   
    return(
        <div className="comment-wrapper">
            <img src={userInfo.profile_image} class="icon" alt={userInfo._id}/>
            <input defaultValue={""} type="text" class="comment-box" placeholder="Add a comment" onChange={handleChangeMsg} value= {msg}/>
            <button className="comment-btn" onClick={commentButtonClick}>post</button>
        </div>
    );
};

export default Comment;
