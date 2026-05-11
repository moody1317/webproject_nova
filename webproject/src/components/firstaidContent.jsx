import firstaid from '../data/firstaidData';
import './firstaidContent.css';

function FirstaidContent({ selectedIndex }) {
    
    return (
        <>
            <section className='firstaid-content'>
                <h1>{ firstaid[selectedIndex].name }</h1>
            </section>
        </>
    )
}

export default FirstaidContent;