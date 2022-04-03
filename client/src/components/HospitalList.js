import axios from "axios"
import { useState, useEffect } from "react"
import Nodata from "./Nodata";
import Loading from "./Loading.js";

function HospitalList() {

    const [hospitalList, setHospitalList] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        getHospital()
    }, [])

    const getHospital = async () => {
        setIsLoading(true);
        await axios.get(`http://localhost:4000/hospital/`)
            .then((res) => {
                setHospitalList(res.data.data);
            })
        setIsLoading(false);
    }

    if (isLoading) {
        return (<Loading />)
    }

    const moveReservePage = async (e) => {
        const id = e.target.getAttribute('data-id')
        localStorage.setItem('hospital_id', id)

        await axios.get(`http://localhost:4000/hospital/${id}`)
            .then((res) => {
                localStorage.setItem('hospitalInfo', JSON.stringify(res.data.data));
            })

        window.location.href = `http://localhost:3000/hospital/${id}`
    }

    return (
        <div className="hospitalList">
            {
                hospitalList.length > 0
                    ?
                    hospitalList.map(info => {
                        return (
                                <div key={info._id} className="hospital-Container">
                                {/* <div key={info._id} className={info._id} > */}
                                    <img className = "hospital-img" src={info.hospital_profile} onClick={moveReservePage} data-id={info._id} ></img>
                                    <div className = "hospital-contants-Container">
                                        <h6 className = "hospital-title">{info.hospital_name}</h6>
                                        {/* <p> 전화번호 : {info.hospital_phone}</p> */}
                                        <div className = "hospital-contants-contants">
                                            <h className = "hospital-text"> 주소 : {info.hospital_address}</h>
                                            <h className = "hospital-text">
                                                진료시간 : {info.hospital_open} ~ {info.hospital_close}&nbsp;
                                                <span className = "hospital-text">
                                                    (휴무일 : 
                                                    {
                                                        info.hospital_dayoff.length > 0 ?
                                                        info.hospital_dayoff.map(data => {
                                                            let day = '';
                                                            switch (data) {
                                                                case 0: day = "일"; break;
                                                                case 1: day = "월"; break;
                                                                case 2: day = "화"; break;
                                                                case 3: day = "수"; break;
                                                                case 4: day = "목"; break;
                                                                case 5: day = "금"; break;
                                                                case 6: day = "토"; break;
                                                            }
                                                            return (
                                                                <span key={data}>{day}&nbsp;</span>
                                                            )
                                                        })
                                                        : "없음"
                                                    }
                                                    )
                                                </span>
                                            </h>
                                            <h className = "hospital-text">{info.hospital_summary}</h>
                                        </div>
                                    </div>
                                </div>
                        )
                    })
                    : <Nodata />
            }
        </div>

    )
}

export default HospitalList
