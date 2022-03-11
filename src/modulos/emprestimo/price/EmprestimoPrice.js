import React, { useEffect, useState } from 'react'
import { convertToReal } from '../../../util/util'
import { useNavigate } from 'react-router-dom'

import InputNumber from '../../../components/InputNumber'
import Input from '../../../components/Input'
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
            caucaoValor: convertToReal(caucaoValor),
            aporteValor: aporteValor,
            aporteValorx: convertToReal(aporteValor),
            desembolsoValor,
            desembolsoValorx: convertToReal(desembolsoValor),
            taxaJurosAM: taxaJurosAM,
            taxaJurosAMx: Math.round(taxaJurosAM * 1000000) / 1000000,
            comissao1Valor: convertToReal(comissao1Valor),
            comissao2Valor: convertToReal(comissao2Valor),
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
            <Form className='main-emprestimo__form'>

                <div className='sideByside'>

                    {/* Valor do empréstimo */}
                    <InputNumber
                        label='Valor do empréstimo:'
                        formData={formData}
                        setFormData={setFormData}
                        className='w150'
                        id="valorEmprestimo"
                        name="valorEmprestimo"
                        value={formData.valorEmprestimo}
                    />

                    {/* Carência (em meses) */}
                    <Input
                        label='Carência (em meses):'
                        type='number'
                        id='carencia'
                        name='carencia'
                        value={formData.carencia}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />

                </div>

                <div className='sideByside'>
                    {/* Caução (Percentual) */}
                    <InputNumber
                        label='Caução (Percentual):'
                        formData={formData}
                        setFormData={setFormData}
                        className='w150'
                        id="caucaoPerc"
                        name="caucaoPerc"
                        value={formData.caucaoPerc}
                    />

                    {/* Caução (Valor) */}

                    <Input
                        disabled='disabled'
                        label='Caução (Valor):'
                        type='text'
                        id='caucaoValor'
                        name='caucaoValor'
                        value={formData.caucaoValor}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />
                </div>

                <div className='sideByside'>

                    {/* Aporte (em meses) */}
                    <Input
                        label='Qtde meses (Aporte):'
                        type='number'
                        id='aporteMeses'
                        name='aporteMeses'
                        value={formData.aporteMeses}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />

                    {/* Aporte Mensal */}
                    <Input
                        disabled='disabled'
                        label='Aporte Mensal:'
                        type='text'
                        id='aporteValor'
                        name='aporteValor'
                        value={formData.aporteValorx}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />

                </div>

                <div className='sideByside'>

                    {/* Quantidade de meses (Desembolso) : */}
                    <Input
                        label='Qtde meses (Des):'
                        type='number'
                        id='desembolsoMeses'
                        name='desembolsoMeses'
                        value={formData.desembolsoMeses}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />

                    {/* Desembolso Mensal */}
                    <Input
                        disabled='disabled'
                        label='Desembolso Mensal:'
                        type='text'
                        id='desembolsoValor'
                        name='desembolsoValor'
                        value={formData.desembolsoValorx}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />
                </div>

                <div className='sideByside'>

                    {/* Taxa de Juros (  % a.a. ) */}
                    <InputNumber
                        label='Taxa Juros (% a.a.):'
                        formData={formData}
                        setFormData={setFormData}
                        className='w150'
                        id="taxaJurosAA"
                        name="taxaJurosAA"
                        value={formData.taxaJurosAA}
                    />

                    {/* Taxa de Juros (  % a.m. ) */}
                    <Input
                        disabled='disabled'
                        label='Taxa Juros (% a.m.):'
                        type='text'
                        id='taxaJurosAM'
                        name='taxaJurosAM'
                        value={formData.taxaJurosAM}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />

                </div>

                <div className='sideByside'>

                    {/* Comissão (1) - Percentual */}
                    <InputNumber
                        label='Comissão (1) - Perc:'
                        formData={formData}
                        setFormData={setFormData}
                        className='w150'
                        id="comissao1Perc"
                        name="comissao1Perc"
                        value={formData.comissao1Perc}
                    />

                    {/* Comissão (1) - Valor */}
                    <Input
                        disabled='disabled'
                        label='Comissão (1) - Valor:'
                        type='text'
                        id='comissao1Valor'
                        name='comissao1Valor'
                        value={formData.comissao1Valor}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />
                </div>

                <div className='sideByside'>

                    {/* Comissão (2) - Percentual */}
                    <InputNumber
                        label='Comissão (2) - Perc:'
                        formData={formData}
                        setFormData={setFormData}
                        className='w150'
                        id="comissao2Perc"
                        name="comissao2Perc"
                        value={formData.comissao2Perc}
                    />

                    {/* Comissão (2) - Valor */}
                    <Input
                        disabled='disabled'
                        label='Comissão (2) - Valor:'
                        type='text'
                        id='comissao2Valor'
                        name='comissao2Valor'
                        value={formData.comissao2Valor}
                        onChange={textHandler}
                        className='w150'
                        step={1}
                    />
                </div>

                <div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
                    <Button
                        className='w150'
                        title='Calcular'
                        onClick={calcularHandle}
                    />
                </div>

            </Form>

            {/* <div>
                {
                    lista.length > 0 &&
                    <EmprestimoSACLista formData={formData} />

                }
            </div> */}


        </main >
    );
}

export default EmprestimoPrice;