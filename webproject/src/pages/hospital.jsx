import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import HospitalCard from '../components/hospitalCard';
import { currentMarker } from '../components/mapMarker';
import 'leaflet/dist/leaflet.css';
import './hospital.css';

function MoveMap({ position }) {
    useMap().setView(position, 20);
}

function Hospital() {
    const [sortType, setSortType] = useState('distance');
    const [curPosition, setCurPosition] = useState([37.5665, 126.9780]);

    useEffect(() => { navigator.geolocation.getCurrentPosition( position => {setCurPosition([position.coords.latitude, position.coords.longitude])}, null, { enableHighAccuracy: true}) }, []);

    return (
        <>
        <section className='hospital-hero'>
            <div>
                <h1>인근 병원·약국 찾기</h1>
                <p>현재 위치 기준 가까운 병원, 응급실, 약국 정보를 실시간으로 제공합니다.</p>
            </div>
            <div className='hospital-search'>
                <i className='bi bi-search'></i>
                <input type='text' id='txt-search' placeholder='진료 과목으로 검색...'></input>
                <input type='button' id='btn-search' value='검색'></input>
            </div>
        </section>
        <div className='hospital-content'>
            <section className='hospital-map'>
                <MapContainer center={curPosition } zoom={20} scrollWheelZoom={false} style={{height: '100%', width: '100%'}} >
                    <MoveMap position={ curPosition } />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <Marker position={ curPosition } icon={ currentMarker }>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </section>
            <section className='hospital-panel'>
                <div className='hospital-panel-top'>
                    <div className='hospital-panel-right'>
                        <h1>전체</h1>
                        <h3>00곳</h3>
                    </div>
                    <div className='hospital-panel-left'>
                        <button className={sortType === 'distance' ? 'hospital-sort-btn active' : 'hospital-sort-btn'} onClick={() => setSortType('distance')}>거리순</button>
                        <button className={sortType === 'treatment' ? 'hospital-sort-btn active' : 'hospital-sort-btn'} onClick={() => setSortType('treatment')}>진료중</button>
                    </div>
                </div>
                <div  className='hospital-panel-list'>
                    <HospitalCard
                            placeType="hospital"
                            name="서원의원"
                            tagname="내과"
                            distance="0.7km"
                            time="09~18시"
                            isOpen="Open"
                        />
                </div>
            </section>
        </div>
        </>
    )
}

export default Hospital;
