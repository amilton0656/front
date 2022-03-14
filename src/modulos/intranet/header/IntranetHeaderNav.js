import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

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

    const navigate = useNavigate()

    return (
        <ul className='intra-nav__dropdown'>
            <li className='intra-nav__dropdown-item'>
                <span href="#" className='intra-nav__dropdown-link'>Empreendimentos</span>
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
                <Link className='intra-nav__dropdown-link' to ='/erp'>Sistema</Link>
            </li>
        </ul>

    )
}

export default IntranetHeaderNav
