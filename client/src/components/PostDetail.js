function PostDetail({ token }) {

    console.log(token)
    return (
        <div className="PostDetail">
            {/* <div>{token.postInfo.userName}</div> */}
            <img width="500px" height="500px" src={token.metadata.image} />


        </div>
    )
}
export default PostDetail