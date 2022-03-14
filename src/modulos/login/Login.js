import { useState } from 'react'
import { useDispatch } from 'react-redux'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { loginActions } from '../../store/loginReducers'
import bcrypt from 'bcryptjs'

import Card from '../../components/Card'
import Form from '../../components/Form'

import './login.css'

const Login = () => {

    const initialState = {
        nome: '',
        senha: ''
    }



    const dispatch = useDispatch()

    const [formData, setFormData] = useState(initialState)

    const textHandler = (event) => {

        let dataEntered = event.target.value

        setFormData({
            ...formData,
            [event.target.name]: dataEntered
        })
    }

    const submitHandler = event => {
        event.preventDefault()

        const usuario = {
            nome: formData.nome,
            senha: bcrypt.hashSync(formData.senha)
        }

        clienteAxios.post('/auth',usuario)
        .then(resposta => {
                if (resposta.status === 200) {
                    dispatch(loginActions.login(resposta.data))
                } else {
                    Swal.fire('Acesso não autorizado!')
                }
            })
            .catch(err => {
                console.log('err ', err)
                Swal.fire('Sem conexão!')
            })
    }

    return (
        <div id="login" className='login-container'>
            <Card>
                <h1 className='login-title'>Login</h1>
                <Form onSubmit={submitHandler}>

                    {/* Nome */}
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input
                            className='form-input'
                            id="nome"
                            name="nome"
                            onChange={textHandler}
                            value={formData.nome}
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <input
                            className='form-input'
                            type="password"
                            id="senha"
                            name="senha"
                            onChange={textHandler}
                            value={formData.senha}
                        />
                    </div>

                    {/* <Button /> */}
                    <div className='form-botaoBox'>
                        <button
                            className='form-botaoBox__button'
                            type="button"
                            onClick={submitHandler}
                        >Entrar</button>
                    </div>
                    <div style={{fontSize: '0.7rem', display: 'block', textAlign: 'right'}}>
                        2022 03 13 01
                    </div>

                </Form>
            </Card>
        </div>
    )
}

export default Login