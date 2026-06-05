import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import {useState, useEffect, useRef} from "react";
import { currentMarker } from '../components/mapMarker';
import "./LocationModal.css";

// 지도 중심 위치 이동
 function FindMap({position}) {
    const map=useMap();
    useEffect(() => {
        map.setView(position, 20);
    }, [position]);
    return null;
}
// 마커 찍는 거
function ClickMarker({onMapClick}) {
    useMapEvents({
        click(e) {
            onMapClick([e.latlng.lat, e.latlng.lng])
        }
    });
    return null;
}
// 지도 기능, 모드 (수정, 삭제, 추가), 저장, 닫기
function MapModal({mode, onClose, onSave}){
    const [curPosition, setCurPosition] = useState(mode.type !== "add" && mode.loc?.numaddress ? mode.loc.numaddress : [37.5665, 126.9780]);
    const [address, setAddress] = useState(mode.type !== "add" && mode.loc?.address ? mode.loc.address : "");
    const [clickposition, setClickposition] = useState(null);
    useEffect(() => {
        if (mode.type === "add"){
            navigator.geolocation.getCurrentPosition(position => {setCurPosition([position.coords.latitude, position.coords.longitude])}, null, {enableHighAccuracy: true});}}, []);

    // 좌표 변환
const clickmaptrans = async (numaddress) => {
    setClickposition(numaddress);

    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${numaddress[0]}&lon=${numaddress[1]}&format=json`);
    const data = await res.json();
    setAddress(data.display_name);
};

const btnClick = () => {
    onSave({
        numaddress: clickposition,
        address: address
    })
}

// 검색 기능
const searchRef = useRef(null);
const search = async () => {
    const input = searchRef.current.value;
    if (!input.trim()) return;

    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=1&accept-language=ko`
    )
    const result = await res.json();
    if (result.length > 0) 
    {
        const {lat, lon, display_name} = result[0];
        const pos = [parseFloat(lat), parseFloat(lon)];
        setCurPosition(pos);
        setClickposition(pos);
        setAddress(display_name);
    }
};
    return (

        <section className="modal-map">
                <div className="modal-map-sel">
                    <h2>위치 선택</h2>
                    <p>지도를 클릭해 거점 위치를 지정하세요. 해당 지점 반경 5Km 데이터가 저장됩니다.</p>
                </div>
                <div className="modal-map-search">
                    <i className='bi bi-search'></i>
                    <input type='text' ref={searchRef}id="txt-modal-search" placeholder="주소 또는 장소명 검색..."
                            onKeyDown={(e) => {if (e.key === 'Enter') search();}}></input>
                    <input type="button" id="btn-modal-search" value="검색" onClick={search}></input>
                </div>
                <section className='modal-map-R'>
                    <MapContainer center={curPosition } zoom={20} scrollWheelZoom={true}scrollWheelZoom={true} style={{height: '100%', width: '100%'}} >
                        <FindMap position={ curPosition } />
                            <ClickMarker onMapClick={clickmaptrans}></ClickMarker>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/>
                                <Marker position={clickposition ?? curPosition } icon={ currentMarker }></Marker>
                    </MapContainer>
                </section>    
                <div className="modal-map-save">
                    <p>선택된 위치</p>
                    <div className="modal-map-locsave">
                        <p className="maploc" >{address}</p>
                        {mode.type !== "view" && (
                        <input type="button" id="btn-modal-save" value="저장" 
                            onClick={() => {
                                if (!clickposition) 
                                {
                                    return;
                                }
                                onSave({
                                    address: address,
                                    numaddress: clickposition
                                })
                                onClose();
                            }}>
                            </input>
                        )}
                    </div>
                    <p className="modal-map-warn">⚠ 저장 시 선택 위치 기준 반경 3.5km 데이터가 다운로드됩니다. Wi-Fi 환경을 권장합니다.</p>
                </div>
            </section>   
    )
}

export default MapModal;
