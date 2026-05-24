import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import HospitalCard from '../components/hospitalCard';
import BottomSheet from '../components/bottomsheet';
import { currentMarker, markers } from '../components/mapMarker';
import 'leaflet/dist/leaflet.css';
import './hospital.css';


const hospitals = [
        {
            placeType: 'hospital',
            name: '서울성모병원',
            tagname: '내과',
            distance: '0.3km',
            openTime: '09:00',
            closeTime: '18:00',
            isOpen: true,
            latitude: 37.5665,
            longitude: 126.9780,
            tel: '02-1234-5678'
        },
        {
            placeType: 'pharmacy',
            name: '한강약국',
            tagname: '약국',
            distance: '0.5km',
            openTime: '09:00',
            closeTime: '21:00',
            isOpen: true,
            latitude: 37.5670,
            longitude: 126.9785,
            tel: '02-2345-6789'
        },
        {
            placeType: 'emergency',
            name: '서울응급의료센터',
            tagname: '응급실',
            distance: '1.2km',
            openTime: '00:00',
            closeTime: '24:00',
            isOpen: true,
            latitude: 37.5680,
            longitude: 126.9790,
            tel: '02-3456-7890'
        },
        {
            placeType: 'clinic',
            name: '강남의원',
            tagname: '정형외과',
            distance: '2.0km',
            openTime: '09:00',
            closeTime: '17:00',
            isOpen: false,
            latitude: 37.5690,
            longitude: 126.9800,
            tel: '02-4567-8901'
        },
        {
            placeType: 'hospital',
            name: '서울성모병원',
            tagname: '내과',
            distance: '0.3km',
            openTime: '09:00',
            closeTime: '18:00',
            isOpen: true,
            latitude: 37.5665,
            longitude: 126.9780,
            tel: '02-1234-5678'
        },
        {
            placeType: 'pharmacy',
            name: '한강약국',
            tagname: '약국',
            distance: '0.5km',
            openTime: '09:00',
            closeTime: '21:00',
            isOpen: true,
            latitude: 37.5670,
            longitude: 126.9785,
            tel: '02-2345-6789'
        },
        {
            placeType: 'emergency',
            name: '서울응급의료센터',
            tagname: '응급실',
            distance: '1.2km',
            openTime: '00:00',
            closeTime: '24:00',
            isOpen: true,
            latitude: 37.5680,
            longitude: 126.9790,
            tel: '02-3456-7890'
        },
        {
            placeType: 'clinic',
            name: '강남병원',
            tagname: '정형외과',
            distance: '2.0km',
            openTime: '09:00',
            closeTime: '17:00',
            isOpen: false,
            latitude: 37.5690,
            longitude: 126.9800,
            tel: '02-4567-8901'
        }
    ];

function MoveMap({ position }) {
    useMap().setView(position, 20);
}

function Hospital() {
    const [sortType, setSortType] = useState('distance');
    const [curPosition, setCurPosition] = useState([37.5665, 126.9780]);
    /* const [hospitals, setHospitals] = useState([]); */
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


    useEffect(() => { 
        navigator.geolocation.getCurrentPosition( position => {
            setCurPosition([position.coords.latitude, position.coords.longitude])
        }, null, { enableHighAccuracy: true}) 
    }, []);

    /*
    useEffect(() => {
        fetch(`/api/hospital?lat=${curPosition[0]}&lng=${curPosition[1]}`, {headers: {'ngrok-skip-browser-warning': 'true'}}).then(response => response.json()).then(data => setHospitals(data))
        .catch(error => console.log(error));
    }, [curPosition]);
*/
    const filteredHospital = hospitals.filter(item =>
        item.tagname.toLowerCase().includes(searchKeyword.toLowerCase())
    ).sort((a,b) => {
        if (sortType === 'treatment') {
            return b.isOpen - a.isOpen;
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
                    <Marker position={ curPosition } icon={ currentMarker }></Marker>
                    { hospitals.map((item, index) => (
                        <Marker position={ [item.latitude, item.longitude]} icon={ markers[item.placeType] } key={ index }></Marker>
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
                            tagname={ item.tagname}
                            distance={ item.distance }
                            openTime={ item.openTime }
                            closeTime={ item.closeTime}
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
                            tagname={ item.tagname}
                            distance={ item.distance }
                            openTime={ item.openTime }
                            closeTime={ item.closeTime}
                            isOpen={ item.isOpen }
                            latitude={ item.latitude }
                            longitude={ item.longitude}
                            tel={ item.tel }
                            current={ curPosition }
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