import { useState } from 'react';
import './LocationModal.css';


function LocationModal({onClose, onSave, nextId, locations, onDelete}) {
    
    const [customName, setCustomName] = useState("");
    
    const AddLocation = () => {
        onSave({
            id: nextId.current,
            name: customName,
            address: null, // 지도 API 연동
            icon: "bi-geo-alt-fill",
            isFixed: false
        });
        nextId.current += 1;
        setCustomName("");
    };

    const [selectedId, setSelectedId] = useState(null);
    
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
                    <button id="btn-modal-exit" onClick={onClose}>✕</button>
                </div>
            </section>

            <section className="modal-saveloc">
            <div className="modal-saveloc-inner">
                 <h4>저장된 지역</h4>
                 <span className="modal-locCount">{locations.length}/5</span>
            </div>
             
             <div className="modal-loc-list">
                {locations.map((loc) => (
                    <div key={loc.id}>
                    <div className={selectedId === loc.id ? "modal-loc-item modal-loc-item-active" : "modal-loc-item"} onClick={() => setSelectedId(loc.id)}>
                        <div className="modal-loc-item-top">
                        <i className="bi bi-list" ></i>
                        <div className="modal-loc-item-inner">
                            <i className={loc.icon}></i>
                            <div className="modal-loc-info">
                                <h4>{loc.name}</h4>
                                {loc.isFixed && <span className="modal-loc-badge">기본</span>}
                                <p>{loc.address ?? "주소 미설정"}</p>
                            </div>
                        </div>
                        <div className="modal-loc-btn">
                            <button id="btn-loc-change">수정</button>
                            <button id="btn-loc-delete" onClick={() => onDelete(loc.id)}>삭제</button>
                        </div>
                        </div>
                        <p className="modal-loc-drag">⇅ 드래그로 순서 변경</p>
                     </div>
                    </div>
                ))}
             </div>

             {locations.length < 5 && (
                <div className="modal-add-btn" onClick={AddLocation}>
                    <p>+ 새 지역 추가</p>
                </div>
             )}
             <p>최대 5개까지 저장 가능 (현재 {locations.length}/5)</p>
            </section>
        </div>
    </div>
    </>

    )
}
export default LocationModal;