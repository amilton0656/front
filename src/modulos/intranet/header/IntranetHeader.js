import React, { useState } from 'react'

import './IntranetHeader.css'
import logo from './img/logo-intra.png'
import predio from './img/predios.png'
import { FiMenu } from 'react-icons/fi'
import IntranetHeaderNav from './IntranetHeaderNav'
import IntranetDropdown from './IntranetDropdown'

const style = {
    backgroundImage: `url(${logo})`
}

const IntranetHeader = () => {

    const [show, setShow] = useState(false)

    return (
        <>
        <nav className='intra-header__main' style={{ backgroundImage: `url(${predio})` }}>
            <div>
                <img src={logo} alt="" className="intra-header__logo" />
            </div>
            <nav className='intra-header__nav'>
                <IntranetHeaderNav />
            </nav>
            <div className='intra-header__button-container' onClick={() => setShow(!show)}>

                <button className='intra-header__button'><FiMenu size={40} color='black'/></button>
            </div>

        </nav>

        {
            <IntranetDropdown show={show} setShow={setShow} />
        }
        
        </>
    )
}

export default IntranetHeader