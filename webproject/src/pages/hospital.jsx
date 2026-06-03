import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import HospitalCard from '../components/hospitalCard';
import BottomSheet from '../components/bottomsheet';
import { currentMarker, markers } from '../components/mapMarker';
import 'leaflet/dist/leaflet.css';
import './hospital.css';

function MoveMap({ position }) {
    useMap().setView(position, 20);
    if (!position) return null;
}

function Hospital() {
    const [sortType, setSortType] = useState('distance');
    const [curPosition, setCurPosition] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [inputValue, setInputValue] = useState('');
    
    /*
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = (today.getDate()).toString().padStart(2, '0');
    const day = ((today.getDay() + 6) % 7) + 1;
    const hours = today.getHours().toString().padStart(2, '0');
    const min = today.getMinutes().toString().padStart(2, '0');
    */

    const usedCoords = [];

    useEffect(() => { window.scrollTo(0,0) }, []);


    useEffect(() => { 
        navigator.geolocation.getCurrentPosition( position => {
            setCurPosition([position.coords.latitude, position.coords.longitude]);
            console.log(position.coords.latitude, position.coords.longitude)
        }, () => setCurPosition([37.5665, 126.9780]), { enableHighAccuracy: true}) 
    }, []);

    useEffect(() => {
        if (!curPosition) {
            return;
        }
        fetch(`/api/hospitals/nearby?latitude=${curPosition[0]}&longitude=${curPosition[1]}&sortType=${sortType}`, {headers: {'ngrok-skip-browser-warning': 'true'}})
        .then(response => response.json())
        .then(data =>{ 
            console.log(data);
            setHospitals(data);
        })
        .catch(error => console.log(error));
    }, [curPosition, sortType]);

    const filteredHospital = hospitals.filter(item =>
        item.tagName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    ).sort((a,b) => {
        if (sortType === 'treatment') {
            return b.open - a.open;
        }
        else {
            return 0;
        }
    });

    const handleSearch = (e) => {
        setSearchKeyword(inputValue);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const adjustHospitals = hospitals.map((item, index) => {
        if (usedCoords.some(coords => {
            const latDiff = Math.abs(coords.lat - item.latitude);
            const lngDiff = Math.abs(coords.lng - item.longitude);
            return (latDiff < 0.0001 && lngDiff < 0.0001)
        })) {
            usedCoords.push({ lat: item.latitude, lng: item.longitude });
            return {...item, longitude: item.longitude + 0.0001};
        }
        usedCoords.push({ lat: item.latitude, lng: item.longitude });
        return item;
    });

    return (
        <>
        <section className='hospital-hero'>
            <div>
                <h1>인근 병원·약국 찾기</h1>
                <p>현재 위치 기준 가까운 병원, 응급실, 약국 정보를 실시간으로 제공합니다.</p>
            </div>
            <div className='hospital-search'>
                <i className='bi bi-search' onClick={ handleSearch }></i>
                <input type='text' id='txt-search' placeholder='진료 과목으로 검색...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={ handleEnter }></input>
                <input type='button' id='btn-search' value='검색' onClick={ handleSearch }></input>
            </div>
        </section>
        <div className='hospital-content'>
            <section className='hospital-map'>
                <div className='hospital-legend'>
                    <ul className='hospital-marker-list'>
                        <li>보건소, 종합병원</li>
                        <li>약국</li>
                        <li>응급실</li>
                        <li>병원, 의원</li>
                    </ul>
                </div>
                <MapContainer center={curPosition || [37.5665, 126.9780]} zoom={20} style={{height: '100%', width: '100%'}} >
                    <MoveMap position={ curPosition || [37.5665, 126.9780]} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <Marker position={ curPosition || [37.5665, 126.9780] } icon={ currentMarker }></Marker>
                    { adjustHospitals.map((item, index) => (
                        <Marker position={ [item.latitude, item.longitude]} icon={ markers[item.placeType] } key={ index }>
                            <Popup>{ item.name }</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </section>
            <section className='hospital-panel'>
                <div className='hospital-panel-top'>
                    <div className='hospital-panel-right'>
                        <h1>{searchKeyword.length == 0 ? '전체' : searchKeyword}</h1>
                        <h3>{ filteredHospital.length }곳</h3>
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
                            tagName={ item.tagName}
                            distance={ item.distance }
                            openTime={ item.openTime }
                            closeTime={ item.closeTime}
                            isOpen={ item.open }
                            latitude={ item.latitude }
                            longitude={ item.longitude}
                            tel={ item.tel }
                            current={ curPosition || [37.5665, 126.9780] }
                            key={ index }
                        />
                    ))}
                </div>
            </section>
            <BottomSheet>
                <div className='hospital-search'>
                    <input type='text' id='txt-search' placeholder='진료 과목으로 검색...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={ handleEnter }></input>
                    <i className='bi bi-search' onClick={ handleSearch }></i>
                </div>
                <div className='hospital-panel-left'>
                    <button className={sortType === 'distance' ? 'hospital-sort-btn active' : 'hospital-sort-btn'} onClick={() => setSortType('distance')}>거리순</button>
                    <button className={sortType === 'treatment' ? 'hospital-sort-btn active' : 'hospital-sort-btn'} onClick={() => setSortType('treatment')}>진료중</button>
                </div>
                <div className='hospital-panel-list'>
                    {filteredHospital.map((item, index) => (
                        <HospitalCard
                            placeType={ item.placeType }
                            name={ item.name }
                            tagName={ item.tagName}
                            distance={ item.distance }
                            openTime={ item.openTime }
                            closeTime={ item.closeTime}
                            isOpen={ item.open }
                            latitude={ item.latitude }
                            longitude={ item.longitude}
                            tel={ item.tel }
                            current={ curPosition || [37.5665, 126.9780] }
                            key={ index }
                        />
                    ))}
                </div>
            </BottomSheet>
        </div>
        </>
    )
}

export default Hospital;