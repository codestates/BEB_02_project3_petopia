import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import Login from "./pages/login/login";
import Layout from './components/layout';
import Footer from './footer';
import useLocalStorage from './storage/useLocalStorage';

function App() {
  const [account, setAccount] = useLocalStorage("account", '');
  // const [contractAddress, setContractAddress] = useLocalStorage('contractAddress', '0x2ead9cc4a6b8da962412e85c71473870c80dab64'); // ERC721
  const [contractAddress, setContractAddress] = useLocalStorage('contractAddress', '0x2a07F32867D7152F7E473D39cD3418420129C016'); // KIP17
  const [isConnected, setConnected] = useLocalStorage("isConnected", false);
  
  return (
    <BrowserRouter>
      {isConnected ? <Layout /> : <Login />}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
