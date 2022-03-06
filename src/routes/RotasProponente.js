import { Routes, Route } from 'react-router-dom'

// import UsuarioCad from '../modulos/proponente/dados/ProponenteCadDados';
import PessoaLista from '../modulos/pessoa/lista/PessoaLista';

import PessoaCadDados from '../modulos/pessoa/dados/PessoaCadDados';
import PessoaCadComplemento from '../modulos/pessoa/comlemento/PessoaCadComplemento';

const RotasProponente = () => {
    return ( 
        <Routes>
            <Route path ="/pessoa/lista" element = {<PessoaLista />} default/>
            <Route path ="/pessoa/formdados" element = {<PessoaCadDados />} />
            <Route path ="/pessoa/formcomplemento" element = {<PessoaCadComplemento />}
             />
        </Routes>
     );
}
 
export default RotasProponente