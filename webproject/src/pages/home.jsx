import {NavLink} from 'react-router-dom';
import './home.css';

import homeFrameImg from '../assets/homeFrame.svg';

function Home() {
    const Emergency_contacts = [
        {num: "119", name: "소방·구급", des: "화재·응급·구조", color: "var(--color-text-third)"},
        {num: "112", name: "경찰", des: "범죄 테러·치안", color: "var(--color-text-secondary"},
        {num: "122", name: "해양 구조", des: "해상 사고·조난", color: "var(--color-rescure"},
        {num: "1339", name: "의료 상담", des: "응급 의료 정보", color: "var(--color-medical"},
        {num: "110", name: "정부 민원", des: "재난 민원 안내", color: "var(--color-gover"},
        {num: "020", name: "민방위", des: "공습·대피령", color: "var(--color-civil"},
    ];
    return (
        <>
        <section className="home-hero">
            <div className="home-hero-content">
                <h1 className="home-hero-title">재난 상황에서 침착하게</h1>
                <p className="home-hero-text">응급처치 · 대피소 찾기 · 재난 매뉴얼 · 의약품 정보 — 오프라인에서도 작동합니다</p>
            </div>
            <div className="home-hero-img">
                <img src={homeFrameImg} alt="homeFrame"/>
            </div>
        </section>

        <section className="emergency-contacts">
            <div className="emergency-contacts-content">
                <p className="emergency-contacts-text">긴급 연락처</p>
                <h2 className="emergency-contacts-title">재난 상황별 구급 번호</h2>
            </div>

            <div className="emergency-contacts-grid">
                <div className="emergency-contacts-119">
                    <div className="emergency-contacts-inner">
                        <div class="emergency-contacts-119-icons">
                            <i className="bi bi-fire" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-119-info">
                            <h1 className="emergency-contacts-card-119">119</h1>
                            <p className="emergency-contacts-card-title">소방·구급</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">화제·응급 구조</p>
                </div>

                <div className="emergency-contacts-112">
                    <div className="emergency-contacts-inner">
                        <div class="emergency-contacts-112-icons">
                            <i className="bi bi-taxi-front" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-112">112</h1>
                            <p className="emergency-contacts-card-title">경찰</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">범죄·테러·치안</p>
                </div>

                <div className="emergency-contacts-122">
                    <div className="emergency-contacts-inner">
                        <div class="emergency-contacts-122-icons">
                            <i className="bi bi-droplet" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-122">122</h1>
                            <p className="emergency-contacts-card-title">해양 구조</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">해상 사고·조난</p>
                </div>

                <div className="emergency-contacts-1339">
                    <div className="emergency-contacts-inner">
                        <div class="emergency-contacts-1339-icons">
                            <i className="bi bi-hospital" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-1339">1339</h1>
                            <p className="emergency-contacts-card-title">의료 상담</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">응급 의료 정보</p>
                </div>

                <div className="emergency-contacts-110">
                    <div className="emergency-contacts-inner">
                        <div class="emergency-contacts-110-icons">
                            <i className="bi bi-bank" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-110">110</h1>
                            <p className="emergency-contacts-card-title">정부 민원</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">재난 민원 안내</p>
                </div>

                <div className="emergency-contacts-020">
                    <div className="emergency-contacts-inner">
                        <div class="emergency-contacts-020-icons">
                            <i className="bi bi-shield-shaded" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-020">020</h1>
                            <p className="emergency-contacts-card-title">민방위</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">공습·대피령</p>
                </div>
            </div>

        </section>

        <section className="direct">
            <div className="direct-content">
                <p className="direct-text">주요 기능</p>
                <h2 className="direct-title">필요한 순간 즉시 이용하세요</h2>
            </div>
            <div className="direct-grid">
                <div className="direct-box">
                    <div className="direct-icon">
                        <i className="bi bi-capsule" style={{fontSize: 'var(--font-size-xxl)'}}></i>
                    </div>
                    <div className='direct-info'>
                        <h3>응급처치 가이드</h3>
                        <p>CPR · 하임리히법 · 지혈법 등 <br/>단계별 안내</p>
                        <div className='direct-onoff'>
                            <p><b>오프라인 지원</b></p>
                        </div>
                    </div>
                    <div className='direct-arrow'>
                        <NavLink to="/firstaid" end className='move'><i className='bi bi-arrow-right'></i></NavLink>
                    </div>
                </div>
                <div className="direct-box">
                    <div className="direct-icon">
                        <i className="bi bi-map" style={{fontSize: 'var(--font-size-xxl)'}}></i>
                    </div>
                    <div className='direct-info'>
                        <h3>대피소 찾기</h3>
                        <p>근처 대피소 위치 안내 <br/>오프라인 지도 포함</p>
                        <div className='direct-onoff'>
                            <p><b>오프라인 지원</b></p>
                        </div>
                    </div>
                    <div className='direct-arrow'>
                        <NavLink to="/shelter" end className='move'><i className='bi bi-arrow-right'></i></NavLink>
                    </div>
                </div>
                <div className='direct-box'>
                    <div className='direct-icon'>
                        <i className='bi bi-capsule-pill' style={{fontSize: 'var(--font-size-xxl)'}}></i>
                    </div>
                    <div className='direct-info'>
                        <h3>의약품 검색</h3>
                        <p>약품 효능 및 복용법<br/>상세 안내 제공</p>
                        <div className='direct-onoff'>
                            <p><b>온라인 전용</b></p>
                        </div>
                    </div>
                    <div className='direct-arrow'>
                        <NavLink to="/medicine" end className='move'><i className='bi bi-arrow-right'></i></NavLink>
                    </div>
                </div>
                <div className='direct-box'>
                    <div className='direct-icon'>
                        <i className='bi bi-hospital' style={{fontSize: 'var(--font-size-xxl)'}}></i>
                    </div>
                    <div className='direct-info'>
                        <h3>병원·약국 찾기</h3>
                        <p>근처 병원·약국 위치 안내<br/>온라인 지도 포함</p>
                        <div className='direct-onoff'>
                            <p><b>온라인 전용</b></p>
                        </div>
                    </div>
                    <div className='direct-arrow'>
                        <NavLink to="/hospital" end className='move'><i className='bi bi-arrow-right'></i></NavLink>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Home;
