import { useState, useRef, useEffect } from 'react';
import './ShelterCard.css';



function ShelterCard({shelters}) {
    
    return(
    <>
            <section className="nearshelter-list">
                <div className="shelter-inner">
                {shelters.map((shelter) => (
                    <div className="shelter-card" key={shelter.id}>
                        <div className="shelter-card-info">
                            <i className="bi bi-buildings"></i>
                        <div>
                        <h4>{shelter.name}</h4>
                        <p>📏 {shelter.distance}km 👥 {shelter.capacity}명</p>
                    </div>
                    </div>
                    <input type="button" id="btn-shelter-card" value="길 찾기"
                    onClick={() => {

                    }}></input>
                    </div>
                ))}
                </div>
            </section>
    </>
    )
}

export default ShelterCard;