import { Button, Jumbotron, Carousel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Main_Carousel from './Main_Carousel';

function Main() {
    return (
    
        <div class="jumbotron">
            <Main_Carousel />
            <h1 class="display-4">Hello, world!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4"></hr>    
            <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button">Connect Wallet</a>
             </p>
             <p>지갑이 없으신가요?</p><Link to= "/wallet-download">지갑 다운로드</Link>
        </div>
        
        
    );
}

export default Main;