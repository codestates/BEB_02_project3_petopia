import { Routes, Route } from "react-router-dom";
import Mypage from './pages/mypage';
import Main from './pages/main';
import Navigation from './components/navbar';
import Create from './pages/create';

function layout({account, web3, contractAddress, isLogin}) {
    return (
        <div className="layout">
            <Navigation />
            <Routes>
                <Route exact path="/main" element={<Main account={account} web3={web3} contractAddress={contractAddress} isLogin={isLogin} />} />
                <Route exact path="/mypage" element={<Mypage account={account} web3={web3} contractAddress={contractAddress} isLogin={isLogin} />} />
                <Route exact path="/create" element={<Create account={account} web3={web3} contractAddress={contractAddress} isLogin={isLogin} />} />
            </Routes>
        </div>
    );
}

export default layout;