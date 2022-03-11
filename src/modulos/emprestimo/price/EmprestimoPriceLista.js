import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertToReal } from '../../../util/util'
import EmprestimoPriceListaPDF from './EmprestimoPriceListaPDF'
import Button from '../../../components/Button'
import { isMobile } from '../../../util/util'

import EmprestimoPriceListaMob from './EmprestimoPriceListaMob'

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
                <div className='emprestimo__tabela-valor'>{item.desembolso}</div>
                <div className='emprestimo__tabela-valor'>{item.amortizacao}</div>
                <div className='emprestimo__tabela-valor'>{item.saldo}</div>

            </li>
        </div>
    )
}

const Parametros = props => {

    const { formData, totalDesembolso } = props
    const desembolsoEditado = convertToReal(totalDesembolso)

    const abc = [
        {
            title: 'Valor do empréstimo:', value: convertToReal(formData.valorEmprestimo),
            title2: 'Carência (em meses):', value2: formData.carencia
        },
        {
            title: 'Caução (Percentual):', value: convertToReal(formData.caucaoPerc),
            title2: 'Caução (Valor):', value2: formData.caucaoValor
        },
        {
            title: 'Qtde meses (Aporte):', value: formData.aporteMeses,
            title2: 'Aporte Mensal:', value2: convertToReal(formData.aporteValor)
        },
        {
            title: 'Qtde meses (Desembolso):', value: formData.desembolsoMeses,
            title2: 'Desembolso Mensal:', value2: formData.desembolsoValorx
        },
        {
            title: 'Taxa Juros (% a.a.):', value: convertToReal(formData.taxaJurosAA),
            title2: 'Taxa Juros (% a.m.):', value2: formData.taxaJurosAMx
        },
        {
            title: 'Comissão (1) - Perc:', value: convertToReal(formData.comissao1Perc),
            title2: 'Comissão (1) - Valor:', value2: formData.comissao1Valor
        },
        {
            title: 'Comissão (2) - Perc:', value: convertToReal(formData.comissao2Perc),
            title2: 'Comissão (2) - Valor:', value2: formData.comissao2Valor
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


const EmprestimoPriceLista = props => {

    const [lista, setLista] = useState([])

    const location = useLocation()

    const formData = location.state.formData || {}
    const listaPDF = location.state.listaPDF || []
    const totalDesembolso = location.state.totalDesembolso || 0

    let cont = 0
    let classe

    if (isMobile()) {
        return <EmprestimoPriceListaMob />
    }

    return (
        <div className='emprestimo__centralizar-lista'>
            <div className='emprestimo__lista'>
                <div className='emprestimo__header hide-component'>
                    <div className='center'>
                        <Button
                            className='w200'
                            title='Gerar PDF'
                            onClick={() => EmprestimoPriceListaPDF(formData, listaPDF, totalDesembolso)}
                        />
                    </div>

                    <div className='center'>
                        <Button
                            className='w200'
                            title='Imprimir'
                            onClick={() => window.print()}
                        />
                    </div>
                </div>
                <h2 style={{ color: 'black', textAlign: 'center' }}>Simulação - Price</h2>
                <Parametros formData={formData} totalDesembolso={totalDesembolso} />
                <ul className='emprestimo__container-tabela'>
                    <li key={-1} className='emprestimo__tabela-linha'>
                        <div className='emprestimo__tabela-indice' style={{ fontWeight: 'bold' }}>Mês</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Aporte</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Juros</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Desembolso</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Amortização</div>
                        <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Saldo</div>

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

export default EmprestimoPriceLista;