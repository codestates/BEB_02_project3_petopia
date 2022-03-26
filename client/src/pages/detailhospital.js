import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; // 한국어 적용 
import { Modal } from 'react-bootstrap';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import addMonths from 'date-fns/addMonths'
import getDay from 'date-fns/getDay'


function DetailHospital() {

    const hospital_id = localStorage.getItem('hospital_id')
    const [infoList, setInfoList] = useState({ 'hospital_dayoff': [] })
    const [startDate, setStartDate] = useState(
        new Date()
    );
    const [startTime, setStartTime] = useState(
        new Date()
    )
    const [showModal, setShowModal] = useState(false)

    useEffect(async () => {
        await axios.get(`http://localhost:4000/hospital/${hospital_id}`)
            .then((res) => {
                setInfoList(res.data.data)
            })
    }, [])

    const isWeekday = (date) => {

        const len = infoList.hospital_dayoff.length
        const day = getDay(date);

        switch (len) {
            case 0: return
            case 1: return day !== infoList.hospital_dayoff[0]
            case 2: return day !== infoList.hospital_dayoff[0] && day !== infoList.hospital_dayoff[1]
        }

    };

    const reserveHandler = () => {
        const reserveDate = startDate.toDateString()
        const reserveTime = startTime.toLocaleTimeString()
        const userId = JSON.parse(localStorage.getItem('account'))
        const hospitalId = JSON.parse(localStorage.getItem('hospital_id'))

        axios.post('http://localhost:4000/reserve', {
            reserveDate: reserveDate,
            reserveTime: reserveTime,
            userId: userId,
            hospitalId: hospitalId
        })

    }

    const modalOpen = () => {
        setShowModal(true)
    }

    const modalClose = () => {
        setShowModal(false)
    }

    return (
        <div className='DetailHospital'>
            <h1 style={{ marginLeft: "10%", marginTop: "20px" }}>DetailHospital</h1>
            {/* 병원 정보 */}
            <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", height: "300px" }} class="p-3 mb-2 bg-light text-dark">
                <div className="Profile" style={{ height: "85%", float: "left" }}>
                    <img style={{ width: "250px", height: "250px" }} src={infoList.profile_image}></img>
                </div>
                <br />
                <div className="Info" style={{ height: "85%" }}>
                    <div>
                        <h5>{infoList.hospital_name}</h5>
                    </div>
                    <div>
                        <h5>진료시간 : {infoList.hospital_open} ~ {infoList.hosptial_close}</h5>
                    </div>
                    <div>
                        <h5>전화번호 : {infoList.hosptial_phone}</h5>
                    </div>
                    <div>
                        <h5>주소 : {infoList.hosptial_address}</h5>
                    </div>
                </div>
                <hr></hr>
                {/* 예약하기 */}
                <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                    <h1>Reserve</h1>

                    <div className="Reservation">

                        <DatePicker
                            inline
                            selected={startDate}
                            onChange={(date) => (setStartDate(date))}
                            onChage={modalOpen}
                            locale={ko}
                            minDate={new Date()}
                            maxDate={addMonths(new Date(), 5)}
                            filterDate={isWeekday}
                            showDisabledMonthNavigation
                        />

                        <DatePicker
                            selected={startTime}
                            onChange={(time) => setStartTime(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            minTime={setHours(setMinutes(new Date(), 0), 10)}
                            maxTime={setHours(setMinutes(new Date(), 0), 20)}
                            // includeTimes={[
                            //     setHours(setMinutes(new Date(), 0), 17),
                            // ]}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                        <button onClick={reserveHandler}>예약하기</button>

                        <Modal show={showModal} onHide={modalClose} size='lg'>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Profile</Modal.Title>
                            </Modal.Header>
                        </Modal>
                    </div >

                </div>

            </div>
        </div>
    );
}

export default DetailHospital;