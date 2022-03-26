import axios from "axios"
import { useState, useEffect } from "react"

function HospitalList() {

    const [HospitalList, setHospitalList] = useState([]);

    useEffect(() => {
        getHospital()
    }, [])

    const getHospital = async() => {
        await axios.get(`http://localhost:4000/hospital/`)
            .then((res) => {
                setHospitalList(res.data.data);
            })
    }

    const MoveReservePage = () => {
        console.log('move');
    }

    return (
        <div className="HospitalList">
            {
                HospitalList.map(info => {
                    return (
                        <div key={info._id} className={info._id} onClick={MoveReservePage} style={{ background: "grey", width: "500px" }}>
                            <img src={info.hopsital_profile} style={{ width: "100px", height: "100px" }}></img>
                            <h6>{info.hospital_name}</h6>
                            {/* <p> 전화번호 : {info.hosptial_phone}</p> */}
                            <p> 위치 : {info.hosptial_address}</p>
                            <p> 
                                진료시간 : {info.hospital_open} ~ {info.hosptial_close}&nbsp;
                                <span>
                                    (휴무일 : {info.hospital_dayoff.map(data => {
                                            let day = '';
                                            switch(data){
                                                case 1: day = "일"; break;
                                                case 2: day = "월"; break;
                                                case 3: day = "화"; break;
                                                case 4: day = "수"; break;
                                                case 5: day = "목"; break;
                                                case 6: day = "금"; break;
                                                case 7: day = "토"; break;
                                            }
                                            return(
                                                <span key={data}>{day}&nbsp;</span>
                                        )})})                                
                                </span>
                            </p>
                            <p>{info.hospital_summary}</p>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default HospitalList