import { useState, useEffect } from 'react';
import MedicineCard from '../components/medicineCard';
import Pagination from '../components/pagination';
import './medicine.css';
    
function Medicine() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex ] = useState(0);    
    const [searchKeyword, setSearchKeyword] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { window.scrollTo(0,0) }, []);

    useEffect (() => {
        fetch('/api/medicine', {headers: {'ngrok-skip-browser-warning': 'true'}}).then(response => response.json()).then(data => {setMedicines(data); setIsLoading(false);})
        .catch(error => {console.log(error); setIsLoading(false);});
    }, []);

    const filteredMedicine = medicines.filter(item =>
        item.efficacy?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.medicineName?.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const curpageList = filteredMedicine.slice((page-1) * 10, page * 10);
    const medicineList = curpageList.map((item, index) => (
        <MedicineCard
            key={index}
            medicineName={ item.medicineName }
            company={ item.company }
            symptom={ item.symptom }
            efficacy={ item.efficacy }
            usage={ item.usage }
            warning={ item.warning}
            precaution={ item.precaution }
            interaction={ item.interaction }
            sideEffect={ item.sideEffect }
            storage={ item.storage }>
        </MedicineCard>
    ))

    const handleSearch = (e) => {
        setSearchKeyword(inputValue);
        setPage(1);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const inventoryList = medicines.map((item, index) =>
        <div className={ index === selectedIndex ? 'medicine-inventory medicine-inventory-active' : 'medicine-inventory' } key={index}>
            <div className="medicine-inventory-content" onClick={() => setSelectedIndex(index)}>
                <p>{ item.name }</p>
            </div>
        </div>
    );
    return (
        <div>
        <section className="medicine-hero">
            <div className="medicine-search-inner">
                <h1>의약품 검색</h1>
                <p>약품명 또는 증상을 입력하면 해당 의약품에 대해 안내합니다.</p>
            </div>
            <div className='medicine-search'>
                <i className='bi bi-search search-icon' onClick={ handleSearch }></i>
                <input type='text' className='txt-search' placeholder='약품명 입력 또는 증상 검색 ' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={ handleEnter }></input>
                <input type='button' id='btn-search' value='검색' onClick={ handleSearch }></input>
            </div>
            <div className='medicine-search-mobile'>
                <input type='text' className='txt-search' placeholder='약품명 입력 또는 증상 검색 ' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={ handleEnter }></input>
                <i className='bi bi-search search-icon' onClick={ handleSearch }></i>
            </div>
        </section>

        <div className="medicine-page">
            <section className="medicine-content">
                <h1>{searchKeyword.length == 0 ? '전체' : `'${searchKeyword}' 관련 의약품`}</h1>
                <span className="medicine-count">{filteredMedicine.length}개</span>
            </section>
            <section className='medicine-imform'>
                { isLoading ? <p className='medicine-load'>받아오는 중...</p> : medicineList }
            </section>
        </div>
        <section className='medicine-pagination'>
            <Pagination page={ page } setPage={ setPage } totalCount={ filteredMedicine.length } limit={ 10 }>
            </Pagination>
        </section>
        </div>
    )
}

export default Medicine;
