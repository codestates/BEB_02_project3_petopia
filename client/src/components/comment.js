import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.css';

const Comment = ({postId, userId}) => {
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
                <span class="font-weight-bold">${newComment.user.user_name}</span></div>
                <p className="commentUser">${newComment.contents}</p>
                <div className="post-time">
                    <span>${newComment.comment_date.split('T')[0]}</span>
                </div>
                <button id="btn_${newComment._id}" data-user=${newComment.user._id} data-id=${newComment._id}> delete </button>`

            parent.append(divElWrapper);
            
            document.getElementById(`btn_${newComment._id}`).addEventListener('click', function(e){
                commentDelete(e.target)
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