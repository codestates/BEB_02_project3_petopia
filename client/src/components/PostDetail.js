import LikeButton from "./Likebutton"
import CommentLoad from "./commentLoad"
import Comment from "./comment"
import { useState, useEffect } from "react"
import axios from "axios"

function PostDetail({ token }) {

    const userId = localStorage.getItem('userId');
    const [followList, setFollowList] = useState([]);

    useEffect(async () => {
        // 팔로워 목록 조회
        await axios.get(`http://localhost:4000/follow/${userId}`)
            .then((res) => {
                setFollowList(res.data.data);
            });
    }, [])

    return (
        <div className="PostDetail" style={{ display: "flex" }}>
            {/* <div class="right-col"> */}
            <div className="post-image">
                <img width="500px" src={token.metadata.image} className="post-image" alt={token.tokenId} />
            </div>
            <div className="post-info">
                <div className="user">
                    <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                        <div className="d-flex flex-row align-items-center feed-text px-2">
                            <img className="rounded-circle" src={token.postInfo.user.profile_image} alt={"profile"} width="45" />
                            <div className="d-flex flex-column flex-wrap ml-2"><span class="username">{token.postInfo.user.user_name}</span></div>
                        </div>
                        <div className="post-time">
                            <span>{token.postInfo.post_date.split('T')[0]}</span>
                        </div>
                    </div>
                </div>
                <div className="post-content">
                    <p className="description">
                        {
                            token.metadata.description.split("\n").map((line) => {
                                return (
                                    <span>{line}<br /></span>
                                );
                            })
                        }
                    </p>
                    <LikeButton postId={token.postInfo._id} userId={userId} />
                    <div className="comments" id={`comments_${token.postInfo._id}`}>
                        <CommentLoad postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} />
                    </div>
                </div>
                <Comment postId={token.postInfo._id} userId={userId} postUser={token.postInfo.user._id} />
            </div>
        </div>
        // </div>


    )
}
export default PostDetail