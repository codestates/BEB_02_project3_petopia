import React, { useState } from 'react';
import HospitalList from '../components/HospitalList';

function Hospital() {

    return (
        <div className='Hospital'>
            <h1 style={{ marginLeft: "10%", marginTop: "20px" }}>Hospital</h1>

            <div>
                <HospitalList />
            </div>

        </div>
    );
}

export default Hospital;