import classes from './LayoutInicial.module.css'

import { Link } from 'react-router-dom'


const LayoutInicial = () => {

    return ( 
        <main className={classes.main}>
            <div className={classes.card}>
                <Link className={classes.link} to='/usuario'>Usuario</Link>
            </div>
            <div className={classes.card}>
                <Link className={classes.link} to='/pessoa/lista'>Proponente</Link>
            </div>
            <div className={classes.card}>
                <Link className={classes.link} to='/intranet'>Intranet</Link>
            </div>
            <div className={classes.card}>
                <Link className={classes.link} to='/teste'>Teste</Link>
            </div>
            <div className={classes.card}>
                <Link className={classes.link} to='/emprestimosac'>Simulação SAC</Link>
            </div>
            <div className={classes.card}>
                <Link className={classes.link} to='/emprestimoprice'>Simulação Price</Link>
            </div>
        </main>
     );
}
 
export default LayoutInicial;