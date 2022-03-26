import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Search() {
    const account = JSON.parse(localStorage.getItem('account'));
    const searchname = localStorage.getItem('searchName');
    const [infoList, setInfoList] = useState([]);
    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        getInfoList();
    }, [])

    const getInfoList = async () => {
        await axios.get(`http://localhost:4000/follow/${account}`)
        .then((res)=>{
            setFollowList(res.data.data);
        });

        await axios.get(`http://localhost:4000/user/${searchname}`)
            .then((res) => {
                setInfoList(res.data.data)
        });
    }

    const SearchHandler = (e) => {
        const user = e.target.getAttribute('data-user')
        const wallet = e.target.getAttribute('data-wallet')
        localStorage.setItem('selectedUser', user)
        localStorage.setItem('selectedUserWallet', wallet)

        if(wallet !== localStorage.getItem('account')) {
            window.location.replace('http://localhost:3000/' + user);
        } else {
            window.location.replace('http://localhost:3000/mypage');
        }
        
    }

    const followHandler = async(e) => {
        const btnText = e.target.textContent;
        const followInfo = {
            followee: account,
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
                        <img style={{ width: "50px", height: "50px" }} src={info.profile_image} onClick={SearchHandler} data-user={info.user_name} data-wallet={info.wallet_address}/>
                        <span onClick={SearchHandler} data-user={info.user_name} data-wallet={info.wallet_address}>{info.user_name}</span>
                        <button data-user={info.wallet_address} onClick={followHandler}>
                            {followList.filter(follow => (follow.follower === info.wallet_address)).length > 0 ? "unfollow" : "follow"}
                        </button>
                    </div>
                )
            })}
        </div>
    );
}

export default Search;