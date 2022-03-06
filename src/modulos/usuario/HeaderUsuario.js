import { NavLink } from 'react-router-dom'
import classes from './HeaderUsuario.module.css'


const HeaderUsuario = props => {
    return ( 
        <header className={classes.container}>
        <div className={classes.logo}>
            Front
        </div>
        <ul className={classes.items}>

            <li className={classes.item}>
            <NavLink to="/usuario/form" replace = {true}>Cadastro</NavLink>
            </li>
            <li className={classes.item}>
            <NavLink to="/usuario/lista" replace = {true}>Lista</NavLink>
            </li>
            <li className={classes.item}>
            <NavLink to="/" replace = {true}>Sair</NavLink>
            </li>
        </ul>
    </header>
     )
}
 
export default HeaderUsuario