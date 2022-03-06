import { Routes, Route } from 'react-router-dom'

import LayoutGeral from '../layout/LayoutInicial';
import LayoutUsuario from '../usuario/LayoutUsuario';
import LayoutInicial from '../layout/LayoutInicial';

const RotasLayout = () => {
    return ( 
        <Routes>
            <Route path ="/" element = {<LayoutGeral />} />
            <Route path ="/usuario" element = {<LayoutUsuario />} />

        </Routes>
     );
}
 
export default RotasLayout