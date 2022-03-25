import axios from "axios";
import React, { useEffect, useState } from "react";

function Userpage() {

    const seletedUser = localStorage.getItem('seletedUser');
    const [infoList, setInfoList] = useState([]);

    useEffect(() => {
        getInfoList();
    }, []);

    const getInfoList = () => {
        // setToggle(true);
        axios.get('http://localhost:4000/getUser/', {
            userName: seletedUser
        })
            .then((res) => {
                setInfoList(res.data.data)
            })
    }

    console.log(infoList)

    return (
        <div class='Userpage'>
            <h1 style={{ marginLeft: "10%", marginTop: "20px" }}>Username</h1>
            <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", height: "300px" }} class="p-3 mb-2 bg-light text-dark">
                <div className="Profile" style={{ height: "85%", float: "left" }}>
                    <img style={{ width: "250px", height: "250px" }} src={"https://bafybeidktemjjnwwjqh2c7yjiauho63xzxwcxmbrxyp5mxsj2tyvrfelea.ipfs.infura-ipfs.io/"}></img>
                </div>
                <br />

                <div className="Info" style={{ height: "85%" }}>
                    <div>
                        <h5>USERNAME : {infoList.map(info => {
                            return (
                                <div key={info.wallet_address}>
                                    {info.user_name}
                                </div>
                            )
                        })}</h5>
                    </div>
                    <div>
                        <h5>ADDRESS : {infoList[0].wallet_address}</h5>
                    </div>
                    <div>
                        <h5>EMAIL : {infoList[0].email}</h5>
                    </div>
                    <div>
                        <h5>Greeting : {infoList[0].greetings}</h5>
                    </div>

                    {/* <button>follow</button> */}

                </div>

            </div>

            <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                <h3>Post</h3>
                <hr></hr>
                <div>
                    {/* {
                        infoList.NftList.length === 0 ? '' :
                            <img width={"300px"} height="300px" src={infoList.NftList[0].image}></img>
                    } */}
                </div>
            </div>

        </div>
    );
}

export default Userpage