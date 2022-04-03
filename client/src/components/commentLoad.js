import React, { useState, useEffect } from "react";
import axios from 'axios';
import Reply from "./Reply";

const CommentLoad = ({postId, userId, postUser}) =>{
    const [userInfo, setUserInfo] = useState({})
    const [comments, setComments] = useState([]);

    useEffect(async() => {
        await axios.get(`http://localhost:4000/user/${userId}`)
            .then((res) => {
                setUserInfo(res.data.data);
            });

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

        if((commentUser === userId) || (userId === postUser)){
            await axios.post(`http://localhost:4000/comment/${commentId}`)
            element.remove()
        }
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

    const addReplyhandler = async(e) =>{
        if(!JSON.parse(localStorage.getItem('isOpenReply'))) {
            const commentId = e.target.getAttribute('data-id');
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
            <div className = "reply-user-wrapper">
                    <span>└</span>
                    <img className="rounded-circle" src=${reply.user.profile_image} alt="profile" width="45"/>
                    <div className="reply-comment-wrapper">
                        <span class="reply-user">
                            ${
                                reply.user.user_name.length > 10 ?
                                reply.user.user_name.slice(0, 4) + '···' + reply.user.user_name.slice(-4)
                                : reply.user.user_name
                            }
                        </span>
                    <p className="reply-contents">${reply.contents}</p>
                </div>
            </div>
            <div className = "reply-btn-wrapper">
                    <div className="post-time">
                        <span>${reply.reply_date.split('T')[0]}</span>
                    </div>
                    <button id="btn_${reply._id}" data-user=${reply.user._id} data-id=${reply._id}> delete </button>
                </div>`

            parent.append(divEl)

            document.getElementById(`btn_${reply._id}`).addEventListener('click', function(e){
                replyDelete(e.target)
            });

            document.getElementById(`form_${commentId}`).remove();
        })
    }

    return(
        <div className="comments">
            {comments.map((comment) => {
                return (
                    <div key={comment._id} className = "commentForm_wrapper" id= {comment._id} >

                        <div className = "comment-user-wrapper">

                        <img className="rounded-circle" src={comment.user.profile_image} alt={"profile"} width="45"/>
                            <div className = "comment-comment-wrapper">
                                <span class="comment-user">
                                {
                                    comment.user.user_name.length > 10 ?
                                    comment.user.user_name.slice(0, 4) + '···' + comment.user.user_name.slice(-4)
                                    : comment.user.user_name
                                }
                                </span>
                                <p className="comment-contents">{comment.contents}</p>
                            </div>

                        </div>

                        <div className = "comment-btn-wrapper">
                            <div className="post-time">
                                <span>{comment.comment_date.split('T')[0]}</span>

                            {
                                userId === comment.user._id || userId === postUser ?
                                <button className = "comment-btn-delete" onClick={deleteButton} data-user={comment.user._id} data-id={comment._id}> delete </button>
                                : <></>
                            }
                            <button className = "comment-btn-reply" onClick={addReplyhandler} data-user={comment.user._id} data-id={comment._id}> reply </button>
                            </div>
                        </div>

                        <div className='replies' id={`replies_${comment._id}`}>
                            <Reply userId={userId} postUser={postUser} commentId={comment._id} replyDelete={replyDelete}/>
                        </div>
                    </div>
                )
            })}
        </div>
    );

}
export default CommentLoad;
