import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.css';
import '../components/replyLoadLoad.js'

const  Reply = ({replyId, userId}) => {
    const [userInfo, setUserInfo] = useState({})
    const [msg , setMsg] = useState('');
    
    
    useEffect(async() => {
        await axios.get(`http://localhost:4000/user/${userId}`)
            .then((res) => {
                setUserInfo(res.data.data);
            });
    
        
    }, []);

    const handleChangeMsg = (event) => {
        setMsg(event.target.value)
      };

    const ReplyButtonClick = async() =>{
        setMsg('');
        await axios.post('http://localhost:4000/reply',{       // POST
            replyId: replyId,
            userId: userId,
            replyDate: new Date().toLocaleDateString('ko-KR'),
            contents : msg })
        .then((res) => {
            console.log(res.data.data)
            const newReply = res.data.data;
            const parent = document.getElementById(`replies_${replyId}`);
            
            /*
                inputEl 변수에 아래 주석걸린 엘리먼트 생성하고 값은 newReply에서 꺼내오면 됨.
             */
            let inputEl;
            
            //     <div className = "ReplyForm_wrapper">
            const divElWrapper = document.createElement('div')
            divElWrapper.className = 'ReplyForm_wrapper';
            divElWrapper.id = newReply._id;
            
            //<img className="rounded-circle" src={Reply.user.profile_image} alt={"profile"} width="45"/> 
            const imgEl = document.createElement('img')
            imgEl.className = 'rounded-circle';
            imgEl.src = newReply.user.profile_image;
            imgEl.alt = 'profile';
            imgEl.width = '45';

            
            //<div className="d-flex flex-column flex-wrap ml-2">
            //<span class="font-weight-bold">{Reply.user.user_name}
            //</span></div>     

            const divElUser = document.createElement('div')
            divElUser.className = 'd-flex flex-column flex-wrap ml-2'
            const spanElUser = document.createElement('span')
            spanElUser.className = 'font-weight-bold'
            
            spanElUser.appendChild(document.createTextNode(newReply.user))
            divElUser.appendChild(spanElUser)

            //     <p className="ReplyUser">{Reply.contents}</p>
            const pEl = document.createElement('p')
            pEl.appendChild(document.createTextNode(newReply.contents))
            
            //<div className="post-time">
            //         <span>{Reply.Reply_date.split('T')[0]}</span>
            //</div>
            const divElTime = document.createElement('div')
            divElTime.className= 'post-time'
            const spanEltime = document.createElement('span')
            spanEltime.appendChild(document.createTextNode(newReply.Reply_date.split('T')[0]))
            //spanEltime.textContent=newReply.Reply_date.split('T')[0]
            divElTime.appendChild(spanEltime)
            

            // <button onClick={
            //     deleteButton
            // } data-user={Reply.user._id} data-id={Reply._id}> delete </button>
            const buttonElDelete = document.createElement('button')
            //buttonElDelete.onclick = deleteButton
            buttonElDelete.setAttribute('data-user',userId)
            buttonElDelete.setAttribute('data-id', newReply._id)
            buttonElDelete.appendChild(document.createTextNode('delete'))

            

            // into wrapper
            divElWrapper.appendChild(imgEl)
            divElWrapper.appendChild(divElUser)
            divElWrapper.appendChild(pEl)
            divElWrapper.appendChild(divElTime)
            divElWrapper.appendChild(buttonElDelete)
            
            // */
            //console.log(document.body.appendChild(divElWrapper))

            //document.body.append();

            // <div className = "ReplyForm_wrapper">
            // <img className="rounded-circle" src={Reply.user.profile_image} alt={"profile"} width="45"/>
            // <div className="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">{Reply.user.user_name}</span></div>
            // <p className="ReplyUser">{Reply.contents}</p>
            // <div className="post-time">
            //     <span>{Reply.Reply_date.split('T')[0]}</span>
            // </div>
            // {/* 
            //     댓글삭제버튼 필요
            //     댓글작성자 본인이거나 포스트 작성자만 삭제가능하도록 버튼 가변 생성
            // */}
            // </div>
            parent.append(divElWrapper);

    
        }
        
        

        )

    }
    
    return(
        <div className="Reply-wrapper">
            <img src={userInfo.profile_image} class="icon" alt={userInfo._id}/>
            <input defaultValue={""} type="text" class="Reply-box" placeholder="Add a Reply" onChange={handleChangeMsg} value= {msg}/>
            <button className="Reply-btn" onClick={ReplyButtonClick}>post</button>
        </div>
    );
};

export default Reply;