import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Search() {

    const searchname = localStorage.getItem('searchName');
    const [infoList, setInfoList] = useState([])

    useEffect(() => {
        getInfoList()
    }, [])

    const getInfoList = () => {
        axios.get(`http://localhost:4000/user/${searchname}`)
            .then((res) => {
                setInfoList(res.data.data)
            })
    }

    const SearchHandler = (e) => {
        const user = e.target.getAttribute('data-user')
        const wallet = e.target.getAttribute('data-wallet')
        localStorage.setItem('selectedUser', user)
        localStorage.setItem('selectedUserWallet', wallet)

        if(wallet !== JSON.parse(localStorage.getItem('account'))) {
            window.location.replace('http://localhost:3000/' + user);
        } else {
            window.location.replace('http://localhost:3000/mypage');
        }
        
    }

    return (
        <div className='Search'>
            {infoList.map(info => {
                return (
                    <div key={info.wallet_address}>
                        <img style={{ width: "50px", height: "50px" }} src={info.profile_image} onClick={SearchHandler} data-user={info.user_name} data-wallet={info.wallet_address}/>
                        <span onClick={SearchHandler} data-user={info.user_name} data-wallet={info.wallet_address}>{info.user_name}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default Search;