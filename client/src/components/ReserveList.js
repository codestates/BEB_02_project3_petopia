// 1 | 병원 예약날짜 | 병원 이름 | 병원 예약시간 | 병원 전화번호 | (취소)
import axios from "axios"
import { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import MyReserveList from "./myReserveList";

function ReserveList() {

    const [reserveList, setReserveList] = useState([])
    const id = localStorage.getItem('account')

    const getList = async () => {
        await axios.get(`http://localhost:4000/reserve/${id}`)
            .then((res) => {
                setReserveList(res.data.data)
            })
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className="ReserveList">
            <MyReserveList reserveList={reserveList} />
        </div >
    )
}

export default ReserveList;
