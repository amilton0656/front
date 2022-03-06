import React from 'react'

import './IntranetHeaderNav.css'

import { 
    menuEmpreendimentos, 
    menuAdministrativo,
    menuBancos,
    menuNoticias,
    menuOrgaos,
    menuUteis
} from './IntranetMenuItems';

const IntranetHeaderNav = () => {

    return (
        <ul className='intra-nav__dropdown'>
            <li className='intra-nav__dropdown-item'>
                <span href="#" className='intra-nav__dropdown-link'>Empreendimento</span>
                <ul className='intra-nav__dropdown-submenu'>
                    {
                        menuEmpreendimentos.map(emp => (
                            <li className='intra-nav__dropdown-submenu-item'>
                                <a href={emp.link} className='intra-nav__dropdown-submenu-link'>{emp.nome}</a>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className='intra-nav__dropdown-item'>
                <span href="#" className='intra-nav__dropdown-link'>Administrativo</span>
                <ul className='intra-nav__dropdown-submenu'>
                    {
                        menuAdministrativo.map(emp => (
                            <li className='intra-nav__dropdown-submenu-item'>
                                <a href={emp.link} className='intra-nav__dropdown-submenu-link'>{emp.nome}</a>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className='intra-nav__dropdown-item'>
                <span href="#" className='intra-nav__dropdown-link'>Notícias</span>
                <ul className='intra-nav__dropdown-submenu'>
                    {
                        menuNoticias.map(emp => (
                            <li className='intra-nav__dropdown-submenu-item'>
                                <a href={emp.link} className='intra-nav__dropdown-submenu-link' target="_blank">{emp.nome}</a>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className='intra-nav__dropdown-item'>
                <span href="#" className='intra-nav__dropdown-link'>Bancos</span>
                <ul className='intra-nav__dropdown-submenu'>
                    {
                        menuBancos.map(emp => (
                            <li className='intra-nav__dropdown-submenu-item'>
                                <a href={emp.link} className='intra-nav__dropdown-submenu-link' target="_blank">{emp.nome}</a>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className='intra-nav__dropdown-item'>
                <span href="#" className='intra-nav__dropdown-link'>Órgãos Públicos</span>
                <ul className='intra-nav__dropdown-submenu'>
                    {
                        menuOrgaos.map(emp => (
                            <li className='intra-nav__dropdown-submenu-item'>
                                <a href={emp.link} className='intra-nav__dropdown-submenu-link' target="_blank">{emp.nome}</a>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className='intra-nav__dropdown-item'>
                <span href="#" className='intra-nav__dropdown-link'>Sites Úteis</span>
                <ul className='intra-nav__dropdown-submenu'>
                    {
                        menuUteis.map(emp => (
                            <li className='intra-nav__dropdown-submenu-item'>
                                <a href={emp.link} className='intra-nav__dropdown-submenu-link' target="_blank">{emp.nome}</a>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className='intra-nav__dropdown-item'>
                <a href="#" className='intra-nav__dropdown-link'>Sistema</a>
            </li>
        </ul>

    )
}

export default IntranetHeaderNav
