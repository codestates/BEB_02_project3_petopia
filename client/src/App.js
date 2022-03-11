import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Mypage from './pages/mypage';
import Main from './pages/main';
import Navigation from './components/navbar';
import Carousel from './pages/Main_Carousel';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/mypage" element={<Mypage />} />
        <Route exact path="/MainSlide" element={<Carousel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
