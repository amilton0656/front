import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './IntranetDropdown.css'

import {
  menuEmpreendimentos,
  menuAdministrativo,
  menuBancos,
  menuNoticias,
  menuOrgaos,
  menuUteis,
  IntranetDropdownItems
} from './IntranetMenuItems';


const SubMenu = (props) => {
    return props.lista.map((item, index) => 
        <li key = {index} className='intra-mob-menu__subitem'>
          <a href={item.link} target="_blank">{item.nome}</a>
        </li>
      )
}

const IntranetDropdown = props => {

  const [showItem, setShowItem] = useState(0)


  const classe = props.show ? 'intra-mob-menu__show' : 'intra-mob-menu__hidden'

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const clickItemHandle = (item) => {

    if (item === showItem) {
      setShowItem(0)
    } else {
      setShowItem(item)
    }

  }

  return (
    <>
      <ul
        onClick={handleClick}
        className={props.show ? 'intra-mob-menu__show' : 'intra-mob-menu__hidden'}
      >
        {IntranetDropdownItems.map((item) => {
          return (
            <li key={item.idItem} className='intra-mob-menu__item'>
              <ul style = {{paddingLeft: '5px'}} onClick={() => clickItemHandle(item.idItem)}>{item.title}
              { item.idItem === 1 && showItem === 1 && <SubMenu lista = {menuEmpreendimentos} /> }
              { item.idItem === 2 && showItem === 2 && <SubMenu lista = {menuAdministrativo} /> }
              { item.idItem === 3 && showItem === 3 && <SubMenu lista = {menuNoticias} /> }
              { item.idItem === 4 && showItem === 4 && <SubMenu lista = {menuBancos} /> }
              { item.idItem === 5 && showItem === 5 && <SubMenu lista = {menuOrgaos} /> }
              { item.idItem === 6 && showItem === 6 && <SubMenu lista = {menuUteis} /> }
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default IntranetDropdown;