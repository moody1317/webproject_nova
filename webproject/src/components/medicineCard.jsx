import { useState, useEffect } from "react";
import './medicineCard.css';

function MedicineCard({medicineName, company, symptom, efficacy, usage, warning, precaution, interaction, sideEffect, storage}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="medicinecard">
            <div className="medicinecard-main">
                <div className="medicinecard-left">
                    <i className="bi bi-capsule"></i>
                    <div className="medicine-title">
                        <h1 className={isOpen ? "open-name" : ""}>{ medicineName }</h1>
                        <p>{ company }</p>
                    </div>
                </div>
                <div className="medicinecard-right">
                    <button className="medicinecard-more" onClick={() => setIsOpen(!isOpen)}>
                        <i className={isOpen ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"}></i>
                        <p>{isOpen ? "닫기" : "복용법"}</p>
                    </button>
                </div>
            </div>
            <div className={isOpen ? "show-detail" : "hidden-detail"}>
                <h3 className="hidden-content">복용법</h3>
                <p className="hidden-content">{ usage }</p>
                <h3>증상</h3>
                <p>{ symptom }</p>
                <h3 className="hidden-content">보관법</h3>
                <p className="hidden-content">{ storage }</p>
                <div className={`hidden-content ${ warning === null ? "hidden-detail-item" : "show-detail-item"}`}>
                    <div className="detail-title">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <h3>경고문</h3><br/>
                    </div>
                    <p>{ warning }</p>
                </div>
                <div className={ precaution === null ? "hidden-detail-item" : "show-detail-item"}>
                    <div className="detail-title">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <h3>주의사항</h3><br/>
                    </div>
                    <p>{ precaution }</p>
                </div>
                <div className={ interaction === null ? "hidden-detail-item" : "show-detail-item"}>
                    <div className="detail-title">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <h3>상호작용</h3><br/>
                    </div>
                    <p>{ interaction }</p>
                </div>
                <div className={`hidden-content ${ warning === null ? "hidden-detail-item" : "show-detail-item"}`}>
                    <div className="detail-title">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <h3>부작용</h3><br/>
                    </div>
                    <p>{ sideEffect }</p>
                </div>
            </div>
        </section>
    )
}

export default MedicineCard;