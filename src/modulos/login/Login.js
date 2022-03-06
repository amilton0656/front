import { useState } from 'react'
import { useDispatch } from 'react-redux'
import clienteAxios from '../../config/axios'
import classes from './Login.module.css'
import Swal from 'sweetalert2'
import { loginActions } from '../../store/loginReducers'



const Login = () => {

    const initialState = {
        nome: '',
        senha: ''
    }

    const dispatch = useDispatch()

    const [formData, setFormData] = useState(initialState)

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


        clienteAxios.post('/usuario/login', formData)
            .then(resposta => {

                if (resposta.status === 200) {
                    dispatch(loginActions.login(resposta.data))
                } else {
                    Swal.fire('Acesso não autorizado!')
                }
            })
            .catch((err) => {
                console.log('err ', err)
            })




        // dispatch(loginActions.login())
    }


    return (
        <div id="login" className={classes.container}>
            <div className={classes.card}>
                <h1 className={classes['login-h1']}>Login</h1>
                <form onSubmit={submitHandler} className={classes.form}>
                    {/* Nome */}
                    <div className={classes.inputBox}>
                        <label htmlFor="nome">Nome</label>
                        <input
                            className={classes['login-input']}
                            id="nome"
                            name="nome"
                            onChange={textHandler}
                            value={formData.nome}
                        />
                    </div>

                    {/* Senha */}
                    <div className={classes.inputBox}>
                        <label htmlFor="senha">Senha:</label>
                        <input
                            className={classes['login-input']}
                            type="password"
                            id="senha"
                            name="senha"
                            onChange={textHandler}
                            value={formData.senha}
                        />
                    </div>

                    <div className={classes.botaoBox}>
                        <button className={classes['botaoBox-button']} type="submit" >Entrar</button>
                    </div>
                </form>
                <div>2020 03 04 01</div>
            </div>
        </div>
    )
}

export default Login