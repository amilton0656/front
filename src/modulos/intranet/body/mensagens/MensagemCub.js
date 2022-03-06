import React, { useState, useEffect } from 'react'
import clienteAxios from '../../../../config/axios'
import Card from '../../../../components/Card'

import { convertToReal } from '../../../../util/util'

import './MensagemCub.css'

import MensagemCubPeriodo from './MensagemCubPeriodo'

const MensagemCub = () => {

    const [resValor, setResValor] = useState('')
    const [resIndice, setResIndice] = useState('')
    const [comValor, setComValor] = useState('')
    const [comIndice, setComIndice] = useState('')
    const [mostrarMais, setMostrarMais] = useState(false)
    const [aberto, setAberto] = useState(false)
    const [mensagem12mais, xMensagem12mais] = useState('Útimos 12 meses...')

    useEffect(() => {

        getIndices()

    }, [])

    const getIndices = () => {

        clienteAxios.get('/indicesintranet')
            .then(resposta => {
                const a = resposta.data[0]
                const aa = a.resultado[0]

                const bb = aa.resvalor[0]
                setResValor(convertToReal(bb.indice_data_valor))

                const cc = aa.resindice[0]
                setResIndice(convertToReal(cc.indice_data_valor))

                const dd = aa.comvalor[0]
                setComValor(convertToReal(dd.indice_data_valor))

                const ee = aa.comindice[0]
                setComIndice(convertToReal(ee.indice_data_valor))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const hoje = new Date()
    const mm = (hoje.getMonth() + 1)
    const meses = new Array("", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");

    const aaaa = hoje.getFullYear()
    const dataAtual = aaaa + '-' + mm + '-01'

    const mesAtual = meses[mm] + '/' + aaaa

    const handleMostrarMais = () => {
        setMostrarMais(!mostrarMais)
        setAberto(!aberto)

    }



    return (
        <div style ={{margin: '10px'}}>

            <Card>
                <div className="intra-cub__titulo">CUB do mês de {mesAtual} </div>
                <div className="intra-cub__linhas">

                    <div><span>Residencial : </span>R$ {resValor} - {resIndice} %</div>
                    <div><span>Comercial : </span>R$ {comValor} - {comIndice} %</div>

                </div>
                <p
                    style={{ cursor: 'pointer', fontSize: '0.9rem', textAlign: 'right', marginTop: '20px' }}
                    onClick={() => handleMostrarMais()}

                >{
                        aberto
                            ? <span>Fechar  X</span>
                            : <span>Útimos 12 meses...</span>
                    }</p>
                {
                    mostrarMais
                        ? <MensagemCubPeriodo />
                        : null
                }
            </Card>
        </div>

    )
}

export default MensagemCub