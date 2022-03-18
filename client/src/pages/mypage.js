import React from 'react';
import NFTList from '../components/NFTList';

function Mypage({account, web3, contractAddress, isLogin}) {
    return (
        <div className='Mypage'>
            <h1>Mypage</h1>
            <div className='posts'>
                <NFTList account={account} web3={web3} contractAddress={contractAddress} isLogin={isLogin} />
            </div>
        </div>
    );
}

export default Mypage;