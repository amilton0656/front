import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { FaRegFilePdf } from 'react-icons/fa'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'

import classes from './UsuarioLista.module.css'
import { usuariosActions } from '../../store/usuarioReducers'
import Header from './HeaderUsuario'

import UsuarioListaPdf from './UsuarioListaPdf'

const UsuarioLista = () => {

    const [icones, setIcones] = useState(false)
    const [id, setId] = useState('')

    const navigate = useNavigate()

    const usuarios = useSelector(state => state.usuarios.usuarios)
    const { token } = useSelector(state => state.login.login)

    const dispatch = useDispatch()

    const atualizar = () => {
        clienteAxios.get('/usuario/lista', { headers: { Authorization: token } })
            .then(resposta => {
                dispatch(usuariosActions.loadUsuarios(resposta.data))
            })
            .catch(err => {
                // dispatch(descargaEmpreendimentosError())
            })
    }

    useEffect(() => {
        atualizar()
    }, [])

    const deleteUsuarioHandler = id => {

        Swal.fire({
            title: 'Tem certeza?',
            text: "Você está excluindo este reistro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK, excluído!'
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/usuario/del/${id}`)
                    .then(resposta => {
                        atualizar()
                    })
                    .catch(err => {
                        // dispatch(descargaEmpreendimentosError())
                    })

                Swal.fire(
                    'Excluído!'
                )
            }
        })

    }

    const clickHandle = (id) => {
        setIcones(!icones)
        setId(id)
    }

    if (!usuarios) {
        return <div>Não há registros</div>
    }

    return (
        <div className={classes.container}>
        <Header />

        
        <main className={classes.main}>
            <h2>Lista</h2>
            <ul className={classes.containerLista}>
                <div style={{textAlign: 'right'}}><button className={classes.pdf} onClick={() => UsuarioListaPdf(usuarios)}><FaRegFilePdf size={30} color='grey'/></button></div>
                {
                    usuarios.map(usuario => (
                        <div>
                        <div className={classes.item} key={usuario.id}>
                            <li
                                className={classes.linha}
                                onClick={() => clickHandle(usuario.id)}>{usuario.nome}
                            </li>
                            
                            {icones && id === usuario.id &&
                            <div>
                                <button onClick={() => navigate('/usuario/form', { state: usuario })}><FaRegEdit size={30} color='blue'/></button>
                                <button onClick={() => deleteUsuarioHandler(usuario.id)}><BsTrash size={30} color='red'/></button>
                            </div>
                            }

                        </div>
                        </div>
                    )
                    )
                }
            </ul>

        </main>
        </div>
    );
}

export default UsuarioLista;