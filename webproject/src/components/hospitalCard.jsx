import { useState } from 'react';
import './hospitalCard.css';

const placeConfig = {
    hospital: { icon: 'bi-hospital' },
    pharmacy: { icon: 'bi-capsule-pill' },
    emergency: { icon: 'bi-heart-pulse' }
}

function HospitalCard({ name, tagname, distance, time, isOpen, placeType, latitude, longitude }) {

    const getClassName = (type) => {
        if (type === 'hospital') {
            return 'hospital-card';
        }
        else if (type === 'pharmacy') {
            return 'pharmacy-card';
        }
        else {
            return 'emergency-card';
        }
    }

    const getBackgroundClassName = (type) => {
        if (type === 'hospital') {
            return 'hospital-background';
        }
        else if (type === 'pharmacy') {
            return 'pharmacy-background';
        }
        else {
            return 'emergency-background';
        }
    }

    const getColorClassName = (type) => {
        if (type === 'hospital') {
            return 'hospital-text';
        }
        else if (type === 'pharmacy') {
            return 'pharmacy-text';
        }
        else {
            return 'emergency-text';
        }
    }

    const getIsOpenClassName = (type) => {
        if (type === 'Open') {
            return 'isopen';
        }
        else {
            return 'isnotopen';
        }
    }

    const Directions = () => {
        window.open("https://map.kakao.com/link/to/카카오판교아지트,37.3952969470752,127.110449292622", "_blank");
    }

    return (
        <section className={`hCard ${getClassName(placeType)}`}>
            <div className='hcard-left'>
                <div className={`hcard-icon ${getBackgroundClassName(placeType)}`}>
                    <i className={`bi ${placeConfig[placeType].icon}`}></i>
                </div>
                <div className='hcard-title'>
                    <h3>{ name }</h3>
                    <p className={`hcard-tag ${getColorClassName(placeType)} ${getBackgroundClassName(placeType)}`}>{ tagname }</p>
                    <div className='hcard-detail'>
                        <p className='hcard-distance'>📏 { distance }</p>
                        <p className='hcard-time'>🕐 { time }</p>
                    </div>
                </div>
            </div>
            <div className='hcard-right'>
                <h3 className={`hcard-tag ${getIsOpenClassName(isOpen)}`}>{ isOpen }</h3>
                <button className='hcard-btn hcard-call'>전화</button>
                <button className='hcard-btn hcard-road' onClick={() => Directions() }>길 찾기</button>
            </div>
        </section>
    );
}

export default HospitalCard;
