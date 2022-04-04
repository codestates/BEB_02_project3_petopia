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
import { Button, Modal } from 'react-bootstrap';
import useLocalStorage from '../storage/useLocalStorage';
import Web3 from "web3";
import Caver from "caver-js";
import './detailhospital.css';
import './hospital.css';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REACT_APP_DB_HOST;
const kip7CA = process.env.REACT_APP_KIP7_CA;

function DetailHospital() {

    const hospital_id = localStorage.getItem('hospital_id')
    const [hospitalInfo, setHospitalInfo] = useState(JSON.parse(localStorage.getItem('hospitalInfo')))
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState()
    const [timeList, setTimeList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isReserve, setIsReserve] = useLocalStorage("isReserve", false);
    const [reserveInfo, setReserveInfo] = useLocalStorage("reserveInfo", {});
    const web3 = new Web3(window.ethereum);
    const caver = new Caver(window.klaytn);

    useEffect(() => {
        if (isReserve) modalOpen();
    }, [])

    const isWeekday = (date) => {

        const len = hospitalInfo.hospital_dayoff.length
        const day = getDay(date);

        switch (len) {
            case 0: return 7
            case 1: return day !== hospitalInfo.hospital_dayoff[0]
            case 2: return day !== hospitalInfo.hospital_dayoff[0] && day !== hospitalInfo.hospital_dayoff[1]
        }

    };

    const SubmitInfo = async (event) => {
        event.preventDefault();

        const hospitalWallet = hospitalInfo.hospital_wallet_klaytn;
        const reserveDate = moment(startDate).format().slice(0, 10)
        const reserveTime = startTime.toLocaleTimeString('ko', { hour12: false, hour: '2-digit', minute: '2-digit' })
        const userId = localStorage.getItem('userId');
        const hospitalId = (localStorage.getItem('hospital_id'))
        const reserveName = event.target.reservename.value
        const petName = event.target.petname.value
        const reservePhone = event.target.reservephone.value

        const reserveInfo = {
            reserveDate: reserveDate,
            reserveTime: reserveTime,
            userId: userId,
            hospitalId: hospitalId,
            reserveName: reserveName,
            petName: petName,
            reservePhone: reservePhone,
        }

        const txResult = await sendToken(hospitalWallet);

        if(txResult) {
            axios.post(`${host}/reserve`, reserveInfo);
            setReserveInfo(reserveInfo);
            setIsReserve(true);
            window.location.reload();
        } else {
            alert("예약 실패");
        }

    }

    const sendToken = async (recipient) => {
        const sender = JSON.parse(localStorage.getItem('account'));
        const amount = 1;
        const decimal = 18;
        let txResult = false;

        const data = caver.klay.abi.encodeFunctionCall(
            {
              name: 'transfer',
              type: 'function',
              inputs: [
                {
                  type: 'address',
                  name: 'recipient'
                },
                {
                  type: 'uint256',
                  name: 'amount'
                }
              ]
            },
            [
              recipient,
              caver.utils
                .toBN(amount)
                .mul(caver.utils.toBN(Number(`1e${decimal}`)))
                .toString()
            ]
          )

          const txHash = await caver.klay
            .sendTransaction({
              type: 'SMART_CONTRACT_EXECUTION',
              from: sender,
              to: kip7CA,
              data: data,
              gas: '100000'
            })
            .on('transactionHash', transactionHash => {
              console.log('txHash', transactionHash)
            })
            .on('receipt', receipt => {
              console.log('receipt', receipt)
              txResult = true;
            })
            .on('error', error => {
              console.log('error', error)
            })

        return txResult;
    }

    const dateChangeHandler = async (date) => {

        setTimeList([]);
        setStartDate(date);
        setStartTime();

        await axios.post(`${host}/reserve/getReserveList`, { reserveDate: moment(date).format().slice(0, 10), hospitalId: hospital_id })
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
        const openHour = hospitalInfo.hospital_open.split(":")[0];
        const openMin = hospitalInfo.hospital_open.split(":")[1];
        return setHours(setMinutes(new Date(), openMin), openHour);
    }

    const initSetMaxTime = () => {
        let closeHour;
        let closeMin;

        if (hospitalInfo.is24) {
            return setHours(setMinutes(new Date(), 30), 23);
        } else {
            closeHour = hospitalInfo.hospital_close.split(":")[0];
            closeMin = hospitalInfo.hospital_close.split(":")[1];
        }
        return setHours(setMinutes(new Date(), closeMin), closeHour);
    }

    const modalOpen = () => {
        setShowModal(true)
    }

    const modalClose = () => {
        setReserveInfo({});
        setIsReserve(false);
        setShowModal(false);
    }

    return (
        <div className='DetailHospital'>
            <h1 className="header">Reserve</h1>
            {/* 병원 정보 */}
            <div class="">
                <div className="hospital-Container">
                    <img className = "hospital-img" src={hospitalInfo.hospital_profile}></img>
                        <div className = "hospital-contants-Container">
                            <h5 className = "hospital-title">{hospitalInfo.hospital_name}</h5>
                                <div className = "hospital-contants-contants">
                                    <h className = "hospital-text">진료시간 : {hospitalInfo.hospital_open} ~ {hospitalInfo.hospital_close}</h>
                                    <h className = "hospital-text">전화번호 : {hospitalInfo.hospital_phone}</h>
                                    <h className = "hospital-text">주소 : {hospitalInfo.hospital_address}</h>
                                </div>
                        </div>
                </div>
            </div>
                {/* 예약하기 */}
                    <div className="reserve-container">
                        <div className="Reservation" >
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
                            <form className="reserve-container-contants" onSubmit={SubmitInfo}>
                                        <DatePicker
                                            className="datepicker"
                                            placeholderText="시간 선택"
                                            selected={startTime}
                                            onChange={(time) => setStartTime(time)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            minTime={initSetMinTime()}
                                            maxTime={initSetMaxTime()}
                                            excludeTimes={timeList}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                        />

                                   <div className="reserve-text">
                                    예약자명 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input type="textbox" name="reservename" style={{ width: "430px" }}  ></input> <br />
                                    </div>
                                    <div className="reserve-text">
                                    반려동물명 &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="textbox" name="petname" style={{ width: "430px" }} ></input> <br />
                                    </div>
                                    <div className="reserve-text">
                                    휴대폰번호 &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="textbox" name="reservephone" style={{ width: "430px" }} ></input> <br />
                                    </div>
                                 <Button class="btn btn-primary" type="submit" value={'예약하기'}>예약하기</Button>
                            </form>
                        </div >
                            <Modal show={showModal} onHide={modalClose} size='sm'>
                                <Modal.Header closeButton>
                                    <Modal.Title>예약 완료</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    병원 : {hospitalInfo.hospital_name} <br />
                                    예약일시 : {reserveInfo.reserveDate} {reserveInfo.reserveTime}<br />
                                    예약자명 : {reserveInfo.reserveName} <br />
                                    반려동물명 : {reserveInfo.petName} <br />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={modalClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                </div>

            </div>
    );
}

export default DetailHospital;