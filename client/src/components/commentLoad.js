import React, { useState, useEffect } from "react";
import axios from 'axios';

const CommentLoad = ({postId}) =>{
    
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

    return(
        <div className="comments">
            {comments.map((comment) => {
                return (
                    <div className = "commentForm_wrapper">
                        <img className="rounded-circle" src={comment.user.profile_image} alt={"profile"} width="45"/>
                        <div className="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">{comment.user.user_name}</span></div>
                        <p className="commentUser">{comment.contents}</p>
                        <div className="post-time">
                            <span>{comment.comment_date.split('T')[0]}</span>
                        </div>
                        {/* 
                            댓글삭제버튼 필요
                            댓글작성자 본인이거나 포스트 작성자만 삭제가능하도록 버튼 가변 생성
                        */}
                    </div>
                )
            })}
        </div>
    );

}
export default CommentLoad;