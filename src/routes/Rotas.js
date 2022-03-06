import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import LayoutUsuario from '../modulos/usuario/LayoutUsuario'
import UsuarioCad from '../modulos/usuario/UsuarioCad';
import UsuarioLista from '../modulos/usuario/UsuarioLista';

import LayoutProponente from '../modulos/proponente/layout/LayoutProponente';
import PessoaCadDados from '../modulos/pessoa/dados/PessoaCadDados';
import PessoaCadComplemento from '../modulos/pessoa/comlemento/PessoaCadComplemento';
import PessoaLista from '../modulos/pessoa/lista/PessoaLista';

import LayoutInicial from '../layout/LayoutInicial';

import InputNumber from '../components/InputNumber';

import Documento from '../exemplos/Documento';
import PrintPDF from '../components/PrintPDF';

import EmprestimoSACLista from '../modulos/emprestimo/sac/EmprestimoSACLista';
import EmprestimoPriceLista from '../modulos/emprestimo/price/EmprestimoPriceLista';

import EmprestimoSAC from '../modulos/emprestimo/sac/EmprestimoSAC';
import EmprestimoPrice from '../modulos/emprestimo/price/EmprestimoPrice';

// import TesteImpressao from '../exemplos/TesteImpressao';

import MenuDropdown from '../exemplos/MenuDropdown';
import IntranetLayout from '../modulos/intranet/IntranetLayout'

import Teste from '../modulos/testes/Teste';

const Rotas = () => {

    const navi = useNavigate()

    useEffect(() => {
        navi('/')
    }, [])
    
    return ( 
        <>
        <Routes>
            <Route path ="/usuario" element = {<LayoutUsuario />} />
            <Route path ="/usuario/lista" element = {<UsuarioLista />} default/>
            <Route path ="/usuario/form" element = {<UsuarioCad />} />

            <Route path ="/proponente" element = {<LayoutProponente />} />
            <Route path ="/pessoa/lista" element = {<PessoaLista />} />
            <Route path ="/pessoa/formdados" element = {<PessoaCadDados />} />
            <Route path ="/pessoa/formcomplemento" element = {<PessoaCadComplemento />} />

            <Route path ="/input" element = {<InputNumber />} />

            {/* <Route path ="/teste" element = {<TesteImpressao />}  */}
            <Route path ="/teste" element = {<Documento />} />

            <Route path ="/emprestimosac" element = {<EmprestimoSAC />} />
            <Route path ="/emprestimoprice" element = {<EmprestimoPrice />} />
            <Route path ="/emprestimo/listasac" element = {<EmprestimoSACLista />} />
            <Route path ="/emprestimo/listaprice" element = {<EmprestimoPriceLista />} />
            
            <Route path ="/intranet" element = {<IntranetLayout />} />

            <Route path ="/teste" element = {<Teste />} />

            <Route path ="/" element = {<LayoutInicial />} />



        </Routes>

        </>
     );
}
 
export default Rotas