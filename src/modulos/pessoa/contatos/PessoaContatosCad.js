import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import classes from '../PessoaCad.module.css'
import clienteAxios from '../../../config/axios'
import { pessoasActions } from '../../../store/pessoaReducers'
import RadioBox from '../../../components/RadioBox'
import Input from '../../../components/Input'

const initialState = {
    contato: '',
    observacao: '',
    whatsapp: '0',
    id_tipo: '1'
}
const PessoaContatosCad = props => {

    const [formData, setFormData] = useState(props.contato || initialState)

    const { token } = useSelector(state => state.login.login)

    const dispatch = useDispatch()

    useEffect(() => {
        setFormData({ id_pessoa: props.id_pessoa, ...formData })
    }, [])

    const submitHandler = event => {
        event.preventDefault()

        clienteAxios.post('/pessoacontato/add', formData)
            .then(resposta => {
                dispatch(pessoasActions.loadContatos(resposta.data))
            })
            .catch(err => {
                console.log('Erro ao cadastrar ', err)
            })

        props.setShowCad(false)
    }

    const editHandler = () => {

        clienteAxios.put('/pessoacontato/upd', formData)
            .then(resposta => {
                props.atualizar()
            })
            .catch(err => {
                console.log('Erro ao cadastrar ', err)
            })

        props.setShowCad(false)
    }

    const textHandler = (event) => {

        let dataEntered = event.target.value

        if (event.target.name === 'tipo') {
            if (event.target.id === 'tipo1') {
                dataEntered = '1'
            } else {
                dataEntered = '2'
            }
        }

        if (event.target.name === 'whatsapp') {
            dataEntered = event.target.value === '0' ? '1' : '0'
        }

        setFormData({
            ...formData,
            [event.target.name]: dataEntered
        })
    }

    const botao = formData.id_contato
        ? <button className={classes['botaoBox-button']} type="button" onClick={editHandler}>Salvar</button>
        : <button className={classes['botaoBox-button']} type="button" onClick={submitHandler}>Salvar</button>

    return (
        <main >
            <form>

                {/* Tipo */}

                {/* <div className={classes.inputBox} > */}
                {/* <label htmlFor="tipo">Tipo :</label>
                    <div className={classes.radioBox} style = {{display: 'flex', flexDirection: 'row'}}> */}

                <RadioBox
                    name='tipo_pessoa'
                    label='Tipo de Pessoa:'
                    direction='row'
                >
                    <div className='form-radioBoxLinha'>
                        <input
                            type='radio'
                            name='tipo'
                            id="tipo1"
                            onChange={textHandler}
                            value={formData.id_tipo}
                            checked={formData.id_tipo.toString() === "1"}
                        /><label htmlFor="tipo1">Telefone</label>

                    </div>

                    <div className='form-radioBoxLinha'>
                        <input
                            type='radio'
                            name='tipo'
                            id="tipo2"
                            onChange={textHandler}
                            value={formData.id_tipo}
                            checked={formData.id_tipo.toString() === "2"}
                        /><label htmlFor="tipo2">Email</label>

                    </div>
                </RadioBox>


                {/* Contato */}
                <Input
                    required
                    label='Contato:'
                    type='text'
                    id='contato'
                    name='contato'
                    value={formData.contato}
                    onChange={textHandler}
                />


                {/* Observação */}
                <Input
                    required
                    label='Observação:'
                    type='text'
                    id='observacao'
                    name='observacao'
                    value={formData.observacao}
                    onChange={textHandler}
                />
                {/* Whats */}
                <div className='form-checkboxBox'>
                    <input
                        type='checkbox'
                        className='form-input'
                        id="whatsapp"
                        name="whatsapp"
                        defaultChecked={formData.whatsapp.toString() === '0' ? false : true}
                        onChange={textHandler}
                        value={formData.whatsapp}
                    />
                    <label htmlFor="whatsapp">whatsApp:</label>
                </div>
                {/* </div> */}
                <div className={classes.botaoBox}>
                    {botao}
                </div>
            </form>
        </main>
    );
}

export default PessoaContatosCad;