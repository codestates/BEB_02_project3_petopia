import React, { useState, useEffect } from "react";
import axios from 'axios';
import iconReply from '../css/image/icon-reply.png'
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

const Reply = ({userId, postUser, commentId, replyDelete}) => {
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        loadReplies();
    }, []);

    const loadReplies = async() =>{
        await axios.get(`${host}/reply/${commentId}`)
        .then((res) => {
            setReplies(res.data.data);
        });
    }

    return(
        <div className="replies" id={`replies_${commentId}`}>
            {
                replies.map((reply) => {
                    return (
                        <div key={reply._id} className="replyForm-wrapper" id={reply._id}>
                            <div className = "reply-user-wrapper">
                                <img className="icon-reply" src={iconReply} />
                                <img className="rounded-circle" src={reply.user.profile_image} alt="profile" width="45" height="45" style={{"margin-top":"3px"}}/>
                                <div className="reply-comment-wrapper">
                                    <span class="reply-user">
                                    {
                                        reply.user.user_name.length > 10 ?
                                        reply.user.user_name.slice(0, 4) + 'ยทยทยท' + reply.user.user_name.slice(-4)
                                        : reply.user.user_name
                                    }
                                    </span>
                                    <p className="reply-contents">{reply.contents}</p>
                                </div>
                            </div>
                            <div className = "reply-btn-wrapper">
                                <div className="post-time">
                                    <span>{reply.reply_date.split('T')[0]}</span>
                                    {
                                        userId === reply.user._id || userId === postUser ?
                                        <button className="reply-btn-reply" id={`btn_${reply._id}`} data-user={reply.user._id} data-id={reply._id} onClick={(e)=>replyDelete(e.target)}> delete </button>
                                        :<></>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Reply;
