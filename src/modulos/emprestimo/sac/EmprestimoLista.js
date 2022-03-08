import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertToReal } from '../../../util/util'
import EmprestimoSACListaPDF from './EmprestimoSACListaPDF'


import '../emprestimo.css'

const ref = React.createRef()


const ItemLinha = props => {

    const { item } = props

    // const classe = item.mes === 250 ? classes2.newPage : ''


    return (
        <div>
            <li key={props.item.mes} className='emprestimo__tabela-linha'>
                <div className='emprestimo__tabela-indice'>{item.mes}</div>
                <div className='emprestimo__tabela-valor'>{item.aporte}</div>
                <div className='emprestimo__tabela-valor'>{item.juros}</div>
                <div className='emprestimo__tabela-valor'>{item.amortizacao}</div>
                <div className='emprestimo__tabela-valor'>{item.desembolso}</div>
                <div className='emprestimo__tabela-valor' style={{ width: '20%' }}>{item.saldo}</div>
            </li>
        </div>
    )
}

const Parametros = props => {

    const { formData, totalDesembolso } = props
    const desembolsoEditado = convertToReal(totalDesembolso)  
    

    const linhaTipo = props.tipo === 'sac' 
        ?   {
            title: 'Qtde meses (Amort):', value: formData.amortizacaoMeses,
            title2: 'Amortização Mensal:', value2: convertToReal(formData.amortizacaoValor)
            }
        :   {
            title: 'Qtde meses (Desembolso):', value: formData.desembolsoMeses,
            title2: 'Desembolso Mensal:', value2: convertToReal(formData.desembolsoValor)
            }
         

    const abc = [
        {
            title: 'Valor do empréstimo:', value: convertToReal(formData.valorEmprestimo),
            title2: 'Carência (em meses):', value2: formData.carencia
        },
        {
            title: 'Caução (Percentual):', value: convertToReal(formData.caucaoPerc),
            title2: 'Caução (Valor):', value2: convertToReal(formData.caucaoValor)
        },
        {
            title: 'Qtde meses (Aporte):', value: formData.aporteMeses,
            title2: 'Aporte Mensal:', value2: convertToReal(formData.aporteValor)
        },

        linhaTipo,

        {
            title: 'Taxa Juros (% a.a.):', value: convertToReal(formData.taxaJurosAA),
            title2: 'Taxa Juros (% a.m.):', value2: convertToReal(formData.taxaJurosAM)
        },
        {
            title: 'Comissão (1) - Perc:', value: convertToReal(formData.comissao1Perc),
            title2: 'Comissão (1) - Valor:', value2: convertToReal(formData.comissao1Valor)
        },
        {
            title: 'Comissão (2) - Perc:', value: convertToReal(formData.comissao2Perc),
            title2: 'Comissão (2) - Valor:', value2: convertToReal(formData.comissao2Valor)
        },
    ]

    return (
        <div>
            {
                abc.map(linha => (
                    <div className='emprestimo__paramsLinha'>
                        <div className='emprestimo__paramsItems'>
                            <div className='emprestimo__paramsItemTitle'>{linha.title}</div>
                            <div className='emprestimo__paramsItemValue' style={{ textAlign: 'right' }}>{linha.value}</div>
                        </div>
                        <div style ={{width: '20%'}}></div>
                        <div className='emprestimo__paramsItems'>
                            <div className='emprestimo__paramsItemTitle'>{linha.title2}</div>
                            <div className='emprestimo__paramsItemValue' style={{ textAlign: 'right' }}>{linha.value2}</div>
                        </div>
                    </div>
                ))
            }
            <div className='emprestimo__paramsItems'>
                <div className='emprestimo__paramsItemTitle'>Total do desembolso:</div>
                <div className='emprestimo__paramsItemValue' style={{ textAlign: 'right' }}>{desembolsoEditado}</div>
            </div>
        </div>
    )
}


const EmprestimoLista = props => {

    const [lista, setLista] = useState([])

    const location = useLocation()

    const formData = location.state.formData || {}
    const listaPDF = location.state.listaPDF || []
    const totalDesembolso = location.state.totalDesembolso || 0
    const tipo = location.state.tipo || 'sac'

    let cont = 0
    let classe

    return (
        <div className='emprestimo__centralizar-lista'>
            <div className='emprestimo__lista'>
                <div className='emprestimo__header'>
                <div className='form-botaoBox'>
                    <button
                        className='form-botaoBox__button w150'
                        type="button"
                        onClick={() => EmprestimoSACListaPDF(formData, listaPDF, totalDesembolso)}
                    >Gerar PDF</button>
                </div>
                <div className='form-botaoBox'>
                    <button
                        className='form-botaoBox__button w150'
                        type="button"
                        onClick={() => window.print()}
                    >Imprimir</button>
                </div>

                </div>

                <h2 style={{ color: 'black', textAlign: 'center' }}>Simulação0 - {tipo === 'sac' ? 'SAC' : 'Price'}</h2>
               
                <Parametros formData={formData} totalDesembolso={totalDesembolso} tipo ={tipo} />
                <ul className='emprestimo__container-tabela'>
                    <li key={-1} className='emprestimo__tabela-linha'>
                        <div className='emprestimo__tabela-indice' style={{ fontWeight: 'bold' }}>Mês</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Aporte</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Juros</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Amortização</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Desembolso</div>
                        <div className='emprestimo__tabela-valor ' style={{ fontWeight: 'bold', width: '20%' }}>Saldo</div>

                    </li>
                    {listaPDF.map(item => {
                        return (
                            <ItemLinha item={item} />
                        )
                    }
                    )}
                </ul>
            </div>

        </div>
    );
}

export default EmprestimoLista;