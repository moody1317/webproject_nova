import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import { currentMarker } from '../components/mapMarker';
import LocationModal from './LocationModal';
import './shelter.css';
import 'leaflet/dist/leaflet.css';
import "./LocationModal.css";

function MoveMap({position}) {
    const map=useMap();
    useEffect(() => {
        map.invalidateSize();
        map.setView(position, 20);
    }, [position]);
    return null;
}

function Shelter() {
    const [locations, setLocations] = useState([
        {id: 1, name: "우리집", address: null, icon:'bi bi-house-door', isFixed: true},
    ])
    const nextId = useRef(2);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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

    const DeleteLocation = (id) => {
        setLocations(locations.filter(loc => loc.id !== id));
    }

    const RenameLocation = (id, newName) => {
        setLocations(locations.map(loc => loc.id === id ? {...loc, name: newName} : loc));
    }

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
        {id: 1, name: "형서 집", distance: "0.3km", capacity: 500},
        {id: 2, name:" 승환이 집", distance: "1km", capacity: 1},
        {id: 3, name: "소은 집", distance: "3km", capacity: 5}
    ];
    return(
    <>
     <section className="shelter-category">
                <div className="shelter-sidebar-show">
                    {locationList}
                    <div className="shelter-inventory" onClick={() => setIsModalOpen(true)}>
                        <div className="shelter-inventory-content">
                            <p>+ 지역 추가</p>
                        </div>
                    </div>
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
               </MapContainer>
            </section>
            <section className="nearshelter-list">
                <div className="shelter-inner">
                {dummy.map((shelter) => (
                    <div className="shelter-card" key={shelter.id}>
                        <div className="shelter-card-info">
                            <i className="bi bi-buildings"></i>
                        <div>
                        <h4>{shelter.name}</h4>
                        <p>📏 {shelter.distance} 👥 {shelter.capacity}</p>
                    </div>
                    </div>
                    <input type="button" id="btn-shelter-card" value="길 찾기"
                    onClick={() => {

                    }}></input>
                    </div>
                ))}
                </div>
            </section>
        </div>

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
    </>
    )
}

export default Shelter;