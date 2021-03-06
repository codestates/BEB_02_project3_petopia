import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.css';
import iconReply from '../css/image/icon-reply.png';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

const Comment = ({ postId, userId, postUser }) => {
    const [userInfo, setUserInfo] = useState({})
    const [msg, setMsg] = useState('');

    useEffect(async () => {
        await axios.get(`${host}/user/${userId}`)
            .then((res) => {
                setUserInfo(res.data.data);
            });
    }, []);

    const commentDelete = async (target) => {

        const commentUser = target.getAttribute('data-user')
        const commentId = target.getAttribute('data-id')

        const element = document.getElementById(commentId);

        if ((commentUser === userId)) {
            await axios.post(`${host}/comment/${commentId}`);
            element.remove();
        }
    }

    const handleChangeMsg = (event) => {
        setMsg(event.target.value)
    };

    const addReplyhandler = async (target) => {

        if (!JSON.parse(localStorage.getItem('isOpenReply'))) {
            const commentId = target.getAttribute('data-id');
            const parent = document.getElementById(commentId)
            const divEl = document.createElement('div');
            divEl.id = `form_${commentId}`;
            divEl.className = 'Reply-wrapper';

            const img = document.createElement('img');
            img.className = 'rounded-circle';
            img.src = userInfo.profile_image;
            img.alt = userInfo._id;
            img.width = '45';
            img.height = '45';

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

            document.getElementById(`submit_${commentId}`).addEventListener('click', function (e) {
                insertReply(e.target.getAttribute('data-id'))
            })

            document.getElementById(`cancel_${commentId}`).addEventListener('click', function (e) {
                localStorage.setItem('isOpenReply', false);
                divEl.remove();
            })
            localStorage.setItem('isOpenReply', true);
        }
    }

    const insertReply = async (commentId) => {
        const replyText = document.getElementById(`input_${commentId}`).value;
        if(replyText === null || replyText === 'undefined' || replyText === '') return alert('???????????? ???????????????.')

        await axios.post(`${host}/reply`, {       // POST
            commentId: commentId,
            userId: userId,
            // replyDate: new Date().toLocaleDateString('ko-KR'),
            replyDate: moment().format('YYYY-MM-DD'),
            contents: replyText
        })
            .then((res) => {
                localStorage.setItem('isOpenReply', false);
                const reply = res.data.data;
                const parent = document.getElementById(`replies_${commentId}`)

                const divEl = document.createElement('div');
                divEl.className = 'replyForm-wrapper'
                divEl.id = reply._id;

                const divReplyUser = document.createElement('div');
                divReplyUser.className = 'reply-user-wrapper';
    
                const replyIcon = document.createElement('img')
                replyIcon.className = 'icon-reply';
                replyIcon.src = iconReply;
    
                const img = document.createElement('img');
                img.className = 'rounded-circle';
                img.src = reply.user.profile_image;
                img.alt = 'profile';
                img.width = '45'
                img.height = '45'
                img.style = {'margin-top' : '3px'}
    
                const divReplyComment = document.createElement('div');
                divReplyComment.className = 'reply-comment-wrapper';
    
                const spanRelyUser = document.createElement('span');
                spanRelyUser.className = 'reply-user';
                spanRelyUser.textContent = reply.user.user_name.length > 10 ?
                    reply.user.user_name.slice(0, 4) + '??????' + reply.user.user_name.slice(-4)
                    : reply.user.user_name;
                
                const pContent = document.createElement('p');
                pContent.className = 'reply-contents';
                pContent.textContent = reply.contents;

                divEl.appendChild(divReplyUser)
                divReplyUser.appendChild(replyIcon)
                divReplyUser.appendChild(img)
                divReplyUser.appendChild(divReplyComment)
                divReplyComment.appendChild(spanRelyUser)
                divReplyComment.appendChild(pContent)
    
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
       
                divEl.appendChild(divReplyBtn)
                divReplyBtn.appendChild(divPostTime)
                divPostTime.appendChild(spanDate)
                divPostTime.appendChild(btnDelete)

                parent.append(divEl)

                document.getElementById(`btn_${reply._id}`).addEventListener('click', function (e) {
                    replyDelete(e.target)
                });

                document.getElementById(`form_${commentId}`).remove();
            })
    }

    const replyDelete = async (target) => {
        const replyUser = target.getAttribute('data-user')
        const replyId = target.getAttribute('data-id')
        const element = document.getElementById(replyId)

        if ((replyUser === userId) || (userId === postUser)) {
            await axios.post(`${host}/reply/${replyId}`)
            element.remove()
        }
    }

    const commentButtonClick = async () => {
        if(msg === null || msg === 'undefined' || msg === '') return alert('???????????? ???????????????.')

        await axios.post(`${host}/comment`, {       // POST
            postId: postId,
            userId: userId,
            // commentDate: new Date().toLocaleDateString('ko-KR'),
            commentDate: moment().format('YYYY-MM-DD'),
            contents: msg
        })
            .then((res) => {

                setMsg('');

                const newComment = res.data.data;
                const parent = document.getElementById(`comments_${postId}`);

                const divElWrapper = document.createElement('div')
                divElWrapper.className = 'commentForm_wrapper'
                divElWrapper.id = newComment._id
                
                const divCommentUser = document.createElement('div')
                divCommentUser.className = 'comment-user-wrapper'
                
                const profileImage = document.createElement('img')
                profileImage.className = "rounded-circle"
                profileImage.src = newComment.user.profile_image;
                profileImage.alt = "profile"
                profileImage.width = "45"
                profileImage.height = "45"
                profileImage.style = {'margin-top' : '3px'}

                const divCommentWrapper = document.createElement('div');
                divCommentWrapper.className = "comment-comment-wrapper"

                const spanCommnetUser = document.createElement('span')
                spanCommnetUser.className = "comment-user"
                spanCommnetUser.textContent = newComment.user.user_name.length > 10 ?
                    newComment.user.user_name.slice(0, 4) + '??????' + newComment.user.user_name.slice(-4)
                    : newComment.user.user_name

                const pContens = document.createElement('p')
                pContens.className = 'comment-contents"'
                pContens.textContent = newComment.contents;

                divElWrapper.appendChild(divCommentUser);
                divCommentUser.appendChild(profileImage)
                divCommentUser.appendChild(divCommentWrapper)
                divCommentWrapper.appendChild(spanCommnetUser)
                divCommentWrapper.appendChild(pContens);

                const divBtnWrapper = document.createElement('div');
                divBtnWrapper.className = 'comment-btn-wrapper'

                const divPostTime = document.createElement('div');
                divPostTime.className = 'post-time'

                const spanDate = document.createElement('span')
                spanDate.textContent = newComment.comment_date.split('T')[0];

                const btnDelete = document.createElement('button')
                btnDelete.className = "comment-btn-delete"
                btnDelete.id = `del_btn_${newComment._id}`
                btnDelete.textContent = 'delete'
                btnDelete.setAttribute('data-user', newComment.user._id)
                btnDelete.setAttribute('data-id', newComment._id)

                const btnReply = document.createElement('button')
                btnReply.className = "comment-btn-reply"
                btnReply.id = `add_btn_${newComment._id}`
                btnReply.textContent = 'reply'
                btnReply.setAttribute('data-user', newComment.user._id)
                btnReply.setAttribute('data-id', newComment._id)
                
                divElWrapper.appendChild(divBtnWrapper)
                divBtnWrapper.appendChild(divPostTime)
                divPostTime.appendChild(spanDate)
                divPostTime.appendChild(btnDelete)
                divPostTime.appendChild(btnReply)

                const divReplies = document.createElement('div')
                divReplies.className = 'replies'
                divReplies.id = `replies_${newComment._id}`

                divElWrapper.appendChild(divReplies)

                parent.append(divElWrapper);

                document.getElementById(`del_btn_${newComment._id}`).addEventListener('click', function (e) {
                    commentDelete(e.target)
                })

                document.getElementById(`add_btn_${newComment._id}`).addEventListener('click', function (e) {
                    addReplyhandler(e.target)
                })

            });
    }

    return (
        <div className="comment-wrapper">
            <img src={userInfo.profile_image} className="rounded-circle" alt={userInfo._id} width="45" height="45"/>
            <input defaultValue={""} type="text" className="comment-box" placeholder="Add a comment" onChange={handleChangeMsg} value={msg} />
            <button className="comment-btn" onClick={commentButtonClick}>post</button>
        </div>
    );
};

export default Comment;
