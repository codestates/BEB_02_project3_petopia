import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../components/likebutton.js'
import React, {useState} from 'react';

import './main.css';
import LikeButton from '../components/likebutton.js';
import Comment from '../components/comment.js';

function Main() {

    /* <NFTList account={null} web3={web3} contractAddress={contractAddress} isLogin={isLogin} /> */


    return (
        <div className='Main'>
            <div class="wrapper">
            <div class="left-col">
                <div class="post">
                    <div class="user">
                    <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                        <div class="d-flex flex-row align-items-center feed-text px-2"><img class="rounded-circle" src="https://i.imgur.com/aoKusnD.jpg" width="45"/>
                            <div class="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">Thomson ben</span></div>
                        </div>
                        <div class="feed-icon px-2"><i class="fa fa-ellipsis-v text-black-50"></i></div>
                        </div>
                    </div>
                    
                    <img src="https://i.imgur.com/aoKusnD.jpg" class="post-image" alt=""/>
                    
                    <div class="post-content">
                        <div class="reaction-wrapper">
                            <LikeButton/>
                            <p class="likes">1,012 likes</p>
                        
                        </div>
                        
                        
                        <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                        <p class="post-time">2 minutes ago</p>
                    </div>
                    <div class="comment-wrapper">
                        <img src="https://i.imgur.com/aoKusnD.jpg" class="icon" alt=""/>
                        <input type="text" class="comment-box" placeholder="Add a comment"/>
                        <button class="comment-btn">post</button>
                        
                    </div>
                </div>
            </div>
            </div>
        </div>

        
   

        
    );
}

export default Main;
