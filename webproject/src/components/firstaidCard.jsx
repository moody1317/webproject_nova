import './firstaidCard.css';

function FirstaidCard({ num, title, description, stepIcon, isOpen }) {
    return (
        <>
            <section className={`step-card ${isOpen ? 'open' : ''}`}>
                <div className='step-head'>
                    <div className='step-head-left'>
                        <div className='step-num'>
                            <h1>{ num }</h1>
                        </div>
                        <div className='step-title'>
                            <h3>{ title }</h3>
                        </div>
                    </div>
                    <div className='step-icon'>
                        <i className={ stepIcon }></i>
                    </div>
                </div>
                <div className='step-main'>
                    <p>{ description }</p>
                </div>
                <hr className='step-border' />
            </section>
        </>
    )
}

export default FirstaidCard;
