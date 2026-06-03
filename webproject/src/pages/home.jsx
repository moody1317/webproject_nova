import {NavLink} from 'react-router-dom';
import './home.css';

import homeFrameImg from '../assets/homeFrame.svg';

function Home() {
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

        <section className='find-shelter'>
            <div className='section-head'>
                <h1>대피소 찾기</h1>
                <div className='onoff-tag'>
                    <p>온/오프 지원</p>
                </div>
                <i className='bi bi-arrow-right-circle' style={{color: 'var(--color-text-sub1)', fontSize: 'var(--font-size-xxl)'}}></i>
            </div>
            <div className='section-comment'>
                <p>정해진 위치 기준 주변 대피소 정보를 제공합니다.</p>
            </div>
        </section>

        <section className='firstaid-guide'>
            <div className='section-head'>
                <h1>응급처치 가이드</h1>
                <div className='onoff-tag'>
                    <p>온/오프 지원</p>
                </div>
                <i className='bi bi-arrow-right-circle' style={{color: 'var(--color-text-sub1)', fontSize: 'var(--font-size-xxl)'}}></i>
            </div>
            <div className='section-comment'>
                <p>주요 응급처치 가이드를 제공합니다.</p>
            </div>
        </section>

        <section className='search-medicine'>
            <div className='section-head'>
                <h1>의약품 검색</h1>
                <div className='onoff-tag'>
                    <p>온/오프 지원</p>
                </div>
                <i className='bi bi-arrow-right-circle' style={{color: 'var(--color-text-sub1)', fontSize: 'var(--font-size-xxl)'}}></i>
            </div>
            <div className='section-comment'>
                <p>약품명 또는 증상을 입력하면 해당 의약품과 복용법을 안내합니다.</p>
            </div>
        </section>

        <section className='find-hospital'>
            <div className='section-head'>
                <h1>병원·약국 찾기</h1>
                <div className='onoff-tag'>
                    <p>온/오프 지원</p>
                </div>
                <i className='bi bi-arrow-right-circle' style={{color: 'var(--color-text-sub1)', fontSize: 'var(--font-size-xxl)'}}></i>
            </div>
            <div className='section-comment'>
                <p>현재 위치 기준 가까운 병원, 응급실, 약국 정보를 실시간으로 제공합니다.</p>
            </div>
        </section>

        <section className='introduce-team'>
            
        </section>

        <section className="emergency-contacts">
            <div className="emergency-contacts-content">
                <p className="emergency-contacts-text">긴급 연락처</p>
                <h2 className="emergency-contacts-title">재난 상황별 구급 번호</h2>
            </div>

            <div className="emergency-contacts-grid">
                <div className="emergency-contacts-119">
                    <div className="emergency-contacts-inner">
                        <div className="emergency-contacts-119-icons">
                            <i className="bi bi-fire" style={{fontSize: 'var(--font-size-xxxl'}}></i>
                        </div>
                        <div className="emergency-contacts-info">
                            <h1 className="emergency-contacts-card-119">119</h1>
                            <p className="emergency-contacts-card-title">소방·구급</p>
                        </div>
                    </div>
                        <p className="emergency-contacts-card-text">화제·응급 구조</p>
                </div>

                <div className="emergency-contacts-112">
                    <div className="emergency-contacts-inner">
                        <div className="emergency-contacts-112-icons">
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
                        <div className="emergency-contacts-122-icons">
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
                        <div className="emergency-contacts-1339-icons">
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
                        <div className="emergency-contacts-110-icons">
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
                        <div className="emergency-contacts-020-icons">
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

        <section className='mobile-only'>
            <h1>SafeGuard</h1>
            <p>주요 기능 바로가기</p>
            <div className='mobile-grid'>
                <NavLink to="/firstaid" end className='nav-mobile'>
                    <div className='nav-card'>
                        <div className='nav-card-icon'>
                            <i className="bi bi-capsule"></i>
                        </div>
                        <h3>응급처치 가이드</h3>
                        <div className='onoff-tag'>
                            <p>온/오프 지원</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/shelter" end className='nav-mobile'>
                    <div className='nav-card'>
                        <div className='nav-card-icon'>
                            <i className="bi bi-map"></i>
                        </div>
                        <h3>대피소 찾기</h3>
                        <div className='onoff-tag'>
                            <p>온/오프 지원</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/medicine" end className='nav-mobile'>
                    <div className='nav-card'>
                        <div className='nav-card-icon'>
                            <i className="bi bi-capsule-pill"></i>
                        </div>
                        <h3>의약품 검색</h3>
                        <div className='onoff-tag'>
                            <p>온/오프 지원</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/hospital" end className='nav-mobile'>
                    <div className='nav-card'>
                        <div className='nav-card-icon'>
                            <i className="bi bi-hospital"></i>
                        </div>
                        <h3>병원·약국 찾기</h3>
                        <div className='onoff-tag'>
                            <p>온/오프 지원</p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </section>
        </>
    );
}

export default Home;