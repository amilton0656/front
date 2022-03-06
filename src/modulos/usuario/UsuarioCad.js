import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from './UsuarioCad.module.css'
import { usuariosActions } from '../../store/usuarioReducers'
import clienteAxios from '../../config/axios'

import Header from './HeaderUsuario'

const UsuarioCad = props => {

    const dispatch = useDispatch()

    const initialState = {
        nome: '',
        email: '',
        senha: ''
    }

    const navigate = useNavigate()

    const location = useLocation()

    const [formData, setFormData] = useState(location.state || initialState)

    const textHandler = (event) => {

        let dataEntered = event.target.value
        if (event.target.name === 'nome') {
            dataEntered = dataEntered.toUpperCase()
        }

        setFormData({
            ...formData,
            [event.target.name]: dataEntered
        })

    }


    const submitHandler = event => {
        event.preventDefault()

        clienteAxios.post('/usuario/add', formData)
            .then(resposta => {
            })
            .catch(err => {
                console.log('Erro ao cadastrar')
            })

        setFormData(initialState)
        navigate('/usuario/lista', true)
    }

    const editHandler = () => {

        clienteAxios.put('/usuario/upd', formData)
            .then(resposta => {
                
            })
            .catch(err => {
                console.log('Erro ao cadastrar')
            })

        setFormData(initialState)
        navigate('/usuario/lista', true)
    }

    const botao = formData.id
        ? <button className={classes['botaoBox-button']} type="button" onClick={editHandler}>Salvar</button>
        : <button className={classes['botaoBox-button']} type="submit" >Salvar</button>

    

    return (
        <div className={classes.container}>
        <Header />
        
        <main className={classes.main}>
            <h2>Cadastro</h2>
            <form onSubmit={submitHandler} className={classes.form}>

                {/* Nome */}
                <div className={classes.inputBox}>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        className={classes['login-input']}
                        id="nome"
                        name="nome"
                        onChange={textHandler}
                        value={formData.nome}
                    />
                </div>

                {/* Email */}
                <div className={classes.inputBox}>
                    <label htmlFor="email">Email:</label>
                    <input
                        className={classes['login-input']}
                        id="email"
                        name="email"
                        onChange={textHandler}
                        value={formData.email}
                    />
                </div>

                {/* Senha */}
                <div className={classes.inputBox}>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        className={classes['login-input']}
                        id="senha"
                        name="senha"
                        onChange={textHandler}
                        value={formData.senha}
                    />
                </div>

                <div className={classes.botaoBox}>
                    {botao}
                </div>
            </form>

        </main>
        </div>
    );
}

export default UsuarioCad;