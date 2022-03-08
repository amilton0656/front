import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import Erp from '../modulos/erp/Erp'
import IntranetLayout from '../modulos/intranet/IntranetLayout'

import EmprestimoSAC from '../modulos/emprestimo/sac/EmprestimoSAC'
import EmprestimoSACLista from '../modulos/emprestimo/sac/EmprestimoSACLista'
import EmprestimoSACListaPDF from '../modulos/emprestimo/sac/EmprestimoSACListaPDF'
import EmprestimoPrice from '../modulos/emprestimo/price/EmprestimoPrice'
import EmprestimoPriceLista from '../modulos/emprestimo/price/EmprestimoPriceLista'
import EmprestimoPriceListaPDF from '../modulos/emprestimo/price/EmprestimoPriceListaPDF'

import EmprestimoLista from '../modulos/emprestimo/sac/EmprestimoLista'

const Rotas = () => {

    const navi = useNavigate()

    useEffect(() => {
        navi('/')
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<IntranetLayout />} />

                <Route path="/erp" element={<Erp />} />

                <Route path="/emprestimosac" element={<EmprestimoSAC />} />
                <Route path="/emprestimosac/lista" element={<EmprestimoLista />} />
                <Route path="/emprestimosac/listapdf" element={<EmprestimoSACListaPDF />} />

                <Route path="/emprestimoprice" element={<EmprestimoPrice />} />
                <Route path="/emprestimoprice/lista" element={<EmprestimoLista />} />
                <Route path="/emprestimoprice/listapdf" element={<EmprestimoPriceListaPDF />} />

            </Routes>

        </>
    );
}

export default Rotas