import React, { useEffect, useState } from 'react'
import { convertToReal } from '../../../util/util'
import { useNavigate } from 'react-router-dom'

import InputNumber from '../../../components/InputNumber'
import EmprestimoSACLista from '../sac/EmprestimoSACLista'
import Form from '../../../components/Form'
import Button from '../../../components/Button'

import '../emprestimo.css'


const initialState = {
    valorEmprestimo: null,
    carencia: '2',
    caucaoPerc: null,
    caucaoValor: null,
    aporteMeses: 1,
    aporteValor: null,
    desembolsoMeses: 1,
    desembolsoValor: null,
    taxaJurosAA: null,
    taxaJurosAM: null,
    comissao1Perc: null,
    comissao1Valor: null,
    comissao2Perc: null,
    comissao2Valor: null
}
let difDesembolso = 0

const EmprestimoPrice = () => {

    let initial = initialState

    if (window.innerWidth > 400) {
        const saved = localStorage.getItem("emprestimoPrice")
        initial = JSON.parse(saved) || initialState
    }

    const [formData, setFormData] = useState(initial)
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

        console.log('formData ', formData)

        const caucaoValor = await Math.round((parseFloat(formData.caucaoPerc) * parseFloat(formData.valorEmprestimo) / 100) * 100) / 100
        const aporteValor = await Math.round((parseFloat(formData.valorEmprestimo) / parseFloat(formData.aporteMeses)) * 100) / 100
        const taxaJurosAM = await (((1 + (formData.taxaJurosAA / 100)) ** (1 / 12)) - 1) * 100
        const comissao1Valor = await Math.round((parseFloat(formData.comissao1Perc) * parseFloat(formData.valorEmprestimo) / 100) * 100) / 100
        const comissao2Valor = await Math.round((parseFloat(formData.comissao2Perc) * parseFloat(formData.valorEmprestimo) / 100) * 100) / 100

        let desembolsoValor = 0
        if (formData.desembolsoMeses) {
            const a = ((1 + (taxaJurosAM / 100)) ** parseInt(formData.desembolsoMeses)) * (taxaJurosAM / 100)
            const b = ((1 + (taxaJurosAM / 100)) ** parseInt(formData.desembolsoMeses)) - 1
            if (b) {
                desembolsoValor = Math.round(parseFloat(formData.valorEmprestimo) * (a / b) * 100) / 100
                difDesembolso = ((parseFloat(formData.valorEmprestimo) * (a / b)) * parseInt(formData.desembolsoMeses)) -
                    (desembolsoValor * parseInt(formData.desembolsoMeses))

                difDesembolso = Math.round(difDesembolso * 100) / 100

            }
        } else {
            desembolsoValor = 0
        }

        setFormData({
            ...formData,
            caucaoValor,
            aporteValor,
            desembolsoValor,
            taxaJurosAM,
            comissao1Valor,
            comissao2Valor
        })

        setMontarLista(true)
    }



    useEffect(async () => {

        if (montarLista) {
            listaPDF = await monta(formData)

            const tipo = 'price'

            const leva = {
                formData,
                listaPDF,
                totalDesembolso,
                tipo
            }

            if (window.innerWidth > 400) {
                localStorage.setItem("emprestimoPrice", JSON.stringify(formData));
            }

            navigate('/emprestimoprice/lista', { state: leva })
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

        const tamanho = await parseInt(formData.aporteMeses) + parseInt(formData.carencia) + parseInt(formData.desembolsoMeses)
        const difAporte = Math.round((parseFloat(formData.valorEmprestimo) - (parseInt(formData.aporteMeses) * parseFloat(formData.aporteValor))) * 100) / 100

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
                juros = Math.round(saldo * (formData.taxaJurosAM / 100) * 100) / 100

                if (mes >= ((parseInt(formData.aporteMeses)) + (parseInt(formData.carencia)))) {
                    desembolso = parseFloat(formData.desembolsoValor)
                } else {
                    desembolso = juros
                }

                if (mes === (tamanho - 1)) {
                    desembolso = desembolso + difDesembolso
                }


                if (mes >= ((parseInt(formData.aporteMeses)) + (parseInt(formData.carencia)))) {
                    amortizacao = parseFloat(formData.desembolsoValor) - juros
                } else {
                    amortizacao = 0
                }

                if (mes <= parseInt(formData.aporteMeses) - 1) {
                    saldo = saldo + parseFloat(formData.aporteValor)
                } else {
                    saldo = saldo - amortizacao
                }

                if (mes === (parseInt(formData.aporteMeses) - 1)) {
                    saldo = saldo + difAporte
                }

                if (mes === (tamanho - 1)) {
                    console.log('acrescentando difdesembolso ', difDesembolso)
                    saldo = saldo + difDesembolso
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
        <main className='main-emprestimo__container'>
            <h2 className='title'>Simulação - Price</h2>
            <Form>

                <div className='sideByside'>

                    {/* Valor do empréstimo */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="valorEmprestimo">Valor do empréstimo:</label>
                        <InputNumber
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="valorEmprestimo"
                            name="valorEmprestimo"
                            value={formData.valorEmprestimo}
                        />
                    </div>

                    {/* Carência (em meses) */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="carencia">Carência (em meses):</label>
                        <input
                            type='number'
                            step="1"
                            className='form-input'
                            id="carencia"
                            name="carencia"
                            onChange={textHandler}
                            value={formData.carencia}
                        />
                    </div>

                </div>

                <div className='sideByside'>
                    {/* Caução (Percentual) */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="caucaoPerc">Caução (Percentual):</label>
                        <InputNumber
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="caucaoPerc"
                            name="caucaoPerc"
                            value={formData.caucaoPerc}
                        />
                    </div>

                    {/* Caução (Valor) */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="caucaoValor">Caução (Valor):</label>
                        <input
                            disabled
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="caucaoValor"
                            name="caucaoValor"
                            value={convertToReal(formData.caucaoValor)}
                        />
                    </div>
                </div>

                <div className='sideByside'>

                    {/* Aporte (em meses) */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="aporteMeses">Qtde meses (Aporte):</label>
                        <input
                            type='number'
                            step="1"
                            className='form-input'
                            id="aporteMeses"
                            name="aporteMeses"
                            onChange={textHandler}
                            value={formData.aporteMeses}
                        />
                    </div>

                    {/* Aporte Mensal */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="aporteValor">Aporte Mensal:</label>
                        <input
                            disabled
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="aporteValor"
                            name="aporteValor"
                            value={convertToReal(formData.aporteValor)}
                        />
                    </div>
                </div>

                <div className='sideByside'>

                    {/* Quantidade de meses (Desembolso) : */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="desembolsoMeses">Qtde meses (Des):</label>
                        <input
                            type='number'
                            step="1"
                            className='form-input'
                            id="desembolsoMeses"
                            name="desembolsoMeses"
                            onChange={textHandler}
                            value={formData.desembolsoMeses}
                        />
                    </div>

                    {/* Desembolso Mensal */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="desembolsoValor">Desembolso Mensal:</label>
                        <input
                            disabled
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="desembolsoValor"
                            name="desembolsoValor"
                            value={convertToReal(formData.desembolsoValor)}
                        />
                    </div>
                </div>

                <div className='sideByside'>

                    {/* Taxa de Juros (  % a.a. ) */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="taxaJurosAA">Taxa Juros (% a.a.):</label>
                        <InputNumber
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="taxaJurosAA"
                            name="taxaJurosAA"
                            value={formData.taxaJurosAA}
                        />
                    </div>

                    {/* Taxa de Juros (  % a.m. ) */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="taxaJurosAM">Taxa Juros (% a.m.):</label>
                        <input
                            disabled
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="taxaJurosAM"
                            name="taxaJurosAM"
                            value={formData.taxaJurosAM}
                        />
                    </div>
                </div>

                <div className='sideByside'>

                    {/* Comissão (1) - Percentual */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="comissao1Perc">Comissão (1) - Perc:</label>
                        <InputNumber
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="comissao1Perc"
                            name="comissao1Perc"
                            value={formData.comissao1Perc}
                        />
                    </div>

                    {/* Comissão (1) - Valor */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="comissao1Valor">Comissão (1) - Valor:</label>
                        <input
                            disabled
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="comissao1Valor"
                            name="comissao1Valor"
                            value={convertToReal(formData.comissao1Valor)}
                        />
                    </div>
                </div>

                <div className='sideByside'>

                    {/* Comissão (2) - Percentual */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="comissao2Perc">Comissão (2) - Perc:</label>
                        <InputNumber
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="comissao2Perc"
                            name="comissao2Perc"
                            value={formData.comissao2Perc}
                        />
                    </div>

                    {/* Comissão (2) - Valor */}
                    <div className='form.inputBox w150'>
                        <label htmlFor="comissao2Valor">Comissão (2) - Valor:</label>
                        <input
                            disabled
                            formData={formData}
                            setFormData={setFormData}
                            className='form-input'
                            id="comissao2Valor"
                            name="comissao2Valor"
                            value={convertToReal(formData.comissao2Valor)}
                        />
                    </div>
                </div>

                <Button style={{width: '200px', marginTop: '30px'}}>
                    <button
                        className='form-botaoBox__button'
                        type="button"
                        onClick={calcularHandle}
                    >Calcular</button>
                </Button>
            </Form>

            {/* <div>
                {
                    lista.length > 0 &&
                    <EmprestimoSACLista formData={formData} />

                }
            </div> */}


        </main>
    );
}

export default EmprestimoPrice;