import { useState, useRef, useEffect } from 'react';
import './ShelterCard.css';



function ShelterCard({shelters, currentLocation}) {
    
    return(
    <>
                <div className="shelter-inner">
                    {shelters.map((shelter) => (
                    <div className="shelter-card" key={shelter.id}>
                        <div className="shelter-card-info">
                            <i className="bi bi-buildings"></i>
                        <div className="shelter-text">
                        <h4>{shelter.name}</h4>
                        <p><span className="shelter-distance">📏 {shelter.distance}km</span> 👥 {shelter.capacity}명</p>
                    </div>
                    </div>

                    <button className="btn-shelter-card"
                    onClick={(e) => {
                        window.open(`https://map.kakao.com/link/from/${currentLocation?.name},${currentLocation?.numaddress?.[0]},${currentLocation?.numaddress?.[1]}/to/${shelter.name},${shelter.lat},${shelter.lng}`);
                    }}>길 찾기</button>
                    </div>
                ))}
                </div>
    </>
    )
}

export default ShelterCard;