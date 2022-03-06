import React from 'react'
import { useNavigate } from 'react-router-dom'
import RotasProponente from '../../../routes/RotasProponente';
import Nav from '../../../modulos/proponente/nav/NavProponente';

import classes from './LayoutProponente.module.css'

const LayoutProponente = () => {

   const navi = useNavigate()

    return ( 
        <main className={classes.main}>
           <Nav />
           <RotasProponente />
        </main>
     );
}
 
export default LayoutProponente;