import React, {useState} from 'react';
import NFTList from '../components/NFTList.js';

function Main() {
    const account = JSON.parse(localStorage.getItem('account'));
    const [isAll, setIsAll] = useState(true);

    return (
        <div className='main'>
            <button onClick={()=>{setIsAll(true)}}>전체</button>
            <button onClick={()=>{setIsAll(false)}}>팔로워</button>
            {isAll ? <NFTList account={account} isAll={isAll} /> : <NFTList account={account} isAll={isAll} />}
        </div>
    );
}

export default Main;