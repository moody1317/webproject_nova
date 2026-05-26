import FirstaidCard from './firstaidCard';
import './firstaidContent.css';

function FirstaidContent({ selectedIndex, selectedData, isOpen }) {
    const stepsList = selectedData?.steps?.map((item, index) =>
        <FirstaidCard
            num = { item.number }
            title = { item.title }
            stepIcon = { item.stepIcon }
            description = { item.content }
            isOpen = { isOpen }
            key = { index }
        />
    );
    
    return (
        <>
            <section className='firstaid-content'>
                <h1>{ selectedData?.name }</h1>
                <p className='firstaid-explan'>설명 글</p>
                <hr/>
                <div className={isOpen ? 'firstaid-grid grid-open' : 'firstaid-grid'}>
                    { stepsList }
                </div>
                <div className={isOpen ? 'warn-box closed' :'warn-box'}>
                    <h3 className='warn-h3'><i className='bi bi-exclamation-triangle-fill'></i> 주의사항</h3>
                    <p className='box-p'>{ selectedData?.warning }</p>
                </div>
                <div className={isOpen ? 'link-box closed' :'link-box'}>
                    <div className='link-icon'>
                        <i className='bi bi-play-fill'></i>
                    </div>
                    <a href={ selectedData?.videoUrl } target='_blank' className='box-p'>관련 영상 보기(링크)</a>
                </div>
            </section>
        </>
    )
}

export default FirstaidContent;