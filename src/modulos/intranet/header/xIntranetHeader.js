import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './IntranetHeader.css'
import logo from './img/logo-intra.png'
import predio from './img/predios.png'
import { FiMenu } from 'react-icons/fi'
import IntranetHeaderNav from './IntranetHeaderNav'
import IntranetDropdown from './IntranetDropdown'
import Card from '../../../components/Card'

import {
    menuEmpreendimentos,
    menuAdministrativo,
    menuBancos,
    menuNoticias,
    menuOrgaos,
    menuUteis,
    IntranetDropdownItems
} from './IntranetMenuItems';

const style = {
    backgroundImage: `url(${logo})`
}



const MenuDropdown = props => {

    const navigate = useNavigate()

    const onClickHandle = (item) => {
        if (item === 7) {
            navigate('/erp')
        }
    }

    return (
        <nav id='intra-header__mob_dropdown' className='intra-header__nav-dropdown-mob'>
            <ul className='intra-header__nav-dropdown-mob-ul'>
                {
                    IntranetDropdownItems.map((item) => (
                        <li key={item.idItem} className='intra-header__nav-dropdown-mob-ul-li' onClick={() => onClickHandle(item.idItem)}>
                            <input id={`ck-${item.dropdown}`} type='checkbox' style={{ display: 'none' }} />
                            <label htmlFor={`ck-${item.dropdown}`} className='intra-header__nav-dropdown-mob-ul-li-label'>{item.title}</label>
                            {item.idItem === 1 && <SubMenuDropdown item={item} lista={menuEmpreendimentos} />}
                            {item.idItem === 2 && <SubMenuDropdown item={item} lista={menuAdministrativo} />}
                            {item.idItem === 3 && <SubMenuDropdown item={item} lista={menuNoticias} />}
                            {item.idItem === 4 && <SubMenuDropdown item={item} lista={menuBancos} />}
                            {item.idItem === 5 && <SubMenuDropdown item={item} lista={menuOrgaos} />}
                            {item.idItem === 6 && <SubMenuDropdown item={item} lista={menuUteis} />}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

const SubMenuDropdown = (props) => {
    return (

        <div id={`ck-${props.item.dropdown}-submenu`} onClick={() => {
            const check = document.getElementById(`ck-${props.item.dropdown}`)
            check.checked = false
        }}>
            <div>
                <div className='intra-header__nav-dropdown-mob-ul-li-label' style={{ height: '50px', padding: '20px' }}>
                    {`<<<   Menu Intranet`}
                </div>
                <div
                    className='intra-header__nav-dropdown-mob-ul-li-label'
                    style={{
                        height: '50px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'lightgreen',
                    }}

                >
                    <span style={{ display: 'block' }}>{props.item.title}</span>
                </div>

            </div>
            <ul className='intra-header__nav-dropdown-mob-ul' style={{ paddinTop: '50px' }}>


                {
                    props.lista.map((item, index) =>
                    (
                        <li key={index} className='ck-Empreendimentos__submenu-ul-li'>
                            <a href={item.link} target="_blank" className='intra-header__nav-dropdown-mob-ul-li-label' style={{ marginLeft: '30px' }}>{item.nome}</a>
                        </li>
                    )
                    )
                }
            </ul>
        </div>

    )

}



const IntranetHeader = () => {

    useEffect(() => {
        var lastScrollTop = 0
        const navbar = document.getElementById('intra-header_navbar')
        window.addEventListener('scroll', () => {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop
            if (scrollTop > lastScrollTop) {
                navbar.style.top = '-80px'
            } else {
                navbar.style.top = '0'
            }
            lastScrollTop = scrollTop
        }
        )

    }, [])

    const onClickButtonHandle = () => {

        const menuButton = document.getElementById('intra-header__nav-input-mob')

        if (!menuButton.checked) {
            IntranetDropdownItems.map((item) => {
                const check = document.getElementById(`ck-${item.dropdown}`)
                check.checked = false

            }
            )

        }

    }

    return (
        <>
        <Card>
            <nav id='intra-header_navbar' className='intra-header__main2'>
                <div>
                    <img src={logo} alt="" className="intra-header__logo2" />
                </div>
                <div style={{ display: 'flex', borderTop: '1px solid grey', borderBottom: '1px solid grey', width: '100%', marginBottom: '10px', background: 'grey'}}>

                    <nav className='intra-header__nav'>
                        <IntranetHeaderNav />
                    </nav>
                    <div className='intra-header__button-container' onClick={() => onClickButtonHandle()}>
                        <input id='intra-header__nav-input-mob' type='checkbox' />
                        <label htmlFor='intra-header__nav-input-mob'><FiMenu id="intra-header__button-menu" size={30} /></label>
                        <MenuDropdown />
                    </div>
                </div>

            </nav>
            </Card>

        </>
    )
}

export default IntranetHeader