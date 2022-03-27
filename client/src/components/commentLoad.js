import React, { useState, useEffect } from "react";
import axios from 'axios';


const CommentLoad = () =>{
    
    const [comment, setComment] = useState(null);

    useEffect(() => {
        loadComment();
    }, [])

    const loadComment = async() =>{
        
        await axios.get('http://localhost:5000/comment/')
                .then((res) => {
                    setComment(res.data.data)
        });
        
    }

    return(
        <div class = "commentForm_wrapper">
            {
                /*
                comment.filter(comment=>(comment.post_id === 123)).map(comment=>{
                    return <p class="commentUser"><span>{comment.wallet_address} </span> {comment.contents} </p>    
                })
                */
            }
            
        </div>
    );

}
export default CommentLoad;