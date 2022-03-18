import { useEffect, useState } from "react";
import erc721Abi from "../abi/erc721Abi.js";
import axios from "axios";

function NFTList({web3, account, contractAddress, isLogin}) {
    const [NFTList, setNFTList] = useState([]);
    
    useEffect(() => {
        loadNFT(account);
    }, []);

    const loadNFT = async(_account) => {
        const tokenContract = await new web3.eth.Contract(erc721Abi, contractAddress);
        // const name = await tokenContract.methods.name().call();
        // const symbol = await tokenContract.methods.symbol().call();
        const totalSupply = await tokenContract.methods.totalSupply().call();
        
        let arr = [];
    
        for (let i = 1; i <= totalSupply; i++) {
          arr.push(i);
        }
        for (let tokenId of arr) {
            let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
            let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
            const metadata = await (await axios.get(`${tokenURI}`)).data;
            /*
              TODO : postInfo 좋아요 댓글 DB 요청해서 넣어줘야함
             */
            // 포스팅 작성자 정보
            const postInfo = {
              userName:"감자맘마",
              proFile:"",
              postDate:"2022-03-18"
            }
            const likeCnt = 0;
            const comments = [
              {
                profile:"",
                userName:"감자맘마",
                content:"안녕",
                replies:[{
                  profile:"",
                  username:"감자파파",
                  content:"안녕22",
                }]
              },
              {
                profile:"",
                userName:"감자파파",
                content:"하이",
                replies:[]
              },
            ];
    
            if(_account !== null) { // 로그인 지갑의 NFT 목록 셋팅
                if (String(tokenOwner).toLowerCase() === _account) {
                    setNFTList((prevState) => {
                      return [...prevState, { postInfo, tokenId, metadata, likeCnt, comments }];
                    });
                }
            } else {    // 전체 NFT 목록 셋팅
                setNFTList((prevState) => {
                  return [...prevState, { postInfo, tokenId, metadata, likeCnt, comments }];
                });
            }
            
        }
      };

    return(
        <div className="nftList">
            {NFTList.map(token => token).reverse().map((token)=> {
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