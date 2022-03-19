import React from 'react';
import { Button } from 'react-bootstrap';

function Mypage() {


    const username = localStorage.getItem('username')
    const address = localStorage.getItem('address')

    return (
        <div className='Mypage'>
            <h1 style={{ marginLeft: "10%", marginTop: "20px" }}>Mypage</h1>

            <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "30px", height: "300px" }} class="p-3 mb-2 bg-light text-dark">
                <div className='Profile' style={{ height: "85%", float: "left" }}>
                    <h2>Profile Picture</h2>
                </div>

                <div className='Info' style={{ height: "85%" }}>
                    <div>
                        <h6>USERNAME : {username} </h6>
                    </div>
                    <div>
                        <h6>ADDRESS : {address}</h6>
                    </div>
                    <div>
                        <h6>EMAIL : test@test.com</h6>
                    </div>
                </div>

                <div className='Token' style={{ float: "left", width: "80%", display: "flex", alignItems: "center" }}>
                    <h6>ERC20 TOKEN : 2311</h6>
                    <Button sytle={{ marginLeft: "10px" }}>ERC20 Transfer</Button>
                    <Button style={{ marginLeft: "10px" }} href="http://localhost:3000/transaction">VIEW TRANSACTION</Button>
                </div>
            </div>

            <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "center" }}>
                <h3>My Post</h3>
                <hr></hr>

                <div style={{ display: "flex", textAlign: "center" }}>
                    <div style={{ margin: "20px", padding: "13%", background: "pink" }}>3</div>
                    <div style={{ margin: "20px", padding: "13%", background: "red" }}>3</div>
                    <div style={{ margin: "20px", padding: "13%", background: "orange" }}>3</div>
                </div>

                <div style={{ display: "flex", textAlign: "center" }}>
                    <div style={{ margin: "20px", padding: "13%", background: "pink" }}>3</div>
                    <div style={{ margin: "20px", padding: "13%", background: "red" }}>3</div>
                    <div style={{ margin: "20px", padding: "13%", background: "orange" }}>3</div>
                </div>

            </div>
        </div >

    );
}

export default Mypage;