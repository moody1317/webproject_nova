import { useState } from 'react';
import './hospitalCard.css';

const placeConfig = {
    hospital: { icon: 'bi-hospital' },
    pharmacy: { icon: 'bi-capsule-pill' },
    emergency: { icon: 'bi-heart-pulse' },
    clinic: { icon: 'bi-hospital' },
    healthcenter: { icon: 'bi-hospital' }
}

function HospitalCard({ name, tagname, distance, openTime, closeTime, isOpen, placeType, latitude, longitude, tel, current }) {

    const getClassName = (type) => {
        if (type === 'hospital') {
            return 'hospital-card';
        }
        else if (type === 'pharmacy') {
            return 'pharmacy-card';
        }
        else if (type === 'emergency') {
            return 'emergency-card';
        }
        else if (type === 'clinic') {
            return 'clinic-card';
        }
        else if (type === 'healthcenter') {
            return 'healthcenter-card';
        }
    }

    const getBackgroundClassName = (type) => {
        if (type === 'hospital') {
            return 'hospital-background';
        }
        else if (type === 'pharmacy') {
            return 'pharmacy-background';
        }
        else if (type === 'emergency') {
            return 'emergency-background';
        }
        else if (type === 'clinic') {
            return 'clinic-background';
        }
        else if (type === 'healthcenter') {
            return 'healthcenter-background';
        }
    }

    const getColorClassName = (type) => {
        if (type === 'hospital') {
            return 'hospital-text';
        }
        else if (type === 'pharmacy') {
            return 'pharmacy-text';
        }
        else if (type === 'emergency') {
            return 'emergency-text';
        }
        else if (type === 'clinic') {
            return 'clinic-text';
        }
        else if (type === 'healthcenter') {
            return 'healthcenter-text';
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

    const CallClick = () => {
        const user = navigator.userAgent;

        if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 ) {
            location.href=`tel: ${ tel }`
        }
        else {
            alert(`tel: ${ tel }`);
        }
    }

    const Directions = () => {
        window.open(`https://map.kakao.com/link/from/내위치,${current[0]},${current[1]}/to/${ name },${ latitude },${ longitude }`, "_blank");
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
                <button className='hcard-btn hcard-call' onClick={() => CallClick()}>전화</button>
                <button className='hcard-btn hcard-road' onClick={() => Directions() }>길 찾기</button>
            </div>
        </section>
    );
}

export default HospitalCard;
