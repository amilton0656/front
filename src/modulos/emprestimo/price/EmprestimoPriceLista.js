import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertToReal } from '../../../util/util'
import EmprestimoPriceListaPDF from './EmprestimoPriceListaPDF'


import classes2 from '../EmprestimoSAC.module.css'

import '../form.css'
import '../emprestimo.css'

const ref = React.createRef();


const ItemLinha = props => {

    const { item } = props

    const classe = item.mes === 250 ? classes2.newPage : ''


    return (
        <div className={classe}>
            <li key={props.item.mes} className={classes2.linha}>
                <div className={classes2.indice}>{item.mes}</div>
                <div className={classes2.valor}>{item.aporte}</div>
                <div className={classes2.valor}>{item.juros}</div>
                <div className={classes2.valor}>{item.desembolso}</div>
                <div className={classes2.valor}>{item.amortizacao}</div>
                <div className={classes2.valor}>{item.saldo}</div>

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
            title2: 'Caução (Valor):', value2: convertToReal(formData.caucaoValor)
        },
        {
            title: 'Qtde meses (Aporte):', value: formData.aporteMeses,
            title2: 'Aporte Mensal:', value2: convertToReal(formData.aporteValor)
        },
        {
            title: 'Qtde meses (Desembolso):', value: formData.desembolsoMeses,
            title2: 'Desembolso Mensal:', value2: convertToReal(formData.desembolsoValor)
        },
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
                    <div className={classes2.paramsLinha}>
                        <div className={classes2.paramsItems}>
                            <div className={classes2.paramsItemTitle}>{linha.title}</div>
                            <div className={classes2.paramsItemValue} style={{ textAlign: 'right' }}>{linha.value}</div>
                        </div>
                        <div className={classes2.paramsItems}>
                            <div className={classes2.paramsItemTitle}>{linha.title2}</div>
                            <div className={classes2.paramsItemValue} style={{ textAlign: 'right' }}>{linha.value2}</div>
                        </div>
                    </div>
                ))
            }
            <div className={classes2.paramsItems}>
                <div className={classes2.paramsItemTitle}>Total do desembolso:</div>
                <div className={classes2.paramsItemValue} style={{ textAlign: 'right' }}>{desembolsoEditado}</div>
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

    console.log('fo0rmdatarecebgido ', formData)
    console.log('listaPDFcebgido ', listaPDF)

    let cont = 0
    let classe

    return (
        <div className='centralizar-lista'>
            <div className={classes2.lista}>
            <div className='header'>
                    <div className='containerButton hide-component'>
                        <button className='botaoBox-button' type="button" onClick={() => EmprestimoPriceListaPDF(formData, listaPDF)}>Gerar PDF</button>
                    </div>
                    <div className='containerButton hide-component'>
                        <button className='botaoBox-button' type="button" onClick={() => window.print()}>Imprimir</button>
                    </div>
                </div>
                <h2 style={{ color: 'black', textAlign: 'center' }}>Simulação - Price</h2>
                <Parametros formData={formData} totalDesembolso={totalDesembolso} />
                <ul className={classes2.main}>
                    <li key={-1} className={classes2.linha}>
                        <div className={classes2.indice} style={{ fontWeight: 'bold' }}>Mês</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Aporte</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Juros</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Desembolso</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Amortização</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Saldo</div>

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