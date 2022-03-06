import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PrintPDF from '../../components/PrintPDF'
import { convertToReal } from '../../util/util'


import classes2 from './EmprestimoSAC.module.css'


const ItemLinha = props => {

    return (
        <li key={props.i} className={classes2.linha}>
            <div className={classes2.indice}>{props.mes}</div>
            <div className={classes2.valor}>{convertToReal(props.aporte)}</div>
            <div className={classes2.valor}>{convertToReal(props.juros)}</div>
            <div className={classes2.valor}>{convertToReal(props.amortizacao)}</div>
            <div className={classes2.valor}>{convertToReal(props.desembolso)}</div>
            <div className={classes2.valor}>{convertToReal(props.saldo)}</div>

        </li>
    )
}

const Parametros = props => {

    const { formData } = props

    console.log('formData', formData)

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
            title: 'Qtde meses (Aporte):', value: convertToReal(formData.aporteMeses),
            title2: 'Aporte Mensal:', value2: convertToReal(formData.aporteValor)
        }, 
        {
            title: 'Qtde meses (Amort):', value: convertToReal(formData.amortizacaoMeses),
            title2: 'Amortização Mensal:', value2: convertToReal(formData.amortizacaoValor)
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
                            <div className={classes2.paramsItemValue} style={{textAlign: 'right'}}>{linha.value}</div>
                        </div>
                        <div className={classes2.paramsItems}>
                        <div className={classes2.paramsItemTitle}>{linha.title2}</div>
                            <div className={classes2.paramsItemValue} style={{textAlign: 'right'}}>{linha.value2}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


const EmprestimoSACLista = props => {

    const [lista, setLista] = useState([])
    let listaPDF = []

    const location = useLocation()

    const formData = location.state || props.formData

    const monta = async (formData) => {
        let listax = [];
        listaPDF = []
        let aporte = ''
        let juros = ''
        let amortizacao = ''
        let desembolso = ''
        let saldo = ''

        const tamanho = await parseInt(formData.aporteMeses) + parseInt(formData.carencia) + parseInt(formData.amortizacaoMeses)

        saldo = parseFloat(formData.saldo)

        for (var mes = 0; mes < tamanho; mes++) {

            if (mes <= parseInt(formData.aporteMeses) - 1) {
                aporte = parseFloat(formData.aporteValor)
            } else {
                aporte = null
            }


            if (mes === 0) {
                juros = null
                amortizacao = null
                desembolso = null
                saldo = aporte
            } else {
                juros = Math.round(saldo * (formData.taxaJurosAM / 100)) / 100


                if (mes >= ((parseInt(formData.aporteMeses)) + (parseInt(formData.carencia)))) {
                    amortizacao = parseFloat(formData.amortizacaoValor)
                }

                if (mes >= ((parseInt(formData.aporteMeses)) + (parseInt(formData.carencia)))) {
                    desembolso = juros + amortizacao
                } else {
                    desembolso = juros
                }

                if (mes < parseInt(formData.aporteMeses)) {
                    saldo = saldo + parseFloat(formData.aporteValor) + juros - desembolso
                } else {
                    saldo = saldo + juros - desembolso

                }

            }

            listax.push(
                <ItemLinha
                    mes={mes}
                    aporte={aporte}
                    juros={juros}
                    amortizacao={amortizacao}
                    desembolso={desembolso}
                    saldo={saldo}
                />
            )

            listaPDF.push({
                mes: mes,
                aporte: aporte,
                juros: juros,
                amortizacao: amortizacao,
                desembolso: desembolso,
                saldo: saldo
            }
            )
        }
        return listax

    }

    useEffect(async () => {

        const formData = location.state || props.formData
        const abc = await monta(formData)

        console.log('dentro do lista ', formData)


        console.log('abc', abc)

        setLista(abc)
    }, [])

    useEffect(() => {
        console.log('lista length ', lista.lenght)
    }, [lista])

    console.log('antes do return formdata ', formData)

    let cont = 0
    let classe

    return (
        <PrintPDF title='Título do Documento'>
            <div className={classes2.lista}>
                <h2 style={{color: 'black', textAlign: 'center'}}>Simulação - SAC</h2>
                <Parametros formData={formData} />
                <ul className={classes2.main}>
                    <li key={-1} className={classes2.linha}>
                        <div className={classes2.indice} style={{ fontWeight: 'bold' }}>Mês</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Aporte</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Juros</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Amortização</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Desembolso</div>
                        <div className={classes2.valor} style={{ fontWeight: 'bold' }}>Saldo</div>

                    </li>
                    {lista.map(item => {
                        cont++
                        if (cont === 3) {
                            classe = 'newPage'
                        } else {
                            classe = ''
                        }
                        return (
                            <div>
                                <div>{item}</div>
                            </div>
                            )
                    }
                        )}
                </ul>
            </div>

        </PrintPDF>
    );
}

export default EmprestimoSACLista;