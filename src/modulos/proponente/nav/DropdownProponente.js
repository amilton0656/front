import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './DropdownProponente.module.css'

import { NavProponenteItems } from './NavProponenteItems';

const DropdownProponente = props => {


    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

  
    return (
      <>
        <ul
          onClick={handleClick}
        //   className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        className={props.show ? classes['menu-show'] : classes['menu-hidden']}
        >
          {NavProponenteItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={classes['menu-link']}
                  to={item.path}
                  onClick={() => props.setShow(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
}
 
export default DropdownProponente;