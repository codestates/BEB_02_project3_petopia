import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; // 한국어 적용 
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import addMonths from 'date-fns/addMonths'
import getDay from 'date-fns/getDay'
import moment from 'moment';

function DetailHospital() {

    const hospital_id = localStorage.getItem('hospital_id')
    const [infoList, setInfoList] = useState(JSON.parse(localStorage.getItem('hospitalInfo')))
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState()
    const [timeList, setTimeList] = useState([])

    const isWeekday = (date) => {

        const len = infoList.hospital_dayoff.length
        const day = getDay(date);

        switch (len) {
            case 0: return 7
            case 1: return day !== infoList.hospital_dayoff[0]
            case 2: return day !== infoList.hospital_dayoff[0] && day !== infoList.hospital_dayoff[1]
        }

    };

    const SubmitInfo = (event) => {
        const hospitalWallet = infoList.hospital_wallet;
        const reserveDate = moment(startDate).format().slice(0, 10)
        const reserveTime = startTime.toLocaleTimeString('ko', { hour12: false, hour: '2-digit', minute: '2-digit' })
        const userId = JSON.parse(localStorage.getItem('account'));
        const hospitalId = (localStorage.getItem('hospital_id'))
        const reserveName = event.target.reservename.value
        const petName = event.target.petname.value
        const reservePhone = event.target.reservephone.value

        axios.post('http://localhost:4000/reserve', {
            reserveDate: reserveDate,
            reserveTime: reserveTime,
            userId: userId,
            hospitalId: hospitalId,
            reserveName: reserveName,
            petName: petName,
            reservePhone: reservePhone
        })
    }

    const dateChangeHandler = async (date) => {

        setTimeList([]);
        setStartDate(date);

        await axios.post('http://localhost:4000/reserve/getReserveList', { reserveDate: moment(date).format().slice(0, 10), hospitalId: hospital_id })
            .then((res) => {
                const reserves = res.data.data;
                reserves.map((reserve) => {
                    const reserveHour = Number(reserve.reserve_time.split(':')[0]);
                    const reserveMinute = Number(reserve.reserve_time.split(':')[1]);
                    setTimeList((prevState) => {
                        return [...prevState, setHours(setMinutes(new Date(), reserveMinute), reserveHour)];
                    });
                })
            });
    }

    const initSetMinTime = () => {
        const openHour = infoList.hospital_open.split(":")[0];
        const openMin = infoList.hospital_open.split(":")[1];
        return setHours(setMinutes(new Date(), openMin), openHour);
    }

    const initSetMaxTime = () => {
        const closeHour = infoList.hospital_close.split(":")[0];
        const closeMin = infoList.hospital_close.split(":")[1];
        return setHours(setMinutes(new Date(), closeMin), closeHour);  
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
                        <h5>진료시간 : {infoList.hospital_open} ~ {infoList.hospital_close}</h5>
                    </div>
                    <div>
                        <h5>전화번호 : {infoList.hospital_phone}</h5>
                    </div>
                    <div>
                        <h5>주소 : {infoList.hospital_address}</h5>
                    </div>
                </div>
                <hr></hr>
                {/* 예약하기 */}
                <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                    <h1>Reserve</h1>

                    <div className="Reservation" style={{ display: "flex" }} >

                        <DatePicker
                            inline
                            selected={''}
                            onChange={dateChangeHandler}
                            locale={ko}
                            minDate={new Date()}
                            maxDate={addMonths(new Date(), 5)}
                            filterDate={isWeekday}
                            showDisabledMonthNavigation
                        />

                        <form onSubmit={SubmitInfo}>
                            <DatePicker
                                placeholderText="시간 선택"
                                selected={startTime}
                                onChange={(time) => setStartTime(time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                minTime={initSetMinTime()}
                                maxTime={initSetMaxTime()}
                                excludeTimes={timeList}
                                timeCaption="Time"
                                dateFormat="h:mm aa"

                            />
                            예약자명 : <input type="textbox" name="reservename" style={{ width: "400px" }}  ></input> <br />
                            반려동물명 : <input type="textbox" name="petname" style={{ width: "400px" }} ></input> <br />
                            휴대폰번호 : <input type="textbox" name="reservephone" style={{ width: "400px" }} ></input> <br />

                            <input type="submit" value={'예약하기'}></input>
                        </form>

                    </div >

                </div>

            </div>
        </div >
    );
}

export default DetailHospital;