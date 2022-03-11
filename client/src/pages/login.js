import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function LoginPage() {

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                {/* <img src="https://media.istockphoto.com/photos/cute-puppy-picture-id598175960" alt="W3Schools.com"></img>                 */}
                    

                    <div class="card-body">
                        <h5 class="card-title">My Pet</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Connect Wallet</a>
                        <br>
                        </br>
                        <br>
                        </br><Link to= "/wallet-download"> 지갑이 없으신가요? 지갑 다운로드</Link>
                    </div>

                
            </form>
        </div>
    );
}

export default LoginPage;