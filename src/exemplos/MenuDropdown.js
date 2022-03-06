
import React, { useState } from 'react'

import './MenuDropdown.css'


const MenuDropdown = () => {

    const [show, setShow] = useState(false)

    return (
        <div>
            <ul className='c-dropdown'>
                <li className='c-dropdown__item'>
                    <a href="#" className='c-dropdown__link'>Início</a>
                </li>

                <li className='c-dropdown__item'>
                    <span href="#" className='c-dropdown__link'>Empreendimentos</span>
                    <ul className='c-dropdown__submenu'>
                        <li className='c-dropdown__submenu-item'>
                            <a href="#" className='c-dropdown__submenu-link'>America Officenter</a>
                        </li>
                        <li className='c-dropdown__submenu-item'>
                            <a href="#" className='c-dropdown__submenu-link'>Bliss Living</a>
                        </li>
                        <li className='c-dropdown__submenu-item'>
                            <a href="#" className='c-dropdown__submenu-link'>City Office Square</a>
                        </li>
                    </ul>
                </li>

                <li className='c-dropdown__item'>
                    <span href="#" className='c-dropdown__link'>Notícias</span>
                </li>
            </ul>
        </div>
    );
}

export default MenuDropdown;