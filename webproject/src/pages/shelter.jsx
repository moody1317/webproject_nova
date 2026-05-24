import { useState } from 'react';
import { useRef} from 'react';
import LocationModal from './LocationModal';
import './shelter.css';


function Shelter() {
    const [locations, setLocations] = useState([
        {id: 1, name: "우리집", address: null, icon:'bi bi-house-door', isFixed: true},
    ])
    const nextId = useRef(2);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const SaveLocation = (newLocation) => {
        setLocations([...locations, newLocation]);
        setIsModalOpen(false);
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
            <section className="shelter-content">
               
            </section>
        </div>

        {isModalOpen && 
            <LocationModal
                onClose={() => setIsModalOpen(false)}
                onSave={SaveLocation}
                nextId={nextId}
                locations={locations}
                onDelete={DeleteLocation}
            />
        }
    </>
    )
}

export default Shelter;