import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../../../../config/axios'

import { FiSearch } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'

import Empreend_TelefonesNome from './Empreend_TelefonesNome'

import './Empreend_Telefones.css'


const Empreend_Telefones = ({ history }) => {

    const [telefones, xTelefones] = useState([])
    const [mostrar, xMostrar] = useState(false)
    const [nomeAbuscar, xNomeAbuscar] = useState('')
    const [mostrarTelefones, xMostrarTelefones] = useState(false)

    const onSubmit = (e) => {

        e.preventDefault()
        console.log('foi telefone')

        clienteAxios.get(`/agendatelefonica/${nomeAbuscar}`)
            .then(resposta => {
                xMostrar(true)
                const contatos = resposta.data[0]
                xTelefones(contatos.contatos)
                xMostrarTelefones(true)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const limparTelefones = () => (
        xNomeAbuscar(''),
        xMostrarTelefones(false)
    )

    return (
        <div>
            <div className="intra-fones__main">

                <form className='intra-fones__form' onSubmit={onSubmit}>
                        <div className='intra-fones__buttons-Container'>
                        <button type="submit" className='intra-fones__button'><span style = {{marginRight: '20px'}}>Buscar Telefone</span>  <FiSearch size={20} color='black'/></button>
                        <button type="button" className='intra-fones__button' onClick={() => limparTelefones()}
                        ><span style = {{marginRight: '20px'}}>Fechar</span>  <AiOutlineClose size={20} color='black'/></button>

                        </div>
                    <div className='intra-fones__input-container'>
                        <input
                            type="text"
                            class="intra-fones__input"
                            value={nomeAbuscar}
                            onChange={e => xNomeAbuscar(e.target.value)}
                        />

                    </div>
                </form>



                {/* <button 
                    onClick={() => {getContatos('AMILTON')}}
                    className="btn btn-primary " 
                    style={{ width: '100%', 
                            padding: '7px', 
                            fontSize: '20px', 
                            marginBottom: '4px',
                            fontWeigt: 'bold', 
                            marginTop: '0', 
                            justifyContent: 'flex-start' 
                            }}>Telefones
            </button> */}

                {/* <Link to={"/telefone"} className="btn btn-primary "
                style={{
                    width: '100%',
                    padding: '6px',
                    fontSize: '20px',
                    fontWeigt: 'bold',
                    marginTop: '0',

                    justifyContent: 'flex-start'
                }}>
                Telefones
            </Link> */}

            </div>

            {
                mostrar
                    ? <div>
                        {
                            telefones
                                ? telefones.map(pessoa => (
                                    mostrarTelefones
                                    ? <Empreend_TelefonesNome contatos={pessoa} />
                                    : null
                                ))
                                : null
                        }
                    </div>
                    : null
            }

        </div>
    )
}
export default Empreend_Telefones