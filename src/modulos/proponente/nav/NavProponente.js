import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './NavProponente.module.css'

import DropdownProponente from './DropdownProponente'
import { NavProponenteItems } from './NavProponenteItems';

const NavProponente = props => {

    const [show, setShow] = useState(false)

    return (
        <>
            <header className={classes.container}>
                <div className={classes.logo}>
                    Front
                </div>
                <ul className={classes.items}>
                    {NavProponenteItems.map((item, index) => {
                        return (
                            <li key={index} className={classes.item}>
                                <Link
                                    className={classes['menu-link']}
                                    to={item.path}
                                    onClick={() => setShow(false)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                    {/* <li className={classes.item}>
                        <NavLink to="/proponente/formdados" replace={true}>Dados</NavLink>
                    </li>
                    <li className={classes.item}>
                        <NavLink to="/proponente/formdados" replace={true}>Contatos</NavLink>
                    </li>
                    <li className={classes.item}>
                        <NavLink to="/proponente/formcomplemento" replace={true}>Complemento</NavLink>
                    </li>
                    <li className={classes.item}>
                        <NavLink to="/usuario/lista" replace={true}>Lista</NavLink>
                    </li>
                    <li className={classes.item}>
                        <NavLink to="/" replace={true}>Sair</NavLink>
                    </li> */}
                </ul>
                <div className={classes["toggle-button"]}>
                    <button onClick={() => setShow(!show)}>
                        <span className={classes["toggle-button__bar"]}></span>
                        <span className={classes["toggle-button__bar"]}></span>
                        <span className={classes["toggle-button__bar"]}></span>
                    </button>
                </div>

            </header>
            {1 && <DropdownProponente show={show} setShow={setShow} />}

        </>
    )
}

export default NavProponente