import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import Login from "./pages/login/login";
import Layout from './components/Layout';
import Footer from './footer';
import useLocalStorage from './storage/useLocalStorage';
import dotenv from 'dotenv';
dotenv.config();

function App() {
  const [account, setAccount] = useLocalStorage("account", '');
  // const [contractAddress, setContractAddress] = useLocalStorage('contractAddress', process.env.REACT_APP_ERC721_CA); // ERC721
  const [contractAddress, setContractAddress] = useLocalStorage('contractAddress', process.env.REACT_APP_KIP17_CA); // KIP17
  const [isConnected, setConnected] = useLocalStorage("isConnected", false);
  
  return (
    <BrowserRouter>
      {isConnected ? <Layout /> : <Login />}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
