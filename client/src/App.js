import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import Mypage from './pages/mypage';
import Main from './pages/main';
import Navigation from './components/navbar';

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
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;
