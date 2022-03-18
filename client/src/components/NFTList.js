function NFTList({nftList}) {
    return(
        <div className="nftList">
            {nftList.map(token => token).reverse().map((token)=> {
              return (
                <div key={token.tokenId} className="post">
                    <div className="postInfo">
                        <img src={token.postInfo.profile} alt={token.postInfo.profile} style={{width:"50px", height:"50px"}}/>
                        <span>{token.postInfo.userName}</span>
                        <span>{token.postInfo.postDate}</span>
                    </div>
                    <img src={token.metadata.image} alt={token.tokenId}/>
                    <div className="like">
                        <span>Like {token.likeCnt}</span>
                    </div>
                    <div className="description">
                        <span>{token.metadata.description}</span>
                    </div>
                    <div className="comments">
                        {token.comments.map(comment => comment).reverse().map((comment) => {
                            return (
                                <div className="comment">
                                    <img src={comment.profile} alt={comment.profile} style={{width:"50px", height:"50px"}}/>
                                    <span>{comment.userName}</span>
                                    <span>{comment.content}</span>
                                    <div className="replies">
                                        {comment.replies.map((reply) => {
                                            return (
                                                <div className="reply">
                                                    &emsp;
                                                    <img src={reply.profile} alt={reply.profile} style={{width:"50px", height:"50px"}}/>
                                                    <span>{reply.userName}</span>
                                                    <span>{reply.content}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
              );
            })}
        </div>
    );
}

export default NFTList