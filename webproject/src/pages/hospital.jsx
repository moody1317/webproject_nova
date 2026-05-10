import './hospital.css';

function Hospital() {
    return (
        <>
        <section className='hero'>
            <div>
                <h1>인근 병원·약국 찾기</h1>
                <p>현재 위치 기준 가까운 병원, 응급실, 약국 정보를 실시간으로 제공합니다.</p>
            </div>
            <div className='search'>
                <i className='bi bi-search'></i>
                <input type='text' id='txt-search' placeholder='진료 과목으로 검색...'></input>
                <input type='button' id='btn-search' value='검색'></input>
            </div>
        </section>
        </>
    )
}

export default Hospital;
