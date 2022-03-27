// 1 | 병원 예약날짜 | 병원 이름 | 병원 예약시간 | 병원 전화번호 | (취소)
import axios from "axios"
import { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';

function ReserveList() {

    const [reserveList, setReserveList] = useState([{
        'reserveDate': '2022-03-27',
        'reserveName': '병원이름',
        'reserveTime': '10:30',
        'reservePhone': '01-2345-6789'
    },
    {
        'reserveDate': '2022-04-23',
        'reserveName': '동물병원',
        'reserveTime': '13:30',
        'reservePhone': '01-3232-1111'
    }]);
    const id = localStorage.getItem('account')

    // const getList = () => {
    //     axios.get(`http://localhost:4000/reserve/${id}`)
    // .then((res) => {
    //     setReserveList(res.data)
    // })
    // }

    // useEffect = (() => {
    //     getList()
    // }, [])

    const reserveCancle = () => {

        // axios.post(`http://localhost:4000/reserve/`)

        // setReserveList(res.data)

    }

    return (
        <div className="ReserveList">

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
                                <tr>
                                    <td>{info.reserveDate}</td>
                                    <td>{info.reserveName}</td>
                                    <td>{info.reserveTime}</td>
                                    <td>{info.reservePhone}</td>
                                    <td><button onClick={reserveCancle}>예약 취소</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>


        </div >
    )
}

export default ReserveList;
