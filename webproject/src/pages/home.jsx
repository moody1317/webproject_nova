import {NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './home.css';
import homeFrameImg from '../assets/homeFrame.svg';
import Heo from '../assets/Heo.png';
import Shim from '../assets/Shim.png';
import Hong from '../assets/Hong.png';

const placeConfig = {
    publicCount: { label: '보건소', colorClass: 'public-cnt'},
    hospitalCount: { label: '종합병원', colorClass: 'hospital-cnt'},
    pharmacyCount: { label: '약국', colorClass: 'pharmacy-cnt'},
    clinicCount: { label: '병의원', colorClass: 'clinic-cnt'},
    emergencyCount: { label: '응급실', colorClass: 'emergency-cnt'}
}

function Home() {
    const [hospitalcnt, setHospitalCnt] = useState({});

    useEffect (() => {
        fetch('/api/main/stats', {headers: {'ngrok-skip-browser-warning': 'true'}}).then(response => response.json()).then(data => setHospitalCnt(data))
        .catch(error => console.log(error));
    }, []);

    const hospitalList = Object.entries(hospitalcnt).map(([key, value]) => (
        <div className={`hospitals-card ${placeConfig[key].colorClass}`}>
            <h1>{placeConfig[key].label}</h1>
            <h3>{value}</h3>
        </div>
    ))

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
                <NavLink to="/shelter" end className='move'>
                    <i className='bi bi-arrow-right-circle' style={{fontSize: 'var(--font-size-xxl)'}}></i>
                </NavLink>
            </div>
           

            <div className='shelter-section-content'>
                <div className='shelter-feature-left'>
                     <div className='section-comment'>
                        <p>정해진 위치 기준 주변 대피소 정보를 제공합니다.</p>
                     </div>
                
                <div className='shelter-feature-table'>
                    <div className='shelter-feature-card'>
                        <h3>반경 5km</h3>
                        <p>주변 대피소 탐색</p>
                    </div>
                    <div className='shelter-feature-card'>
                        <h3>오프라인 지원</h3>
                        <p>인터넷 없어도 사용 가능</p>
                    </div>
                    <div className='shelter-feature-card'>
                        <h3>대피소 마커</h3>
                        <p>지도에서 한 눈에</p>
                    </div>
                    <div className='shelter-feature-card'>
                        <h3>빠른 대피</h3>
                        <p>가까운 대피소 바로 확인</p>
                    </div>
                </div>
                </div>
                <div className='shelter-feature-cheklist'>
                    <h2>내 주변의 안전, 가장 빠르고 확실하게 찾으세요.</h2>
                    <div className='shelter-feature-checklist-box'>
                        <div className='shelter-feature-checklist-ul'>
                            <i className="bi bi-check-square"></i>
                                <div className='shelter-feature-checklist-text'>
                                    <h4>위치 저장</h4>
                                    <p>온라인에서 집, 회사 등 최대 5개 거점을 미리 저장하세요.</p>
                                </div>
                        </div>
                        <div className='shelter-feature-checklist-ul'>
                            <i className="bi bi-check-square"></i>
                                <div className='shelter-feature-checklist-text'>
                                    <h4>주변 대피소</h4>
                                    <p>저장한 위치 반경 5km 내 대피소를 지도와 목록으로 확인하세요.</p>
                                </div>
                        </div>
                        <div className='shelter-feature-checklist-ul'>
                            <i className="bi bi-check-square"></i>
                                <div className='shelter-feature-checklist-text'>
                                    <h4>길 안내 제공</h4>
                                    <p>저장한 위치에서 주변 대피소까지의 경로를 안내합니다.</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='firstaid-guide'>
            <div className='section-head'>
                <h1>응급처치 가이드</h1>
                <div className='onoff-tag'>
                    <p>온/오프 지원</p>
                </div>
                <NavLink to="/firstaid" end className='move'>
                    <i className='bi bi-arrow-right-circle' style={{fontSize: 'var(--font-size-xxl)'}}></i>
                </NavLink>
            </div>

            <div className='firstaid-content'>
                <div className='firstaid-left'>
                    <div className='section-comment'>
                        <p>주요 응급처치 가이드를 제공합니다.</p>
                    </div>
                    <div className='firstaid-type'>
                        <div className='firstaid-name'>
                            <i className='bi bi-heart-pulse-fill'></i>
                            <p>CPR(심폐소생술)</p>
                        </div>
                        <div className='firstaid-name'>
                            <i className='bi bi-fire'></i>
                            <p>화상처치</p>
                        </div>
                        <div className='firstaid-name'>
                            <i className='bi bi-emoji-dizzy-fill'></i>
                            <p>하임리히법</p>
                        </div>
                        <div className='firstaid-name'>
                            <i className='bi bi-virus'></i>
                            <p>독극물 중독</p>
                        </div>
                        <div className='firstaid-name'>
                            <i className='bi bi-droplet-fill'></i>
                            <p>지혈법</p>
                        </div>
                        <div className='firstaid-name'>
                            <i className='bi bi-water'></i>
                            <p>익수자 처치</p>
                        </div>
                        <div className='firstaid-name'>
                            <i className='bi bi-person-wheelchair'></i>
                            <p>골절 처치</p>
                        </div>
                        <div className='firstaid-name'>
                            <i className='bi bi-lightning-charge-fill'></i>
                            <p>전기 쇼크</p>
                        </div>
                    </div>
                </div>
                <div className='firstaid-right'>
                    <h2>다음과 같은 기능을 제공합니다.</h2>
                    <div className='firstaid-list'>
                        <div className='firstaid-func'>
                            <i className='bi bi-check-square'></i>
                            <div className='firstaid-li'>
                                <h4>오프라인 동작</h4>
                                <p>데이터가 끊겨도 언제든 확인 가능합니다.</p>
                            </div>
                        </div>
                        <div className='firstaid-func'>
                            <i className='bi bi-check-square'></i>
                            <div className='firstaid-li'>
                                <h4>직관적인 매뉴얼</h4>
                                <p>긴 글을 읽을 필요 없이 핵심 요약 정보와 짧은 영상으로 제공합니다.</p>
                            </div>
                        </div>
                        <div className='firstaid-func'>
                            <i className='bi bi-check-square'></i>
                            <div className='firstaid-li'>
                                <h4>검증된 공식 응급 가이드</h4>
                                <p>소방청 등의 기관의 지침을 반영하여 제공합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='find-shelter'>
            <div className='section-head'>
                <h1>의약품 검색</h1>
                <div className='onoff-tag'>
                    <p>온라인 지원</p>
                </div>
                <NavLink to="/shelter" end className='move'>
                    <i className='bi bi-arrow-right-circle' style={{fontSize: 'var(--font-size-xxl)'}}></i>
                </NavLink>
            </div>
           

            <div className='shelter-section-content'>
                <div className='shelter-feature-left'>
                     <div className='section-comment'>
                        <p>약품명 또는 증상을 입력하면 해당 의약품과 복용법을 안내합니다.</p>
                     </div>
                
                <div className='shelter-feature-table'>
                    <div className='shelter-feature-card'>
                        <h3>다양한 의약품</h3>
                        <p>필요한 약 바로 찾기</p>
                    </div>
                    <div className='shelter-feature-card'>
                        <h3>증상 검색</h3>
                        <p>이름 몰라도 OK</p>
                    </div>
                    <div className='shelter-feature-card'>
                        <h3>성분 분석</h3>
                        <p>성분별 상세 정보</p>
                    </div>
                    <div className='shelter-feature-card'>
                        <h3>복용 가이드</h3>
                        <p>먹기 전 꼭 확인</p>
                    </div>
                </div>
            </div>
                <div className='shelter-feature-cheklist'>
                    <h2>내 증상만 입력하세요, 딱 맞는 약을 찾아드립니다.</h2>
                    <div className='shelter-feature-checklist-box'>
                        <div className='shelter-feature-checklist-ul'>
                            <i className="bi bi-check-square"></i>
                                <div className='shelter-feature-checklist-text'>
                                    <h4>스마트 맞춤 검색</h4>
                                    <p>"두통" 처럼 간단하게 증상만 검색해도 관련 의약품을 매칭해드립니다.</p>
                                </div>
                        </div>
                        <div className='shelter-feature-checklist-ul'>
                            <i className="bi bi-check-square"></i>
                                <div className='shelter-feature-checklist-text'>
                                    <h4>상세 안전 정보</h4>
                                    <p>부작용, 상호작용, 주의사항 등 약 먹기 전 꼭 알아야할 8가지 필수 정보를 제공합니다.</p>
                                </div>
                        </div>
                        <div className='shelter-feature-checklist-ul'>
                            <i className="bi bi-check-square"></i>
                                <div className='shelter-feature-checklist-text'>
                                    <h4>믿을 수 있는 데이터</h4>
                                    <p>식품의약품안전처_의약품개요정보(e약은요) 데이터를 사용합니다.</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='find-hospital'>
            <div className='section-head'>
                <h1>병원·약국 찾기</h1>
                <div className='onoff-tag'>
                    <p>온/오프 지원</p>
                </div>
                <NavLink to="/hospital" end className='move'>
                    <i className='bi bi-arrow-right-circle' style={{fontSize: 'var(--font-size-xxl)'}}></i>
                </NavLink>
            </div>
            <div className='section-comment'>
                <p>현재 위치 기준 가까운 병원, 응급실, 약국 정보를 실시간으로 제공합니다.</p>
            </div>
            <p>실시간 검색 가능한 의료 기관</p>
            <div className='hospital-list'>
                { hospitalList }
            </div>
        </section>

        <section className='Introduce-contact'>
            <div className='Introduce-text'>
                <h3>만든 사람들</h3>
                <p>Team Nova</p>
            </div>

            <div className='Team-Nova'>
                <div className='team-card'>
                    <img src={Heo} className='team-img' style={{width: '222px', height: '204px'}} alt='허형서'></img>
                    <div className='team-card-text'>
                        <h3>허형서</h3>
                        <p>Backend</p>
                    </div>
                    <div className='team-tags'>
                        <p>#Server</p>
                        <p>#DB</p>
                    </div>
                </div>

                <div className='team-card'>
                    <img src={Shim} className='team-img' style={{width: '197px', height: '200px'}} alt='심소은'></img>
                    <div className='team-card-text'>
                        <h3>심소은</h3>
                        <p>Frontend</p>
                    </div>
                    <div className='team-tags'>
                        <p>#Component</p>
                        <p>#Hospital</p>
                        <p>#Medicine</p>
                        <p>#Firstaid</p>
                    </div>
                </div>

                <div className='team-card'>
                    <img src={Hong} className='team-img' style={{width: '171px', height: '192px'}} alt='홍승환'></img>
                    <div className='team-card-text'>
                        <h3>홍승환</h3>
                        <p>Frontend</p>
                    </div>
                    <div className='team-tags'>
                        <p>#Figma Design</p>
                        <p>#Shelter</p>
                    </div>
                </div>
            </div>

        </section>
        <section className="emergency-contacts">
            <div className="emergency-contacts-contents">
                <h2 className="emergency-contacts-texts">긴급 연락처</h2>
                <p className="emergency-contacts-titles">재난 상황별 구급 번호</p>
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
