import { Routes, Route } from "react-router-dom";
import Mypage from '../pages/mypage';
import Main from '../pages/main';
import Navigation from './navbar';
import Create from '../pages/create';
import Search from '../pages/search'
import View from '../pages/userpage';
import Hospital from '../pages/hospital';
import DetailHospital from '../pages/detailhospital';

function layout() {
    return (
        <div className="layout">
            <Navigation />
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="/mypage" element={<Mypage />} />
                <Route exact path="/create" element={<Create />} />
                <Route exact path="/user/:name" element={<Search />} />
                <Route exact path="/:id" element={<View />} />
                <Route exact path="/hospital" element={<Hospital />} />
                <Route exact path="/hospital/:id" element={<DetailHospital />} />
            </Routes>
        </div>
    );
}

export default layout;