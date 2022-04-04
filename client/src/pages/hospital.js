import React from 'react';
import HospitalList from '../components/HospitalList';
import './hospital.css';


function Hospital() {

    return (
        <div className='Hospital'>
            <h1 className="header">Animal Medical Service</h1>
            <div>
                <HospitalList />
            </div>
        </div>
    );
}

export default Hospital;