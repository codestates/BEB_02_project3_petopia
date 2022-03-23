import axios from "axios";
import React, { useEffect, useState } from "react";

function Userpage() {

    const searchname = localStorage.getItem('searchname');

    const [infoList, setInfoList] = useState([]);
    // const [toggle, setToggle] = useState(false);

    useEffect((infoList) => {
        getInfoList();
    }, [infoList]);

    const getInfoList = () => {
        // setToggle(true);
        axios.get('http://localhost:4000/user/' + searchname)
            .then(res => res.data)
            .then(data => {
                setInfoList(data);
            })
            .catch(err => console.log(err));
    }

    // console.log(infoList.UserList[0].username)
    console.log(infoList)

    return (
        <div class='Userpage'>
            <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", height: "150px" }} class="p-3 mb-2 bg-light text-dark">

                <div className="Info" style={{ height: "50%", textAlign: "center" }}>
                    <div>
                        {/* <h6>USERNAME : {infoList.UserList[0].username}</h6> */}
                    </div>
                    <div>
                        {/* <h6>ADDRESS : {infoList.UserList[0].address}</h6> */}
                    </div>
                    <div>
                        <h6>EMAIL : insta@insta.com</h6>
                    </div>
                    <div>
                        <h6>Greeting : SAMPLE TEXT</h6>
                    </div>
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