import './testeScroll.css'

const TesteScroll = () => {
    return (
        <>

        <div style ={{
            width: '100px', 
            height: '100px', 
            background: 'lime',
            position: 'absolute', 
            left: 0,   
        }}>

        </div>
        <div>
            <div className="wrapper">
                <div className="slide one"></div>
                <div className="slide two"></div>
                <div className="slide three"></div>
                <div className="slide four"></div>
            </div>


        </div>
        </>
    );
}

export default TesteScroll;