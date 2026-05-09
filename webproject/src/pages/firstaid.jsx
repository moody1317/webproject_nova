import { useState } from 'react';
import './firstaid.css';

const firstaid = [
    { name: 'CPR(심폐소생술)', icon: 'bi bi-heart-pulse-fill' },
    { name: '하임리히법', icon: 'bi bi-emoji-dizzy-fill' },
    { name: '지혈법', icon: 'bi bi-droplet-fill'},
    { name: '골절 처치', icon:  'bi bi-person-wheelchair'},
    { name: '화상 처치', icon: 'bi bi-fire'},
    { name: '독극물 중독', icon: 'bi bi-virus' },
    { name: '익수자 처치', icon: 'bi bi-water'},
    { name: '전기 쇼크', icon: 'bi bi-lightning-charge-fill'}
];

function Firstaid() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const inventoryList = firstaid.map((item, index) => 
        <div className={ index === selectedIndex ? 'inventory active' : 'inventory' } key={index}>
            <div className='inventory-content' onClick={() => setSelectedIndex(index)}>
                <i className={ item.icon }></i>
                <p>{ item.name }</p>
            </div>
            <div className={ index === selectedIndex ? 'inventory-line active-line' : 'inventory-line'}></div>
        </div>   
    );

    return (
        <div className='page'>
            <section className='category'>
                <h5>응급처치 유형</h5>
                { inventoryList }
            </section>
            <section className='content'>
                <h1>{ firstaid[selectedIndex].name }</h1>
            </section>
        </div>
    )
}

export default Firstaid;
