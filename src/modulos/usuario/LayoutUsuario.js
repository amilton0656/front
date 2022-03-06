import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RotasUsuario from '../../routes/RotasUsuario';
import Header from './HeaderUsuario';

import classes from './LayoutUsuario.module.css'

const LayoutUsuario = () => {

   const navi = useNavigate()

   useEffect(() => {
      navi('/usuario/lista')
   }, [])

    return ( 
        <main className={classes.main}>
           <Header />
           <RotasUsuario />
        </main>
     );
}
 
export default LayoutUsuario;