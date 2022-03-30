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
            axios.post('http://localhost:4000/reserve', reserveInfo);
            setReserveInfo(reserveInfo);
            setIsReserve(true);
            window.location.reload();
        } else {
            alert("예약 실패");
        }

    }

    const sendToken = async (recipient) => {
        const kip7CA = '0x70C0327f5A6F2fb72C084055f9E5C05f5a1A4560';
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
            <h1 style={{ marginLeft: "10%", marginTop: "20px" }}>DetailHospital</h1>
            {/* 병원 정보 */}
            <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", height: "300px" }} class="p-3 mb-2 bg-light text-dark">
                <div className="Profile" style={{ height: "85%", float: "left" }}>
                    <img style={{ width: "250px", height: "250px" }} src={hospitalInfo.profile_image}></img>
                </div>
                <br />
                <div className="Info" style={{ height: "85%" }}>
                    <div>
                        <h5>{hospitalInfo.hospital_name}</h5>
                    </div>
                    <div>
                        <h5>진료시간 : {hospitalInfo.hospital_open} ~ {hospitalInfo.hospital_close}</h5>
                    </div>
                    <div>
                        <h5>전화번호 : {hospitalInfo.hospital_phone}</h5>
                    </div>
                    <div>
                        <h5>주소 : {hospitalInfo.hospital_address}</h5>
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
                                timeIntervals={30}
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
                    <Modal show={showModal} onHide={modalClose} size='lg'>
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
        </div >
    );
}

export default DetailHospital;