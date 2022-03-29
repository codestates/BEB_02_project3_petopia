import React, { useState, useEffect, useLocation } from "react";
import axios from 'axios';
import '../pages/main.css';

const Reply = ({replyId, userId}) => {
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
            const newReply = res.data.data;
            const parent = document.getElementById(`replies_${replyId}`);
            const divElWrapper = document.createElement('div')
            divElWrapper.className = 'ReplyForm_wrapper';
            divElWrapper.id = newReply._id;
            divElWrapper.innerHTML = `
                <img className="rounded-circle" src="${''}" alt="${''}" width="45"/> 
                <div className="d-flex flex-column flex-wrap ml-2">
                    <span class="font-weight-bold">${''}</span>
                </div>
                <p className="ReplyUser">${newReply.contents}</p>
                <div className="post-time">
                    <span>${newReply.Reply_date.split('T')[0]}</span>
                </div>
                <button data-user="${''}" data-id="${newReply._id}"> delete </button>`
           
            parent.append(divElWrapper);

        });

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