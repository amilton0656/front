import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertToReal } from '../../../util/util'
import EmprestimoSACListaPDF from './EmprestimoSACListaPDF'
import Button from '../../../components/Button'


import '../emprestimo.css'

const ref = React.createRef()


const ItemLinha = props => {

    const { item } = props




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

    const abc = [
        { title: 'Valor do empréstimo:', value: convertToReal(formData.valorEmprestimo) },
        { title: 'Carência (em meses):', value: formData.carencia },
        { title: 'Caução (Percentual):', value: convertToReal(formData.caucaoPerc) },
        { title: 'Caução (Valor):', value: convertToReal(formData.caucaoValor) },
        { title: 'Qtde meses (Aporte):', value: formData.aporteMeses },
        { title: 'Aporte Mensal:', value: convertToReal(formData.aporteValor) },
        { title: 'Qtde meses (Amort):', value: formData.amortizacaoMeses },
        { title: 'Amortização Mensal:', value: convertToReal(formData.amortizacaoValor) },
        { title: 'Taxa Juros (% a.a.):', value: convertToReal(formData.taxaJurosAA) },
        { title: 'Taxa Juros (% a.m.):', value: convertToReal(formData.taxaJurosAM) },
        { title: 'Comissão (1) - Perc:', value: convertToReal(formData.comissao1Perc) },
        { title: 'Comissão (1) - Valor:', value: convertToReal(formData.comissao1Valor) },
        { title: 'Comissão (2) - Perc:', value: convertToReal(formData.comissao2Perc) },
        { title: 'Comissão (2) - Valor:', value: convertToReal(formData.comissao2Valor) },
        { title: 'Total do desembolso::', value: convertToReal(totalDesembolso) },
    ]

    return (
        <div>
            {
                abc.map(linha => (
                    <div className='emprestimo__paramsLinha-mob'>
                        <div className='emprestimo__paramsItems-mob'>
                            <div className='emprestimo__paramsItemTitle'>{linha.title}</div>
                            <div className='emprestimo__paramsItemValue' style={{ textAlign: 'right' }}>{linha.value}</div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

const Lista = props => {
    return (
<ul className='emprestimo__container-tabela wrapper'>
                <li key={-1} className='emprestimo__tabela-linha'>
                    <div className='emprestimo__tabela-indice' style={{ fontWeight: 'bold' }}>Mês</div>
                    <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Aporte</div>
                    <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Juros</div>
                    <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Amortização</div>
                    <div className='emprestimo__tabela-valor' style={{ fontWeight: 'bold' }}>Desembolso</div>
                    <div className='emprestimo__tabela-valor ' style={{ fontWeight: 'bold', width: '20%' }}>Saldo</div>

                </li>
                {props.listaPDF.map(item => {
                    return (
                        <ItemLinha item={item} />
                    )
                }
                )}
            </ul>
    )
}


const EmprestimoSACListaMob = props => {

    const [lista, setLista] = useState([])

    const location = useLocation()

    const formData = location.state.formData || {}
    const listaPDF = location.state.listaPDF || []
    const totalDesembolso = location.state.totalDesembolso || 0

    let cont = 0
    let classe

    return (
        <>
        
        <div className='emprestimo__centralizar-lista-mob'>
            <div className='emprestimo__header-mob'>
                <div className='emprestimo__header emprestimo__header-mob'>

                    <Button>
                        <button
                            className='form-botaoBox__button w100'
                            type="button"
                            onClick={() => EmprestimoSACListaPDF(formData, listaPDF, totalDesembolso)}
                        >Gerar PDF</button>
                    </Button>

                    <Button>
                        <button
                            className='form-botaoBox__button w100'
                            type="button"
                            onClick={() => window.print()}
                        >Imprimir</button>
                    </Button>

                </div>

                <h2 style={{ color: 'black', textAlign: 'center' }}>Simulação - SAC - mob</h2>

                <Parametros formData={formData} totalDesembolso={totalDesembolso} />
            </div>
                </div>

                <Lista listaPDF={listaPDF} />

            {/* <ul className='emprestimo__container-tabela'>
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
            </ul> */}

        </>
    );
}

export default EmprestimoSACListaMob;