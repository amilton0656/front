// import classes from './LayoutInicial.module.css'

import { Link } from 'react-router-dom'

import Card from '../../components/Card'

import './erpLayout.css'


const ErpLayout = () => {

    return ( 
        <main className='erp-main'>
            <div className='erp-card'>
                <Link className='erp-link' to='/pessoa/lista'>Proponente</Link>
            </div>
            <div className='erp-card'>
                <Link className='erp-link' to='/emprestimosac'>Simulação SAC</Link>
            </div>
            <div className='erp-card'>
                <Link className='erp-link' to='/emprestimoprice'>Simulação Price</Link>
            </div>

            <div className='erp-card'>
                <Link className='erp-link' to='/teste'>Teste</Link>
            </div>
        </main>
     );
}
 
export default ErpLayout;