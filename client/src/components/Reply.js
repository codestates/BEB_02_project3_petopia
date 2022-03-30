import React, { useState, useEffect } from "react";
import axios from 'axios';

const Reply = ({userId, postUser, commentId, replyDelete}) => {
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        loadReplies();
    }, []);
    
    const loadReplies = async() =>{
        await axios.get(`http://localhost:4000/reply/${commentId}`)
        .then((res) => {
            setReplies(res.data.data);
        });
    }

    return(
        <div className="replies">
            {
                replies.map((reply) => {
                    return (
                        <div key={reply._id} className="reply-wrapper" id={reply._id}>
                            <span>└</span>
                            <img className="rounded-circle" src={reply.user.profile_image} alt="profile" width="45"/>
                            <div className="d-flex flex-column flex-wrap ml-2">
                                <span class="font-weight-bold">
                                {
                                    reply.user.user_name.length > 10 ?
                                    reply.user.user_name.slice(0, 4) + '···' + reply.user.user_name.slice(-4)
                                    : reply.user.user_name
                                }
                                </span>
                            </div>
                            <p className="replyUser">{reply.contents}</p>
                            <div className="post-time">
                                <span>${reply.reply_date.split('T')[0]}</span>
                            </div>
                            {
                                userId === reply.user._id || userId === postUser ?
                                <button id="btn_${reply._id}" data-user={reply.user._id} data-id={reply._id} onClick={(e)=>replyDelete(e.target)}> delete </button>
                                :<></>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Reply;