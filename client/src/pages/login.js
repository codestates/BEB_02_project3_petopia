import React from 'react';
import NFTList from '../components/NFTList';

function Login({connectWallet, account, web3, contractAddress, isLogin}) {
    const clickedHandler = () => {
        connectWallet();
    };

    return (
        <div className='Login'>
            <h1>Login Page</h1>
            <div className='button'>
                <button onClick={clickedHandler}>지갑연결</button>{account ? account : "없음"}
            </div>
        </div>
    );
}

export default Login;