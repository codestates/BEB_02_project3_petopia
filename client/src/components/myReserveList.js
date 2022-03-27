
import axios from "axios"
import { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';


function myReserveList({ reserveList }) {

    const reserveCancle = (e) => {

        const reverve_id = e.target.getAttribute('data-id')
        const element = document.getElementById(`tr_${reverve_id}`)
        element.remove();

        axios.post(`http://localhost:4000/reserve/${reverve_id}`)
            .then((res) => (res.data.data))
    }

    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>예약날짜</th>
                    <th>병원이름</th>
                    <th>예약시간</th>
                    <th>병원 전화번호</th>
                    <th>x</th>
                </tr>
            </thead>
            <tbody>
                {
                    reserveList.map((info) => {
                        return (
                            <tr key={info._id} id={`tr_${info._id}`}>
                                <td>{info.reserve_date}</td>
                                <td>{info.hospital.hospital_name}</td>
                                <td>{info.reserve_time}</td>
                                <td>{info.reserve_phone}</td>
                                <td><button onClick={reserveCancle} data-id={info._id}>예약 취소</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default myReserveList;
