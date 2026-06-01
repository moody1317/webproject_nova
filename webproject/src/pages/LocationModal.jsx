import { useEffect, useState } from 'react';
import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import MapModal from "./MapModal";



function LocationModal({onClose, onSave, nextId, locations, onDelete, onRename, onEdit, onSelectTab}) {
    
    const [customName, setCustomName] = useState("");
    // 지역 카드 추가
    const AddLocation = () => {
        onSave({
            id: nextId.current,
            name: customName,
            address: null, 
            icon: "bi-geo-alt-fill",
            isFixed: false,
            numaddress: null
        });
        nextId.current += 1;
        setCustomName("");
    };

    const [selectedId, setSelectedId] = useState(null);
    const [sortType, setSortType] = useState("distance");

    const [mapMode, setMapMode] = useState(null);
    const [nameEdit, setnameEdit] = useState(null);
    const selectLoc = locations.find(loc => loc.id === selectedId);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const sceneResize = () => {
            setIsMobile(window.innerWidth<=768);
        };

        window.addEventListener('resize', sceneResize);
        return () => window.removeEventListener('resize', sceneResize);
    }, []);
    
    const [mobileloc, setMobileloc] = useState('list');

    
    return (
    <>
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        

            <section className="modal-hero">
                <div className="modal-hero-content">
                    <div className="modal-hero-inner">
                        <h1>📍지역 관리</h1>
                        <p>거점 지역을 추가하고 관리하세요. 순서 변경·삭제는 온라인에서만 가능합니다.</p>
                    </div>
                    <button id="btn-modal-exit" onClick={onClose}>
                        {isMobile ? '❮ 주소 설정' : '✕'}
                        </button>
                </div>
            </section>
            <div className="modal-content"></div>
        
        <div className="modal-body">
            <section className="modal-saveloc" style={isMobile && mobileloc === 'map' ? {display: 'none'} : {}}>
            <div className="modal-saveloc-inner">
                 <h4>{locations.address ? locations.adress : "주소 미설정"}</h4>
                 <span className="modal-locCount">{locations.length}/5</span>
            </div>
             
             <div className="modal-loc-list">
                {locations.map((loc) => (
                    <div key={loc.id}>
                    <div className={selectedId === loc.id ? "modal-loc-item modal-loc-item-active" : "modal-loc-item"} 
                        onClick={() => {
                            if (isMobile) {
                                onSelectTab(loc.id);
                                onClose();
                            }
                            else {
                                if (selectedId === loc.id) {
                                    setSelectedId(null);
                                    setMapMode(null);
                                }
                                else {
                                    setSelectedId(loc.id);
                                    setMapMode({type: "view", loc: loc});
                                }
                            }

                            }
                            }>
                        <div className="modal-loc-item-top">
                            <i className="bi bi-list" ></i>
                            <div className="modal-loc-item-inner">
                                <i className={`bi ${loc.icon}`}></i>
                                    <div className="modal-loc-info">
                                        <div className="modal-loc-name">
                                        {nameEdit===loc.id ? (
                                            <input type="text" defaultValue={loc.name} 
                                            autoFocus 
                                            style={{minWidth: "50px", maxWidth:"55px"}}
                                            onBlur={(e) => {
                                                if (e.target.value.trim()==="")
                                                {
                                                    setnameEdit(null);
                                                    return;
                                                }
                                                {onRename(loc.id, e.target.value); 
                                            setnameEdit(null);}}}/>
                                        ) : (

                                        <h4 onClick={(e) => {e.stopPropagation();
                                            setnameEdit(loc.id);
                                        }}>{loc.name}</h4>
                                        )}

                                            {loc.isFixed && <span className="modal-loc-badge">기본</span>} 
                                        </div>
                                        
                                        <p>{loc.address ?? "주소 미설정"}</p>
                                    </div>
                            </div>
                                <div className="modal-loc-btn">
                                    <button id="btn-loc-change" onClick={(e) => {e.stopPropagation(); setMapMode({type: "edit", loc:loc}); if (isMobile) setMobileloc('map')}}>수정</button>
                                    {!loc.isFixed && (
                                    <button id="btn-loc-delete" onClick={(e) => {e.stopPropagation(); onDelete(loc.id)}}>삭제</button>
                                    )}
                                    </div>
                        </div>
                            <p className="modal-loc-drag">⇅ 드래그로 순서 변경</p>
                    </div>
                    </div>
                ))}

                 {locations.length < 5 && (
                <div className="modal-loc-add-btn" onClick={() => {setMapMode({type: "add"}); if (isMobile) setMobileloc('map')}}>
                    <p>+ 새 지역 추가</p>
                </div>
             )}
                 <p className="modal-loc-add-btn-txt">최대 5개까지 저장 가능 (현재 {locations.length}/5)</p>
             </div>
            </section>

            {mapMode && (<MapModal key={mapMode.loc?.id ?? "add"} mode={mapMode} onClose={() => setMapMode(null)}
                                                  onSave={(data) => {
                                                    if (mapMode.type === "add") {
                                                        onSave({
                                                            id: nextId.current,
                                                            name: data.name || "이름 미설정",
                                                            address: data.address,
                                                            numaddress: data.numaddress,
                                                            icon: "bi-buildings",
                                                            isFixed: false
                                                        });
                                                        nextId.current += 1;
                                                    }
                                                    else if (mapMode.type === "edit")
                                                    {
                                                        onEdit(mapMode.loc.id, {
                                                            address: data.address,
                                                            numaddress: data.numaddress
                                                        })
                                                    }
                                                    setMapMode(null);
                                                    if (isMobile) setMobileloc('list');
                                                }}
                                                    />
                                                )}

                     
            </div>
        </div>
    </div>
    </>

    )
}
export default LocationModal;