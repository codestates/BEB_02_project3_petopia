import React, {useState} from 'react';
import NFTList from '../components/NFTList.js';

function Main() {
    const account = JSON.parse(localStorage.getItem('account'));
    const isAll = localStorage.getItem('isAll');

    return (
        <div className='main'>
            <button onClick={()=>{localStorage.setItem('isAll',true); window.location.reload()}}>전체</button>
            <button onClick={()=>{localStorage.setItem('isAll',false); window.location.reload()}}>팔로워</button>
            <NFTList account={account} />
        </div>
    );
}

export default Main;