import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Search() {

    const searchname = localStorage.getItem('searchName');

    const [infoList, setInfoList] = useState([])

    useEffect(() => {
        getInfoList()
    }, [])

    const getInfoList = () => {
        // setToggle(true);
        axios.get(`http://localhost:4000/user/${searchname}`)
            .then((res) => {
                console.log(res.data.data)
                setInfoList(res.data.data)
            })
    }

    const SearchHandler = (e) => {
        const user = e.target.getAttribute('data-user')
        localStorage.setItem('selectedUser', user)

        window.location.replace('http://localhost:3000/' + user)
    }

    return (
        <div className='Search'>
            {infoList.map(info => {
                return (
                    <div key={info.wallet_address}>
                        <img style={{ width: "50px", height: "50px" }} src={info.profile_image} onClick={SearchHandler} data-user={info.user_name} />
                        <span onClick={SearchHandler} data-user={info.user_name}>{info.user_name}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default Search;