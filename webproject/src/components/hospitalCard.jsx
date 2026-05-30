import { useState } from 'react';
import './hospitalCard.css';

const placeConfig = {
    hospital: { icon: 'bi-hospital' },
    pharmacy: { icon: 'bi-capsule-pill' },
    emergency: { icon: 'bi-heart-pulse' },
    clinic: { icon: 'bi-hospital' },
    public: { icon: 'bi-hospital' }
}

const placeCard = {
    hospital: 'hospital-card',
    pharmacy: 'pharmacy-card',
    emergency: 'emergency-card',
    clinic: 'clinic-card',
    public: 'hospital-card'
}

const placeBackground = {
    hospital: 'hospital-background',
    pharmacy: 'pharmacy-background',
    emergency: 'emergency-background',
    clinic: 'clinic-background',
    public: 'hospital-background'
}

const placeText = {
    hospital: 'hospital-text',
    pharmacy: 'pharmacy-text',
    emergency: 'emergency-text',
    clinic: 'clinic-text',
    public: 'hospital-text'
}

function HospitalCard({ name, tagName, distance, openTime, closeTime, isOpen, placeType, latitude, longitude, tel, current }) {

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
        <section className={`hCard ${placeCard[placeType]}`}>
            <div className='hcard-left'>
                <div className={`hcard-icon ${placeBackground[placeType]}`}>
                    <i className={`bi ${placeConfig[placeType].icon}`}></i>
                </div>
                <div className='hcard-title'>
                    <h3>{ name }</h3>
                    <p className={`hcard-tag ${placeText[placeType]} ${placeBackground[placeType]}`}>{ tagName }</p>
                    <div className='hcard-detail'>
                        <p className='hcard-distance'>📏 { distance }km</p>
                        <p className='hcard-time'>🕐 { openTime } ~ { closeTime }</p>
                    </div>
                </div>
            </div>
            <div className='hcard-right'>
                <h3 className={`hcard-tag ${isOpen ? 'isopen' : 'isnotopen'}`}>{ isOpen ? 'Open' : 'Closed' }</h3>
                <button className='hcard-btn hcard-call' onClick={() => CallClick()}>전화</button>
                <button className='hcard-btn hcard-road' onClick={() => Directions() }>길 찾기</button>
            </div>
        </section>
    );
}

export default HospitalCard;