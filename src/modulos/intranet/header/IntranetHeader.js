import React, { useState } from 'react'

import './IntranetHeader.css'
import logo from './img/logo-intra.png'
import predio from './img/predios.png'
import { FiMenu } from 'react-icons/fi'
import IntranetHeaderNav from './IntranetHeaderNav'
import IntranetDropdown from './IntranetDropdown'

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

const onClickHandle = () => {

}


const MenuDropdown = props => {
    return (
        <nav id='intra-header__mob_dropdown' className='intra-header__nav-dropdown-mob'>
            <ul className='intra-header__nav-dropdown-mob-ul'>
                {
                    IntranetDropdownItems.map((item) => (
                        <li key={item.idItem} className='intra-header__nav-dropdown-mob-ul-li'>
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
                    <span style={{display: 'block'}}>{props.item.title}</span>
                </div>

            </div>
            <ul className='intra-header__nav-dropdown-mob-ul' style={{ paddinTop: '50px' }}>


                {
                    props.lista.map((item, index) =>
                    (
                        <li key={index} className='ck-Empreendimentos__submenu-ul-li'>
                            <a href={item.link} target="_blank" className='intra-header__nav-dropdown-mob-ul-li-label' style={{marginLeft: '30px'}}>{item.nome}</a>
                        </li>
                    )
                    )
                }
            </ul>
        </div>



        // <>
        //     <div id={`ck-${props.title}-submenu`} >

        //         <ul>
        //             <div onClick={() => {
        //                 const check = document.getElementById(`ck-${props.title}`)
        //                 check.checked = false
        //             }}>{'<<< voltar'}

        // {
        //     props.lista.map((item, index) =>
        //         (
        //             <li key={index} className='intra-mob-menu__subitem'>
        //                 <a href={item.link} target="_blank">{item.nome}</a>
        //             </li>
        //         )
        //     )
        // }
        //             </div>

        //         </ul>
        //     </div>
        // </>
    )

}


const IntranetHeader = () => {

    const [show, setShow] = useState(false)

    return (
        <>
            <nav className='intra-header__main' style={{ backgroundImage: `url(${predio})`, position: 'relative' }}>
                <div>
                    <img src={logo} alt="" className="intra-header__logo" />
                </div>
                <nav className='intra-header__nav'>
                    <IntranetHeaderNav />
                </nav>
                <div className='intra-header__button-container' onClick={() => setShow(!show)}>
                    <input id='intra-header__nav-input-mob' type='checkbox' />
                    <label htmlFor='intra-header__nav-input-mob'><FiMenu id="intra-header__button-menu" size={30} /></label>
                    <MenuDropdown />
                </div>

            </nav>


            {/* {
            <IntranetDropdown show={show} setShow={setShow} />
        } */}

        </>
    )
}

export default IntranetHeader