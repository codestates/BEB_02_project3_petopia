import LikeButton from "./Likebutton"
import CommentLoad from "./CommentLoad"
import Comment from "./Comment"
import { useState, useEffect } from "react"
import axios from "axios"
import UserSelected from "./NFTList.js"
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

function PostDetail({ token }) {

    const userId = localStorage.getItem('userId');
    const [followList, setFollowList] = useState([]);

    useEffect(async () => {
        // 팔로워 목록 조회
        await axios.get(`${host}/follow/${userId}`)
            .then((res) => {
                setFollowList(res.data.data);
            });
    }, [])

    const followHandler = async (e) => {
        const btnText = e.target.textContent;
        const followInfo = {
            followee: userId,
            follower: e.target.getAttribute('data-user')
        };

        if (btnText === 'follow') {
            const follow = await axios.post(`${host}/follow/`, followInfo)
                .then((res) => {
                    const result = res.data.data;
                    if (result !== null) {
                        e.target.textContent = 'unfollow';
                    }
                });

        } else {
            const unfollow = await axios.post(`${host}/follow/unfollow/`, followInfo)
                .then((res) => {
                    const result = res.data.data;
                    if (result) {
                        e.target.textContent = 'follow';
                    }
                });
        }
    }

    const deletePostHandler = async(e) => {
        const id = e.target.getAttribute('data-id');
        
        await axios.post(`${host}/post/${id}`)
        .then((res) => {
          const result = res.data.data;
          if (result !== null) {
            document.location.reload();
          }
        });
      }

    return (
        <div className="PostDetail-container">
            {/* <div class="right-col"> */}
            <div className="posting-top-wrapper">
                <div className="post-image" style={{ width:"393px", height:"393px"}}>
                    <img src={token.metadata.image} class="post-image-resize"  alt={token.tokenId} width="393px" height="393px"/>
                </div>
                <div className="post-info">
                    <div className="user">
                        <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom" style={{ width:"405px"}}>
                            <div className="d-flex flex-row align-items-center feed-text px-2">
                                <img className="rounded-circle" src={token.postInfo.user.profile_image} alt={"profile"} width="45" height="45"/>
                                <span class="content-username" onClick={UserSelected} data-selectuser-id={token.postInfo.user._id} data-selectuser-wallet={token.postInfo.user.wallet_address}>
                                    {token.postInfo.user.user_name.length > 10 ?
                                    token.postInfo.user.user_name.slice(0, 4) + '···' + token.postInfo.user.user_name.slice(-4) :
                                    token.postInfo.user.user_name
                                    }
                                </span>
                            </div>
                            {
                                userId !== token.postInfo.user._id
                                ?
                                <button className = "follow-button">
                                    <div class="follow" className={`follow_${token.postInfo.user._id}`} data-user={token.postInfo.user._id} onClick={followHandler}>
                                        {followList.filter(follow => (follow.follower._id === token.postInfo.user._id)).length > 0 ? "unfollow" : "follow"}
                                    </div>
                                </button>
                                :<button className="follow-button" data-id={token.postInfo._id} onClick={deletePostHandler}>delete</button>
                            }
                        </div>
                    </div>
                    <div className="post-content">
                        <p className="posting-description">
                            {
                                token.metadata.description.split("\n").map((line) => {
                                    return (
                                        <span>{line}<br /></span>
                                    );
                                })
                            }
                        </p>
                    </div>
                        <div className="comments" id={`comments_${token.postInfo._id}`}>
                            <LikeButton postId={token.postInfo._id} userId={userId} postDate={token.postInfo.post_date.split('T')[0]}/>
                            {/* <div className="post-time">
                                <span>{token.postInfo.post_date.split('T')[0]}</span>
                            </div> */}
                        </div>
                    
                    
                </div>
            </div>
            <Comment postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} />
            <CommentLoad postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} />
        </div>
        // </div>
    )
}
export default PostDetail