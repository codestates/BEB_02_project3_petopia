import React, { useState } from "react";
import axios from 'axios';
import '../pages/main.css';

const Comment = () => {

    return(
        <div className="Comment">
            <img src="https://i.imgur.com/aoKusnD.jpg" class="icon" alt=""/>
            <input type="text" class="comment-box" placeholder="Add a comment"/>
            <button class="comment-btn">post</button>
        </div>
   
   
    );

    

};

export default Comment;