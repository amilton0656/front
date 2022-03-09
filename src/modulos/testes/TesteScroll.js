import './testeScroll.css'

const TesteScroll = () => {
    return (
        <div className='items-wrapper'>

            <div style ={{
                width: '100px', 
                height: '100px', 
                background: 'lime',
                left: 0,   
            }}>

            </div>

            <div className='items'>
                <div className="item one"></div>
                <div className="item two"></div>
                <div className="item three"></div>
                <div className="item four"></div>
            </div>
        
        </div>

    );
}

export default TesteScroll;