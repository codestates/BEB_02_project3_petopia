import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import Mypage from './pages/mypage';
import Main from './pages/main';
import Navigation from './components/navbar';
import Login from './pages/login';
import Signup from './pages/signup';
import Writefeed from './pages/create';
import Transaction from './pages/transaction';

import CreateCP from './pages/create_copy'

const getLibrary = (provider) => {
  new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/mypage" element={<Mypage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/write" element={<Writefeed />} />
          <Route exact path="/transaction" element={<Transaction />} />

          <Route exact path="/createcp" element={<CreateCP />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;
