import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import { currentMarker } from '../components/mapMarker';
import LocationModal from './LocationModal';
import './shelter.css';
import 'leaflet/dist/leaflet.css';
import "./LocationModal.css";
import ShelterCard from '../components/Sheltercard';
import BottomSheet from '../components/bottomsheet';

// 지도 중심위치 이동
function MoveMap({position}) {
    const map=useMap();
    useEffect(() => {
        map.invalidateSize();
        map.setView(position, 20);
    }, [position]);
    return null;
}

function Shelter() {
    // 장소 목록
    const [locations, setLocations] = useState(() => {
        const saved = localStorage.getItem('locations');
        return saved ? JSON.parse(saved) : 
        [
        {id: 1, name: "우리집", address: null, icon:'bi bi-house-door', isFixed: true},
    ]});


    useEffect(() => {
        localStorage.setItem('locations', JSON.stringify(locations));
    }, [locations]);
    const nextId = useRef(2);
    // 지역 추가 모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // 위치 저장
    const SaveLocation = (newLocation) => {
        setLocations([...locations, newLocation]);
    }

    const [selectedTabId, setSelectedTabId] = useState(locations[0].id);
    
    const locationList = locations.map((loc) => (
         <div className={ selectedTabId === loc.id ? 'shelter-inventory shelter-inventory-active' : 'shelter-inventory' } key={loc.id}>
            <div className="shelter-inventory-content" onClick={() => setSelectedTabId(loc.id)}>
                <p>{loc.name}</p>
            </div>
        </div>
    ))

    // 저장된 위치 카드 삭제
    const DeleteLocation = (id) => {
        setLocations(locations.filter(loc => loc.id !== id));
    }
    // 장소 이름 변경
    const RenameLocation = (id, newName) => {
        setLocations(locations.map(loc => loc.id === id ? {...loc, name: newName} : loc));
    }
    // 장소 위치 수정
    const EditLocation = (id, newData) => {
        setLocations(locations.map(loc =>{
            if (loc.id === id)
            {
                return {...loc, ...newData};
            }
            else
            {
                return loc;
            }
        }))
    }
   
    const selectedloc = locations.find(loc=>loc.id===selectedTabId);
    const position = selectedloc?.numaddress ?? [37.5665, 126.9780];

    const dummy = [
        {id: 1, name: "형서 집", distance:"0.3km", capacity:500, lat: 36.629, lng: 127.457},
        {id: 2, name:"승환이 집", distance:"1km", capacity:500, lat: 36.631, lng: 127.459},
        {id: 3, name: "소은 집", distance:"3km", capacity:500, lat: 36.635, lng: 127.462}
    ];

    const [shelters, setShelters] = useState(dummy);
    useEffect(()=> {
        if (!selectedloc?.numaddress) return;

        fetch(`/api/shelters/nearby?latitude=${selectedloc.numaddress[0]}&longitude=${selectedloc.numaddress[1]}`)
        .then(res => res.json())
        .then(data => setShelters(data))
    }, [selectedTabId]);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const sceneResize = () => {
            setIsMobile(window.innerWidth<=768);
        };

        window.addEventListener('resize', sceneResize);
        return () => window.removeEventListener('resize', sceneResize);
    }, []);

    
    return(
    <>
     <section className="shelter-category">
                <div className="shelter-sidebar-show">
                    {isMobile ? <div className="shelter-inventory shelter-inventory-active">
                        <div className="shelter-inventory-content">
                            <p>{locations.find(loc => loc.id === selectedTabId)?.name}</p>
                        </div>
                        </div>
                        :locationList
                    }
                    <button className="shelter-add-btn" onClick={() => setIsModalOpen(true)}>
                        {isMobile ? '+' : '+ 지역 추가'}
                    </button>
                </div>
    </section>

        <div className="shelter-page">
            <section className="shelter-mapcontent">
               <MapContainer center={position} zoom={20} style={{height: "100%", width:"100%"}}>
                <MoveMap position={position}/>
                 <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"></TileLayer>
                            {selectedloc?.numaddress && (<Marker position={selectedloc.numaddress} icon={currentMarker}>
                                                            <Popup>{selectedloc.name}</Popup>
                                                        </Marker>
                            )}
                    {shelters.map((shelter) => (
                        <Marker position = {[shelter.lat, shelter.lng]} key = {shelter.id}>
                            <Popup>{shelter.name}</Popup>
                        </Marker>
                    ))}
               </MapContainer>
            </section>

         <div className="sheltercard-list">
            <ShelterCard shelters={shelters}/>
        </div>

        </div>
        <section className="emergency-contacts">
            <div className="emergency-contacts-content">
                <p className="emergency-contacts-text">긴급 연락처</p>
                <h2 className="emergency-contacts-title">재난 상황별 구급 번호</h2>
            </div>

            <div className="emergency-contacts-grid">
                <div className="emergency-contacts-119">
                    <div className="emergency-contacts-inner">
                        <div className="emergency-contacts-119-icons">
                            <i className="bi bi-fire" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-119">119</h1>
                            <p className="emergency-contacts-card-title">소방·구급</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">화제·응급 구조</p>
                </div>

                <div className="emergency-contacts-112">
                    <div className="emergency-contacts-inner">
                        <div className="emergency-contacts-112-icons">
                            <i className="bi bi-taxi-front" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-112">112</h1>
                            <p className="emergency-contacts-card-title">경찰</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">범죄·테러·치안</p>
                </div>

                <div className="emergency-contacts-122">
                    <div className="emergency-contacts-inner">
                        <div className="emergency-contacts-122-icons">
                            <i className="bi bi-droplet" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-122">122</h1>
                            <p className="emergency-contacts-card-title">해양 구조</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">해상 사고·조난</p>
                </div>

                <div className="emergency-contacts-1339">
                    <div className="emergency-contacts-inner">
                        <div className="emergency-contacts-1339-icons">
                            <i className="bi bi-hospital" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-1339">1339</h1>
                            <p className="emergency-contacts-card-title">의료 상담</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">응급 의료 정보</p>
                </div>

                <div className="emergency-contacts-110">
                    <div className="emergency-contacts-inner">
                        <div className="emergency-contacts-110-icons">
                            <i className="bi bi-bank" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-110">110</h1>
                            <p className="emergency-contacts-card-title">정부 민원</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">재난 민원 안내</p>
                </div>

                <div className="emergency-contacts-020">
                    <div className="emergency-contacts-inner">
                        <div className="emergency-contacts-020-icons">
                            <i className="bi bi-shield-shaded" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-020">020</h1>
                            <p className="emergency-contacts-card-title">민방위</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">공습·대피령</p>
                </div>
            </div>

        </section>

        {isModalOpen && 
            <LocationModal
                onClose={() => setIsModalOpen(false)}
                onSave={SaveLocation}
                nextId={nextId}
                locations={locations}
                onDelete={DeleteLocation}
                onRename={RenameLocation}
                onEdit={EditLocation}
            />
        }

        <BottomSheet>
            <div className="shelter-list-mobile">
                <ShelterCard shelters = {shelters}></ShelterCard>
            </div>
        </BottomSheet>
    </>
    )
}

export default Shelter;