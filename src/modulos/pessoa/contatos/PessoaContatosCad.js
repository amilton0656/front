import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import classes from '../PessoaCad.module.css'
import clienteAxios from '../../../config/axios'
import { pessoasActions } from '../../../store/pessoaReducers'

const initialState = {
    contato: '',
    observacao: '',
    whatsapp: '0',
    id_tipo: '1'
}
const PessoaContatosCad = props => {
    
    const [formData, setFormData] = useState(props.contato || initialState )
    
    const { token } = useSelector(state => state.login.login)

    const dispatch = useDispatch()

    useEffect(() => {
        setFormData({id_pessoa: props.id_pessoa, ...formData })
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
                <div className={classes.inputBox} >
                    <label htmlFor="tipo">Tipo :</label>
                    <div className={classes.radioBox} style = {{display: 'flex', flexDirection: 'row'}}>
                        <div className={classes.radioBoxLinha} >
                            <input
                                type='radio'
                                name='tipo'
                                id="tipo1"
                                onChange={textHandler}
                                value={formData.id_tipo}
                                checked={formData.id_tipo.toString() === "1"}
                            /><label htmlFor="tipo1">Telefone</label>

                        </div>

                        <div className={classes.radioBoxLinha}>
                            <input
                                type='radio'
                                name='tipo'
                                id="tipo2"
                                onChange={textHandler}
                                value={formData.id_tipo}
                                checked={formData.id_tipo.toString() === "2"}
                            /><label htmlFor="tipo2">Email</label>

                        </div>


                    </div>
                        {/* Contato */}
                        <div className={classes.inputBox}>
                            <label htmlFor="contato">Contato:</label>
                            <input
                                required
                                className={classes['login-input']}
                                id="contato"
                                name="contato"
                                onChange={textHandler}
                                value={formData.contato}
                            />
                        </div>

                        {/* Observação */}
                        <div className={classes.inputBox}>
                            <label htmlFor="observacao">Observação:</label>
                            <input
                                required
                                className={classes['login-input']}
                                id="observacao"
                                name="observacao"
                                onChange={textHandler}
                                value={formData.observacao}
                            />
                        </div>
                        {/* Whats */}
                        <div className={classes.checkboxBox} >
                            <input
                                type='checkbox'
                                className={classes['login-input']}
                                id="whatsapp"
                                name="whatsapp"
                                defaultChecked={formData.whatsapp.toString() === '0' ? false : true}
                                onChange={textHandler}
                                value={formData.whatsapp}
                            />
                            <label htmlFor="whatsapp">whatsApp:</label>
                        </div>
                </div>
                <div className={classes.botaoBox}>
                        {botao}
                    </div>
            </form>
        </main>
    );
}

export default PessoaContatosCad;