import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Search() {
    const userId = localStorage.getItem('userId');
    const account = JSON.parse(localStorage.getItem('account'));
    const searchname = localStorage.getItem('searchName');
    const [infoList, setInfoList] = useState([]);
    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        getInfoList();
    }, [])

    const getInfoList = async () => {
        await axios.get(`http://localhost:4000/follow/${userId}`)
        .then((res)=>{
            console.log(res);
            setFollowList(res.data.data);
        });

        await axios.get(`http://localhost:4000/user/search/${searchname}`)
            .then((res) => {
                setInfoList(res.data.data)
        });
    }

    const clickedHandler = (e) => {
        const userId = e.target.getAttribute('data-user')
        const wallet = e.target.getAttribute('data-wallet')
        localStorage.setItem('selectedUser', userId)
        localStorage.setItem('selectedUserWallet', wallet)

        if(wallet !== localStorage.getItem('account')) {
            window.location.replace(`http://localhost:3000/${userId}`);
        } else {
            window.location.replace('http://localhost:3000/mypage');
        }
        
    }

    const followHandler = async(e) => {
        const btnText = e.target.textContent;
        const followInfo = {
            followee: userId,
            follower: e.target.getAttribute('data-user')
        };

        if(btnText === 'follow') {
            const follow = await axios.post('http://localhost:4000/follow/', followInfo)
            .then((res) => {
                const result = res.data.data;
                if(result !== null){
                    e.target.textContent = 'unfollow';
                }
            });
            
        } else {
            const unfollow = await axios.post('http://localhost:4000/follow/unfollow/', followInfo)
            .then((res) => {
                const result = res.data.data;
                if(result){
                    e.target.textContent = 'follow';
                }
            });
        }
    }

    return (
        <div className='Search'>
            {infoList.filter(info=>(info.wallet_address !== account)).map(info => {
                return (
                    <div key={info.wallet_address}>
                        <img style={{ width: "50px", height: "50px" }} src={info.profile_image} onClick={clickedHandler} data-user={info._id} data-wallet={info.wallet_address}/>
                        <span onClick={clickedHandler} data-user={info._id} data-wallet={info.wallet_address}>{info.user_name}</span>
                        <button data-user={info._id} onClick={followHandler}>
                            {followList.filter(follow => (follow.follower._id === info._id)).length > 0 ? "unfollow" : "follow"}
                        </button>
                    </div>
                )
            })}
        </div>
    );
}

export default Search;