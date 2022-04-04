// 1 | 병원 예약날짜 | 병원 이름 | 병원 예약시간 | 병원 전화번호 | (취소)
import axios from "axios"
import { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import Nodata from "./Nodata";
import '../pages/main.css';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;

function ReserveList() {

    const [reserveList, setReserveList] = useState([])
    const id = localStorage.getItem('userId')

    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {
        await axios.get(`${host}/reserve/${id}`)
            .then((res) => {
                console.log(res.data.data)
                setReserveList(res.data.data)
            })
    }

    const reserveCancle = (e) => {

        const reverve_id = e.target.getAttribute('data-id')
        const element = document.getElementById(`tr_${reverve_id}`)

        let confirmAction = window.confirm("예약을 취소하시겠습니까? (토큰 환불 X)");
        if (confirmAction) {
            alert("예약이 취소 되었습니다.")
            element.remove();
            axios.post(`${host}/reserve/${reverve_id}`)
                .then((res) => (res.data.data))
        } else {
            alert("예약을 취소하지 않았습니다.")
        }
    }

    return (
        <div className="ReserveList">
            <Table bordered>
                <thead>
                    <tr>
                        <th>예약날짜</th>
                        <th>예약시간</th>
                        <th>병원이름</th>
                        <th>병원 전화번호</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {   reserveList.length > 0
                        ?
                        reserveList.map((info) => {
                            let now = new Date().getTime()
                            let future = new Date(info.reserve_date + " " + info.reserve_time).getTime()
                            return (
                                <tr key={info._id} id={`tr_${info._id}`}>
                                    <td>{info.reserve_date}</td>
                                    <td>{info.reserve_time}</td>
                                    <td>{info.hospital.hospital_name}</td>
                                    <td>{info.hospital.hospital_phone}</td>
                                    <td>
                                        {
                                            now < future ? <button className="btn-cancle" onClick={reserveCancle} data-id={info._id}>예약 취소</button> : ''
                                        }
                                    </td>
                                </tr>
                            )
                        })
                        : <td colSpan={5}><Nodata /></td>
                    }
                </tbody>
            </Table>
        </div >
    )
}

export default ReserveList;
