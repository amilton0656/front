import React, { useEffect, useState } from 'react'
import { convertToReal } from '../../../util/util'
import { useNavigate } from 'react-router-dom'

import InputNumber from '../../../components/InputNumber'
import EmprestimoSACLista from './EmprestimoSACLista'

import '../form.css'
import '../emprestimo.css'


const initialStateX = {
    valorEmprestimo: null,
    carencia: '2',
    caucaoPerc: null,
    caucaoValor: null,
    aporteMeses: 1,
    aporteValor: null,
    amortizacaoMeses: 1,
    amortizacaoValor: null,
    taxaJurosAA: null,
    taxaJurosAM: null,
    comissao1Perc: null,
    comissao1Valor: null,
    comissao2Perc: null,
    comissao2Valor: null
}

const EmprestimoSAC = () => {


    const saved = localStorage.getItem("emprestimoSAC");
    const initialState = JSON.parse(saved) || initialStateX;

    // const initialState = {
    //     valorEmprestimo: 150000,
    //     carencia: '10',
    //     caucaoPerc: 30,
    //     caucaoValor: null,
    //     aporteMeses: 17,
    //     aporteValor: null,
    //     amortizacaoMeses: 10,
    //     amortizacaoValor: null,
    //     taxaJurosAA: 24,
    //     taxaJurosAM: null,
    //     comissao1Perc: 5,
    //     comissao1Valor: null,
    //     comissao2Perc: 2,
    //     comissao2Valor: null,
    //     flag: false
    // }

    const [formData, setFormData] = useState(initialState)
    const [montarLista, setMontarLista] = useState(false)
    const [montouLista, setMontouLista] = useState(false)
    const [lista, setLista] = useState([])

    let listaPDF = []
    let totalDesembolso = 0

    const navigate = useNavigate()


    const textHandler = (event) => {

        let dataEntered = event.target.value

        setFormData({
            ...formData,
            [event.target.name]: dataEntered
        })
    }

    const textHandlerI = (value, name) => {

        setFormData({
            ...formData,
            [name]: value.value
        })
    }


    const calcularHandle = async () => {

        await setValores()

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
            listaPDF = await monta(formData)

            const leva = {
                formData,
                listaPDF,
                totalDesembolso
            }

            localStorage.setItem("emprestimoSAC", JSON.stringify(formData));

            navigate('/emprestimo/listasac', { state: leva })
        }

    }, [formData, montarLista])


    const monta = async (formData) => {

        let objetoLinha
        let listax = []
        listaPDF = []
        let aporte = ''
        let juros = ''
        let amortizacao = ''
        let desembolso = ''
        let saldo = ''
        totalDesembolso = 0
        

        const tamanho = await parseInt(formData.aporteMeses) + parseInt(formData.carencia) + parseInt(formData.amortizacaoMeses)
        const difAporte = Math.round((parseFloat(formData.valorEmprestimo) - (parseInt(formData.aporteMeses) * parseFloat(formData.aporteValor))) * 100) / 100
        const difAmortizacao = Math.round((parseFloat(formData.valorEmprestimo) - (parseInt(formData.amortizacaoMeses) * parseFloat(formData.amortizacaoValor))) * 100) / 100

        console.log('difAmortizacao', difAmortizacao)
        saldo = parseFloat(formData.saldo)

        for (var mes = 0; mes < tamanho; mes++) {


            if (mes <= parseInt(formData.aporteMeses) - 1) {
                aporte = parseFloat(formData.aporteValor)
                    if (mes === (parseInt(formData.aporteMeses) - 1)) {
                        aporte = aporte + difAporte
                    }
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
                        if (mes === (tamanho - 1)) {
                            amortizacao = amortizacao + difAmortizacao
                        }
                }

                if (mes >= ((parseInt(formData.aporteMeses)) + (parseInt(formData.carencia)))) {
                    desembolso = juros + amortizacao
                } else {
                    desembolso = juros
                }

                if (mes < parseInt(formData.aporteMeses)) {
                    saldo = saldo + parseFloat(formData.aporteValor) + juros - desembolso
                } else {
                    if (mes < (parseInt(formData.aporteMeses) + parseInt(formData.carencia))) {
                        saldo = saldo + juros - desembolso
                    } else {
                        saldo = saldo - amortizacao

                    }

                }

                if (mes === (parseInt(formData.aporteMeses) - 1)) {
                    saldo = saldo + difAporte
                }

                if (mes === (tamanho - 1)) {
                    saldo = saldo + difAmortizacao
                    console.log('tirou do saldo ', difAmortizacao)
                }

            }

            totalDesembolso = totalDesembolso + desembolso

            objetoLinha = {
                mes,
                aporte: convertToReal(aporte),
                juros: convertToReal(juros),
                amortizacao: convertToReal(amortizacao),
                desembolso: convertToReal(desembolso),
                saldo: convertToReal(saldo)
            }

            listaPDF.push(
                objetoLinha
            )
        }
        setMontouLista(true)
        return listaPDF

    }

    return (
        <main className='main-emprestimo'>
            <div className='main-emprestimo__sub'>
                <h2 className='title'>Simulação - SAC</h2>
                <form className='form'>


                <div className='sideByside'>

                        {/* Valor do empréstimo */}
                        <div className='inputBox40'>
                            <label htmlFor="valorEmprestimo">Valor do empréstimo:</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="valorEmprestimo"
                                name="valorEmprestimo"
                                value={formData.valorEmprestimo}
                            />
                        </div>

                        {/* Carência (em meses) */}
                        <div className='inputBox40'>
                            <label htmlFor="carencia">Carência (em meses):</label>
                            <input
                                type='number'
                                step="1"
                                className='login-input'
                                id="carencia"
                                name="carencia"
                                onChange={textHandler}
                                value={formData.carencia}
                            />
                        </div>

                    </div>

                    <div className='sideByside'>
                        {/* Caução (Percentual) */}
                        <div className='inputBox40'>
                            <label htmlFor="caucaoPerc">Caução (Percentual):</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="caucaoPerc"
                                name="caucaoPerc"
                                value={formData.caucaoPerc}
                            />
                        </div>

                        {/* Caução (Valor) */}
                        <div className='inputBox40'>
                            <label htmlFor="caucaoValor">Caução (Valor):</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="caucaoValor"
                                name="caucaoValor"
                                value={convertToReal(formData.caucaoValor)}
                            />
                        </div>
                    </div>

                    <div className='sideByside'>

                        {/* Aporte (em meses) */}
                        <div className='inputBox40'>
                            <label htmlFor="aporteMeses">Qtde meses (Aporte):</label>
                            <input
                                type='number'
                                step="1"
                                className='login-input'
                                id="aporteMeses"
                                name="aporteMeses"
                                onChange={textHandler}
                                value={formData.aporteMeses}
                            />
                        </div>

                        {/* Aporte Mensal */}
                        <div className='inputBox40'>
                            <label htmlFor="aporteValor">Aporte Mensal:</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="aporteValor"
                                name="aporteValor"
                                value={convertToReal(formData.aporteValor)}
                            />
                        </div>
                    </div>

                    <div className='sideByside'>

                        {/* Amortização (em meses) */}
                        <div className='inputBox40'>
                            <label htmlFor="amortizacaoMeses">Qtde meses (Amort):</label>
                            <input
                                type='number'
                                step="1"
                                className='login-input'
                                id="amortizacaoMeses"
                                name="amortizacaoMeses"
                                onChange={textHandler}
                                value={formData.amortizacaoMeses}
                            />
                        </div>

                        {/* Amortização Mensal */}
                        <div className='inputBox40'>
                            <label htmlFor="amortizacaoValor">Amortização Mensal:</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="amortizacaoValor"
                                name="amortizacaoValor"
                                value={convertToReal(formData.amortizacaoValor)}
                            />
                        </div>
                    </div>

                    <div className='sideByside'>

                        {/* Taxa de Juros (  % a.a. ) */}
                        <div className='inputBox40'>
                            <label htmlFor="taxaJurosAA">Taxa Juros (% a.a.):</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="taxaJurosAA"
                                name="taxaJurosAA"
                                value={formData.taxaJurosAA}
                            />
                        </div>

                        {/* Taxa de Juros (  % a.m. ) */}
                        <div className='inputBox40'>
                            <label htmlFor="taxaJurosAM">Taxa Juros (% a.m.):</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="taxaJurosAM"
                                name="taxaJurosAM"
                                value={formData.taxaJurosAM}
                            />
                        </div>
                    </div>

                    <div className='sideByside'>

                        {/* Comissão (1) - Percentual */}
                        <div className='inputBox40'>
                            <label htmlFor="comissao1Perc">Comissão (1) - Perc:</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="comissao1Perc"
                                name="comissao1Perc"
                                value={formData.comissao1Perc}
                            />
                        </div>

                        {/* Comissão (1) - Valor */}
                        <div className='inputBox40'>
                            <label htmlFor="comissao1Valor">Comissão (1) - Valor:</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="comissao1Valor"
                                name="comissao1Valor"
                                value={convertToReal(formData.comissao1Valor)}
                            />
                        </div>
                    </div>

                    <div className='sideByside'>

                        {/* Comissão (2) - Percentual */}
                        <div className='inputBox40'>
                            <label htmlFor="comissao2Perc">Comissão (2) - Perc:</label>
                            <InputNumber
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="comissao2Perc"
                                name="comissao2Perc"
                                value={formData.comissao2Perc}
                            />
                        </div>

                        {/* Comissão (2) - Valor */}
                        <div className='inputBox40'>
                            <label htmlFor="comissao2Valor">Comissão (2) - Valor:</label>
                            <input
                                disabled
                                formData={formData}
                                setFormData={setFormData}
                                className='login-input'
                                id="comissao2Valor"
                                name="comissao2Valor"
                                value={convertToReal(formData.comissao2Valor)}
                            />
                        </div>
                    </div>

                    <div className='botaoBox'>
                        <button className='botaoBox-button' type="button" onClick={calcularHandle}>Calcular</button>
                    </div>
                </form>
            </div>
            <div>
                {
                    lista.length > 0 &&
                    <EmprestimoSACLista formData={formData} />

                }
            </div>


        </main>
    );
}

export default EmprestimoSAC;