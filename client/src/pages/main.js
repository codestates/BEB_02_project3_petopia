import { Button } from 'react-bootstrap';
import React from 'react';

function Main() {
    return (
        <div className='Main'>
            <h1>Main Page</h1>
            <Button href="/mypage" variant="primary">Mypage</Button>
        </div>
    );
}

export default Main;