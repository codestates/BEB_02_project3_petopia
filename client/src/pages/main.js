import React, {useState} from 'react';
import NFTList from '../components/NFTList.js';

function Main() {
    const account = JSON.parse(localStorage.getItem('account'));
    const [isAll, setIsAll] = useState(true);

    return (
        <div className='main'>
            <div className = "postSelect-wrapper">
                <button className="postbtn-All" onClick={()=>{setIsAll(true)}}>전체</button>
                <button className="postbtn-Follow" onClick={()=>{setIsAll(false)}}>팔로워</button>
                <div className = "modal-start"><button className="create-modal-all">+</button></div> 
            </div>
                {isAll ? <NFTList account={account} isAll={isAll} /> : <NFTList account={account} isAll={isAll} />}
        </div>
    );
}

export default Main;
