import axios from "axios"
import { useState, useEffect } from "react"

function HospitalList() {

    const [HospitalList, setHospitalList] = useState([{
        hospital_name: '댕묘 병원',
        hosptial_address: '00시 00구 00동',
        hosptial_phone: '000-0000-0000',
        hosptial_profile: '',
        hosptial_wallet: '',
        hostpital_dayoff: [0, 2],
        hospital_open: '09:00',
        hosptial_close: '20:00',
        hosptial_summary: '댕묘 전문입니다.'
    },
    {
        hospital_id: '2',
        hospital_name: 'two',
        hosptial_address: 'location',
        hopsital_profile: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Feconomychosun.com%2Fclient%2Fnews%2Fview.php%3FboardName%3DC00%26t_num%3D13479&psig=AOvVaw0hWYmjebQiqBQJm936Kzp6&ust=1648349765704000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCNiJzsfl4vYCFQAAAAAdAAAAABAD'
    }]);

    useEffect(() => {
        getHospital()
    }, [])

    const getHospital = () => {
        axios.get(`http://localhost:4000/hospital`)
            .then((res) => {
                setHospitalList(res.data);
            })
    }

    const MoveReservePage = () => {
        console.log('move')
    }

    return (
        <div className="HospitalList">
            {
                HospitalList.map(info => {
                    return (
                        <div key={info.hospital_id} onClick={MoveReservePage} style={{ background: "grey", width: "500px" }}>
                            <img src={info.hopsital_profile} style={{ width: "100px", height: "100px" }}></img>
                            <h6>{info.hospital_name}</h6>
                            <p> 전화번호 : {info.hosptial_phone}</p>
                            <p> 위치 : {info.hosptial_address}</p>
                            <p> 진료시간 : {info.hospital_open} ~ {info.hosptial_close} (휴무일 : {info.hostpital_dayoff})</p>
                            <p>{info.hosptial_summary}</p>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default HospitalList