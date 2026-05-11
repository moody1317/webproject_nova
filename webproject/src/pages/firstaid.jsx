import { useState } from 'react';
import './firstaid.css';
import firstaid from '../data/firstaidData';
import FirstaidContent from '../components/firstaidContent';

function Firstaid() {
    const [isOpen, setIsOpen] = useState(false);
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
            <button className={ isOpen ? 'hamburgers-closed' : 'hamburgers'} onClick={() => setIsOpen(!isOpen)}>
                <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
            <section className={ isOpen ? 'category-closed' : 'category'}>
                <h5>응급처치 유형</h5>
                <div className={ isOpen ? 'sidebar' : 'sidebar-show'}>
                    { inventoryList }
                </div>
            </section>
            <FirstaidContent selectedIndex={selectedIndex}/>
        </div>
    )
}

export default Firstaid;
