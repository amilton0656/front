import { Routes, Route } from 'react-router-dom'

import UsuarioCad from '../modulos/usuario/UsuarioCad';
import UsuarioLista from '../modulos/usuario/UsuarioLista';

const RotasUsuario = () => {
    return ( 
        <Routes>
            <Route path ="/usuario/lista" element = {<UsuarioLista />} default/>
            <Route path ="/usuario/form" element = {<UsuarioCad />} />
        </Routes>
     );
}
 
export default RotasUsuario