import { useState } from 'react';
import './medicine.css';

const medicineList = [
    { name: "전체", sub: "전체 의약품 정보"},
    { name: "감기·몸살", sub: "'감기·몸살' 관련 의약품"},
    { name: "두통·발열", sub: "'두통·발열' 관련 의약품"},
    { name: "소화·위장", sub: "'소화·위장' 관련 의약품"},
    { name: "기침·호흡", sub: "'기침·호흡' 관련 의약품"},
    { name: "통증·염증", sub: "'통증·염증' 관련 의약품"},
    { name: "알레르기", sub: "'알레르기' 관련 의약품"},
];

    
function Medicine() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex ] = useState(0);

    const inventoryList = medicineList.map((item, index) =>
        <div className={ index === selectedIndex ? 'medicine-inventory medicine-inventory-active' : 'medicine-inventory' } key={index}>
            <div className="medicine-inventory-content" onClick={() => setSelectedIndex(index)}>
                <p>{ item.name }</p>
            </div>
        </div>
    );
    return (
        <>
        <section className="medicine-hero">
            <div className="medicine-search-inner">
                <h1>의약품 검색</h1>
                <p>약품명 또는 증상을 입력하면 해당 의약품과 복용법을 안내합니다.</p>

            <div className="medicine-search">
                <i className="bi bi-search"></i>
                    <input type="text" id="txt-medicine-search" placeholder="약품명 입력 또는 증상 검색 (예: 두통, 발열, 기침...)"></input>
                    <input type="button" id="btn-medicine-search" value="검색"></input>
                </div>
            </div>
        </section>

         <section className="medicine-category">
                <div className="medicine-sidebar-show">
                    { inventoryList }
                </div>
            </section>

        <div className="medicine-page">
            <section className="medicine-content">
                <p>{ medicineList[selectedIndex].sub }
                    <span className="medicine-count">0개</span>
                </p>
            </section>
        </div>
        </>
    )
}

export default Medicine;