import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import HospitalCard from '../components/hospitalCard';
import { currentMarker, hospitalMarker, pharmacyMarker, emergencyMarker, clinicMarker } from '../components/mapMarker';
import 'leaflet/dist/leaflet.css';
import './hospital.css';

function MoveMap({ position }) {
    useMap().setView(position, 20);
}

function Hospital() {
    const [sortType, setSortType] = useState('distance');
    const [curPosition, setCurPosition] = useState([37.5665, 126.9780]);
    const [hospitals, setHospitals] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => { 
        navigator.geolocation.getCurrentPosition( position => {
            setCurPosition([position.coords.latitude, position.coords.longitude])
        }, null, { enableHighAccuracy: true}) 
    }, []);

    useEffect(() => {
        fetch(`/api/hospital?lat=${curPosition[0]}&lng=${curPosition[1]}`, {headers: {'ngrok-skip-browser-warning': 'true'}}).then(response => response.json()).then(data => setHospitals(data))
        .catch(error => console.log(error));
    }, [curPosition]);

    const filteredHospital = hospitals.filter(item =>
        item.tagname.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchKeyword(event.target.value);
    };

    return (
        <>
        <section className='hospital-hero'>
            <div>
                <h1>인근 병원·약국 찾기</h1>
                <p>현재 위치 기준 가까운 병원, 응급실, 약국 정보를 실시간으로 제공합니다.</p>
            </div>
            <div className='hospital-search'>
                <i className='bi bi-search'></i>
                <input type='text' id='txt-search' placeholder='진료 과목으로 검색...' onChange={ handleSearch }></input>
                <input type='button' id='btn-search' value='검색'></input>
            </div>
        </section>
        <div className='hospital-content'>
            <section className='hospital-map'>
                <div className='hospital-legend'>
                    <ul className='hospital-marker-list'>
                        <li>병원, 보건소, 종합병원</li>
                        <li>약국</li>
                        <li>응급실</li>
                        <li>의원</li>
                    </ul>
                </div>
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
                    {filteredHospital.map((item, index) => (
                        <HospitalCard
                            placeType={ item.placeType }
                            name={ item.name }
                            tagname={ item.tagname}
                            distance={ item.distance }
                            time={ item.time }
                            isOpen={ item.isOpen }
                            latitude={ item.latitude }
                            longitude={ item.longitude}
                            tel={ item.tel }
                            current={ curPosition }
                            key={ index }
                        />
                    ))}
                </div>
            </section>
            <section className='hospital-bottomsheet'>
                
            </section>
        </div>
        </>
    )
}

export default Hospital;
