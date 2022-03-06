import React, { useEffect, useState } from 'react'
import { convertToReal } from '../../util/util'
import { useLocation, useNavigate } from 'react-router-dom'

import classes from '../pessoa/PessoaCad.module.css'
import classes2 from './EmprestimoSAC.module.css'
import InputNumber from '../../components/InputNumber'
import EmprestimoSACLista from './EmprestimoSACLista'
import EmprestimoSACListaPDF from './EmprestimoSACListaPDF'


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

const EmprestimoSAC = () => {

    // const initialState = {
    //     valorEmprestimo: 123456.12,
    //     carencia: '1',
    //     caucaoPerc: null,
    //     caucaoValor: null,
    //     aporteMeses: null,
    //     aporteValor: null,
    //     amortizacaoMeses: null,
    //     amortizacaoValor: null,
    //     taxaJurosAA: null,
    //     taxaJurosAM: null,
    //     comissao1Perc: null,
    //     comissao1Valor: null,
    //     comissao2Perc: null,
    //     comissao2Valor: null
    // }

    const initialState = {
        valorEmprestimo: 1234567.89,
        carencia: '10',
        caucaoPerc: 30,
        caucaoValor: null,
        aporteMeses: 10,
        aporteValor: null,
        amortizacaoMeses: 12,
        amortizacaoValor: null,
        taxaJurosAA: 24,
        taxaJurosAM: null,
        comissao1Perc: 5,
        comissao1Valor: null,
        comissao2Perc: 2,
        comissao2Valor: null,
        flag: false
    }

    const [formData, setFormData] = useState(initialState)
    const [montarLista, setMontarLista] = useState(false)
    const [lista, setLista] = useState([])

    let listaPDF = []

    const navigate = useNavigate()


    const textHandler = (event) => {

        let dataEntered = event.target.value

        setFormData({
            ...formData,
            [event.target.name]: dataEntered
        })
    }

    const textHandlerI = (value, name) => {

        console.log('event ', value, name)
        // formattedValue: '123.23', value: '123.23', floatValue: 123.23}

        setFormData({
            ...formData,
            [name]: value.value
        })
    }


    const calcularHandle = async () => {

        await setValores()

        const liPDF = await monta(formData)

        console.log('liPDF', liPDF)

        await setLista(await monta(liPDF))

        const leva = {
            formData,
            liPDF
        }

        console.log('leva enviado ', leva)
        // navigate('/emprestimo/lista', { state: leva })

        

        


    }


    const setValores = async () => {

        const caucaoValor = await Math.round((parseFloat(formData.caucaoPerc) * parseFloat(formData.valorEmprestimo) / 100) * 100) / 100
        const aporteValor = await Math.round((parseFloat(formData.valorEmprestimo) / parseFloat(formData.aporteMeses)) * 100) / 100
        const amortizacaoValor = await Math.round((parseFloat(formData.valorEmprestimo) / parseFloat(formData.amortizacaoMeses)) * 100) / 100
        const taxaJurosAM = await (((1 + (formData.taxaJurosAA / 100)) ** (1 / 12)) - 1) * 100
        const comissao1Valor = await Math.round((parseFloat(formData.comissao1Perc) * parseFloat(formData.valorEmprestimo) / 100) * 100) / 100
        const comissao2Valor = await Math.round((parseFloat(formData.comissao2Perc) * parseFloat(formData.valorEmprestimo) / 100) * 100) / 100


        setFormData({
            ...formData,
            caucaoValor,
            aporteValor,
            amortizacaoValor,
            taxaJurosAM,
            comissao1Valor,
            comissao2Valor
        })

        setMontarLista(true)
    }

    useEffect(async () => {
        if (montarLista) {
            const liPDF = await monta(formData)

            // const leva = {
            //     formData,
            //     liPDF
            // }



            // console.log('leva enviado ', leva)



            // setLista(liPDF)
            // setMontarLista(false)
            // navigate('/emprestimo/lista', { state: leva })

            // console.log('listaPDF', listaPDF)
            // EmprestimoSACListaPDF(formData, listaPDF)
        }
    }, [formData, montarLista])

    const monta = async (formData) => {
        let listax = []
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
            listaPDF.push(
                {
                    mes,
                    aporte: convertToReal(aporte),
                    juros: convertToReal(juros),
                    amortizacao: convertToReal(amortizacao),
                    desembolso: convertToReal(desembolso),
                    saldo: convertToReal(saldo)
                }
            )
        }
        return listax

    }

    return (
        <main style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style = {{width: '30%'}}>
                <form className={classes.form}>

                    <div className={classes2.sideByside}>

                        {/* Valor do empréstimo */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="valorEmprestimo">Valor do empréstimo:</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="valorEmprestimo"
                                name="valorEmprestimo"
                                value={formData.valorEmprestimo}
                            />
                        </div>

                        {/* Carência (em meses) */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="carencia">Carência (em meses):</label>
                            <input
                                type='number'
                                step="1"
                                className={classes['login-input']}
                                id="carencia"
                                name="carencia"
                                onChange={textHandler}
                                value={formData.carencia}
                            />
                        </div>

                    </div>

                    <div className={classes2.sideByside}>
                        {/* Caução (Percentual) */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="caucaoPerc">Caução (Percentual):</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="caucaoPerc"
                                name="caucaoPerc"
                                value={formData.caucaoPerc}
                            />
                        </div>

                        {/* Caução (Valor) */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="caucaoValor">Caução (Valor):</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="caucaoValor"
                                name="caucaoValor"
                                value={convertToReal(formData.caucaoValor)}
                            />
                        </div>
                    </div>

                    <div className={classes2.sideByside}>

                        {/* Aporte (em meses) */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="aporteMeses">Qtde meses (Aporte):</label>
                            <input
                                type='number'
                                step="1"
                                className={classes['login-input']}
                                id="aporteMeses"
                                name="aporteMeses"
                                onChange={textHandler}
                                value={formData.aporteMeses}
                            />
                        </div>

                        {/* Aporte Mensal */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="aporteValor">Aporte Mensal:</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="aporteValor"
                                name="aporteValor"
                                value={convertToReal(formData.aporteValor)}
                            />
                        </div>
                    </div>

                    <div className={classes2.sideByside}>

                        {/* Amortização (em meses) */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="amortizacaoMeses">Qtde meses (Amort):</label>
                            <input
                                type='number'
                                step="1"
                                className={classes['login-input']}
                                id="amortizacaoMeses"
                                name="amortizacaoMeses"
                                onChange={textHandler}
                                value={formData.amortizacaoMeses}
                            />
                        </div>

                        {/* Amortização Mensal */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="amortizacaoValor">Amortização Mensal:</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="amortizacaoValor"
                                name="amortizacaoValor"
                                value={convertToReal(formData.amortizacaoValor)}
                            />
                        </div>
                    </div>

                    <div className={classes2.sideByside}>

                        {/* Taxa de Juros (  % a.a. ) */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="taxaJurosAA">Taxa Juros (% a.a.):</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="taxaJurosAA"
                                name="taxaJurosAA"
                                value={formData.taxaJurosAA}
                            />
                        </div>

                        {/* Taxa de Juros (  % a.m. ) */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="taxaJurosAM">Taxa Juros (% a.m.):</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="taxaJurosAM"
                                name="taxaJurosAM"
                                value={formData.taxaJurosAM}
                            />
                        </div>
                    </div>

                    <div className={classes2.sideByside}>

                        {/* Comissão (1) - Percentual */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="comissao1Perc">Comissão (1) - Perc:</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="comissao1Perc"
                                name="comissao1Perc"
                                value={formData.comissao1Perc}
                            />
                        </div>

                        {/* Comissão (1) - Valor */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="comissao1Valor">Comissão (1) - Valor:</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="comissao1Valor"
                                name="comissao1Valor"
                                value={convertToReal(formData.comissao1Valor)}
                            />
                        </div>
                    </div>

                    <div className={classes2.sideByside}>

                        {/* Comissão (2) - Percentual */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="comissao2Perc">Comissão (2) - Perc:</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="comissao2Perc"
                                name="comissao2Perc"
                                value={formData.comissao2Perc}
                            />
                        </div>

                        {/* Comissão (2) - Valor */}
                        <div className={classes.inputBox40}>
                            <label htmlFor="comissao2Valor">Comissão (2) - Valor:</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className={classes['login-input']}
                                id="comissao2Valor"
                                name="comissao2Valor"
                                value={convertToReal(formData.comissao2Valor)}
                            />
                        </div>
                    </div>

                    <div className={classes.botaoBox}>
                        <button className={classes['botaoBox-button']} type="button" onClick={calcularHandle}>Calcular</button>
                    </div>
                </form>

                <div className={classes.botaoBox}>
                        <button className={classes['botaoBox-button']} type="button" onClick={() => EmprestimoSACListaPDF(formData)}>Listapdf</button>
                    </div>
                    <div className={classes.botaoBox}>
                        <button className={classes['botaoBox-button']} type="button" onClick={() => navigate('/emprestimo/lista', { state: {formData, listaPDF}})}>Lista</button>
                    </div>
            </div>
            <div>
                {
                    lista.length > 0 &&
                    <EmprestimoSACLista formData = {formData} />

                }

                {/* <ul className={classes2.main}>
                    {lista.map(item => item)}
                </ul> */}
            </div>


        </main>
    );
}

export default EmprestimoSAC;