import './firstaidCard.css';

function FirstaidCard({ num, title, description }) {
    return (
        <>
            <section className='step-card'>
                <div className='step-head'>
                    <div className='step-num'>
                        <h1>{ num }</h1>
                    </div>
                    <div className='step-title'>
                        <h3>{ title }</h3>
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
