import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.css';
import '../components/commentLoad.js'


const Comment = ({postId, userId}) => {
    const [userInfo, setUserInfo] = useState({})
    const [msg , setMsg] = useState('');
    
    
    useEffect(async() => {
        await axios.get(`http://localhost:4000/user/${userId}`)
            .then((res) => {
                setUserInfo(res.data.data);
            });
    
        
    }, []);

    const commentDelete = async(target) => {

        const commentUser = target.getAttribute('data-user')
        const commentId = target.getAttribute('data-id')
        const element = document.getElementById(commentId)
        console.log(commentUser);
        console.log(commentId);
        console.log(element);

        if((commentUser === userId) )
        // ||    (userId === postId))
            {
                
                await axios.post(`http://localhost:4000/comment/${commentId}`)
                element.remove()  
                                                 
        }
    }

    

    const handleChangeMsg = (event) => {
        setMsg(event.target.value)
      };
    

    
    const commentButtonClick = async() =>{
        await axios.post('http://localhost:4000/comment',{       // POST
            postId: postId,
            userId: userId,
            commentDate: new Date().toLocaleDateString('ko-KR'),
            contents : msg })
        .then((res) => {
            
            setMsg('');
            
            const newComment = res.data.data;
            const parent = document.getElementById(`comments_${postId}`);
            
            console.log(newComment)
            
            const divElWrapper = document.createElement('div')
            divElWrapper.className = 'commentForm_wrapper'
            divElWrapper.id = newComment._id
            divElWrapper.innerHTML = `
            <img className="rounded-circle" src=${''} alt=${"profile"} width="45"/> 
            <div className="d-flex flex-column flex-wrap ml-2">
            <span class="font-weight-bold">${newComment.user}
            </span></div>
            <p className="commentUser">${newComment.contents}</p>
            <div className="post-time">
                <span>${newComment.comment_date.split('T')[0]}</span>
            </div>
            <button id = "btn_${newComment._id}" data-user="${newComment.user._id}" data-id="${newComment._id}"> delete </button>
            `
            console.log(divElWrapper);

            parent.append(divElWrapper);
            
            document.getElementById(`btn_${newComment._id}`).addEventListener('click', function(e){
                commentDelete(e.target)
                
            })

            //document.getElementById(newComment._id).remove();

            
    
        }
        
        

        )

    }
    
    return(
        <div className="comment-wrapper">
            <img src={userInfo.profile_image} class="icon" alt={userInfo._id}/>
            <input defaultValue={""} type="text" class="comment-box" placeholder="Add a comment" onChange={handleChangeMsg} value= {msg}/>
            <button className="comment-btn" onClick={commentButtonClick}>post</button>
        </div>
    );
};

export default Comment;

/*
                inputEl 변수에 아래 주석걸린 엘리먼트 생성하고 값은 newComment에서 꺼내오면 됨.
            
                let inputEl;
 */
/*
divElWrapper.className = 'commentForm_wrapper';
            divElWrapper.id = newComment._id;
            
            //<img className="rounded-circle" src={comment.user.profile_image} alt={"profile"} width="45"/> 
            const imgEl = document.createElement('img')
            imgEl.className = 'rounded-circle';
            imgEl.src = newComment.user.profile_image;
            imgEl.alt = 'profile';
            imgEl.width = '45';

            
            // <div className="d-flex flex-column flex-wrap ml-2">
            // <span class="font-weight-bold">{comment.user.user_name}
            // </span></div>     

            const divElUser = document.createElement('div')
            divElUser.className = 'd-flex flex-column flex-wrap ml-2'
            const spanElUser = document.createElement('span')
            spanElUser.className = 'font-weight-bold'
            
            spanElUser.appendChild(document.createTextNode(newComment.user))
            divElUser.appendChild(spanElUser)

            //     <p className="commentUser">{comment.contents}</p>
            const pEl = document.createElement('p')
            pEl.appendChild(document.createTextNode(newComment.contents))
            
            // <div className="post-time">
            //         <span>{comment.comment_date.split('T')[0]}</span>
            // </div>
            const divElTime = document.createElement('div')
            divElTime.className= 'post-time'
            const spanEltime = document.createElement('span')
            spanEltime.appendChild(document.createTextNode(newComment.comment_date.split('T')[0]))
            //spanEltime.textContent=newComment.comment_date.split('T')[0]
            divElTime.appendChild(spanEltime)
            

            // <button onClick={
            //     deleteButton
            // } data-user={comment.user._id} data-id={comment._id}> delete </button>
            // const buttonElDelete = document.createElement('button')
            // buttonElDelete.className = 'deleteButton'
            // buttonElDelete.onclick = deleteButton
            // buttonElDelete.setAttribute('data-user',userId)
            // buttonElDelete.setAttribute('data-id', newComment._id)
            // buttonElDelete.appendChild(document.createTextNode('delete'))

            console.log(buttonElDelete);

            // into wrapper
            divElWrapper.appendChild(imgEl)
            divElWrapper.appendChild(divElUser)
            divElWrapper.appendChild(pEl)
            divElWrapper.appendChild(divElTime)
            //divElWrapper.appendChild(buttonElDelete)
            divEl.innerHTML = `<button id="btn_${newComment.id}"className="Reply-btn" data-id="${newComment.id}"">post</button>`
*/