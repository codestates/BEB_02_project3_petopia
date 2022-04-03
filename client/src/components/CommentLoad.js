import React, { useState, useEffect } from "react";
import axios from 'axios';
import Reply from "./Reply";
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

const CommentLoad = ({postId, userId, postUser}) =>{
    const [userInfo, setUserInfo] = useState({})
    const [comments, setComments] = useState([]);

    useEffect(async() => {
        await axios.get(`${host}/user/${userId}`)
            .then((res) => {
                setUserInfo(res.data.data);
            });

        loadComment();
    }, [])

    const loadComment = async() =>{
        await axios.get(`${host}/comment/${postId}`)
        .then((res) => {
            setComments(res.data.data);
        });
    }

    const deleteButton = async(e) => {
        const commentUser = e.target.getAttribute('data-user')
        const commentId = e.target.getAttribute('data-id')
        const element = document.getElementById(commentId)

        if((commentUser === userId) || (userId === postUser)){
            await axios.post(`${host}/comment/${commentId}`)
            element.remove()
        }
    }

    const replyDelete = async(target) => {
        const replyUser = target.getAttribute('data-user')
        const replyId = target.getAttribute('data-id')
        const element = document.getElementById(replyId)

        if((replyUser === userId) || (userId === postUser)){
            await axios.post(`${host}/reply/${replyId}`)
            element.remove()
        }
    }

    const addReplyhandler = async(e) =>{
        if(!JSON.parse(localStorage.getItem('isOpenReply'))) {
            const commentId = e.target.getAttribute('data-id');
            const parent = document.getElementById(commentId);
            const divEl = document.createElement('div');
            divEl.id = `form_${commentId}`;
            divEl.className = 'Reply-wrapper';

            const img = document.createElement('img');
            img.className = 'icon';
            img.src = userInfo.profile_image;
            img.alt = userInfo._id;
            img.width = '45';

            const input = document.createElement('input');
            input.className = 'Reply-box';
            input.id = `input_${commentId}`;
            input.type = 'text';
            input.placeholder = 'Add a Reply';

            const btnPost = document.createElement('button');
            btnPost.id = `submit_${commentId}`;
            btnPost.className = 'reply-btn'
            btnPost.textContent = 'post';
            btnPost.setAttribute('data-id', commentId);

            const btnCancel = document.createElement('button');
            btnCancel.id = `cancel_${commentId}`;
            btnCancel.className = 'reply-btn'
            btnCancel.textContent = 'cancle';
            btnCancel.setAttribute('data-id', commentId);

            divEl.appendChild(img);
            divEl.appendChild(input);
            divEl.appendChild(btnPost);
            divEl.appendChild(btnCancel);

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
        const replyText = document.getElementById(`input_${commentId}`).value;
        if(replyText === null || replyText === 'undefined' || replyText === '') return alert('텍스트를 입력하세요.')
        
        await axios.post(`${host}/reply`,{       // POST
            commentId: commentId,
            userId: userId,
            replyDate: new Date().toLocaleDateString('ko-KR'),
            contents : replyText })
        .then((res) =>{
            localStorage.setItem('isOpenReply', false);
            const reply = res.data.data;
            const parent = document.getElementById(`replies_${commentId}`)

            const divEl = document.createElement('div');
            divEl.className = 'replyForm-wrapper'
            divEl.id = reply._id;

            const divReplyUser = document.createElement('div');
            divReplyUser.className = 'reply-user-wrapper';

            const spanReply = document.createElement('span');
            spanReply.textContent = '┗';

            const img = document.createElement('img');
            img.className = 'rounded-circle';
            img.src = reply.user.profile_image;
            img.alt = 'profile';
            img.width = '45'

            const divReplyComment = document.createElement('div');
            divReplyComment.className = 'reply-comment-wrapper';

            const spanRelyUser = document.createElement('span');
            spanRelyUser.className = 'reply-user';
            spanRelyUser.textContent = reply.user.user_name.length > 10 ?
                reply.user.user_name.slice(0, 4) + '···' + reply.user.user_name.slice(-4)
                : reply.user.user_name;
            
            const pContent = document.createElement('p');
            pContent.className = 'reply-contents';
            pContent.textContent = reply.contents;

            const divReplyBtn = document.createElement('div');
            divReplyBtn.className = 'reply-btn-wrapper';

            const divPostTime = document.createElement('div');
            divPostTime.className = 'post-time';
            
            const spanDate = document.createElement('span');
            spanDate.textContent = reply.reply_date.split('T')[0];

            const btnDelete = document.createElement('button');
            btnDelete.id = `btn_${reply._id}`;
            btnDelete.className = 'reply-btn-reply'
            btnDelete.textContent = 'delete';
            btnDelete.setAttribute('data-user', reply.user._id);
            btnDelete.setAttribute('data-id', reply._id);

            divEl.appendChild(divReplyUser)
            divReplyUser.appendChild(spanReply)
            divReplyUser.appendChild(img)
            divReplyUser.appendChild(divReplyComment)
            divReplyComment.appendChild(spanRelyUser)
            divReplyComment.appendChild(pContent)

            divEl.appendChild(divReplyBtn)
            divReplyBtn.appendChild(divPostTime)
            divPostTime.appendChild(spanDate)
            divPostTime.appendChild(btnDelete)

            parent.append(divEl)

            document.getElementById(`btn_${reply._id}`).addEventListener('click', function(e){
                replyDelete(e.target)
            });

            document.getElementById(`form_${commentId}`).remove();
        })
    }

    return(
        <div className="comments" id={`comments_${postId}`}>
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
                        <Reply userId={userId} postUser={postUser} commentId={comment._id} replyDelete={replyDelete}/>
                    </div>
                )
            })}
        </div>
    );

}
export default CommentLoad;
