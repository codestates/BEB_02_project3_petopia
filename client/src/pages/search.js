import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nodata from '../components/Nodata';
import './search.css'
import './mypage.css'
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;
const domain = process.env.REACT_APP_DOMAIN;

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
        await axios.get(`${host}/follow/${userId}`)
            .then((res) => {
                setFollowList(res.data.data);
            });

        await axios.get(`${host}/user/search/${searchname}`)
            .then((res) => {
                setInfoList(res.data.data)
            });
    }

    const clickedHandler = (e) => {
        const userId = e.target.getAttribute('data-user')
        const wallet = e.target.getAttribute('data-wallet')
        localStorage.setItem('selectedUser', userId)
        localStorage.setItem('selectedUserWallet', wallet)

        if (wallet !== localStorage.getItem('account')) {
            window.location.replace(`${domain}/${userId}`);
        } else {
            window.location.replace(`${domain}/mypage`);
        }

    }

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

    return (
        <div className='Search'>
            {
                infoList.filter(info => (info.wallet_address !== account)).length > 0 ?
                    infoList.filter(info => (info.wallet_address !== account)).map(info => {
                        return (

                            <div className="search-component" key={info.wallet_address}>
                                <img className="search-image" src={info.profile_image} onClick={clickedHandler} data-user={info._id} data-wallet={info.wallet_address} />
                                <div className="search-text-wrapper">
                                    <span className="search-username"onClick={clickedHandler} data-user={info._id} data-wallet={info.wallet_address}>
                                        {info.user_name.length > 10 ?
                                            info.user_name.slice(0, 4) + '···' + info.user_name.slice(-4) :
                                            info.user_name
                                    }
                                    </span>
                                    <span className="search-greeting" onClick={clickedHandler} data-user={info._id} data-wallet={info.wallet_address}>
                                        {info.greetings}
                                        </span>
                                </div>

                                <button className="search-follow-btn" data-user={info._id} onClick={followHandler}>
                                    {followList.filter(follow => (follow.follower._id === info._id)).length > 0 ? "unfollow" : "follow"}
                                </button>
                            </div>
                        )
                    })
                    : <Nodata />
            }
        </div>
    );
}

export default Search;
