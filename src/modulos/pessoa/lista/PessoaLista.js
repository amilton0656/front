import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { FaRegFilePdf } from 'react-icons/fa'
import clienteAxios from '../../../config/axios'
import Swal from 'sweetalert2'
import Spinner from '../../../spinner/Spinner'

import classes from './PessoaLista.module.css'
import classes2 from '../PessoaCad.module.css'
import { pessoasActions } from '../../../store/pessoaReducers'
import Nav from '../../proponente/nav/NavProponente'

import PessoaListaPdf from './PessoaListaPdf'
import PessoaFichaCadastralPdf from './PessoaFichaCadastralPdf'

const PessoaLista = () => {

    const [pessoasAll, setPessoasAll] = useState([])
    const [pessoas, setPessoas] = useState([])
    const [icones, setIcones] = useState(false)
    const [id, setId] = useState('')
    const [busca, setBusca] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [getLista, setGetLista] = useState(true)
    const [formDataI, setFormDataI] = useState({})

    const navigate = useNavigate()


    const { token } = useSelector(state => state.login.login)


    const dispatch = useDispatch()

    const atualizar = () => {
        setIsLoading(true)
        clienteAxios.get('/pessoa/lista', { headers: { Authorization: token } })
            .then(resposta => {
                setPessoas(resposta.data)
                setPessoasAll(resposta.data)
                dispatch(pessoasActions.loadPessoas(resposta.data))
                setIsLoading(false)
                dispatch(pessoasActions.setAtualizar(false))
            })
            .catch(err => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        atualizar()
        setGetLista(false)
    }, [])

    const deletePessoaHandler = id => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você está excluindo este registro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK, excluído!'
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/pessoa/del/${id}`)
                    .then(resposta => {
                        // atualizar()
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


    const textHandler = (event) => {
        setBusca(event.target.value.toUpperCase())
        onBuscar(event.target.value.toUpperCase())
    }

    const onBuscar = busca => {

        const filtra = new Promise((resolve, reject) => {

            resolve(
                pessoasAll.filter(function (pessoa) {
                    const pp = pessoa.nome
                    if (pp) {
                        return pp.toLowerCase().search(
                            busca.toLowerCase()) !== -1
                    }
                })
            )
        }

        )

        filtra
            .then(res => {
                setPessoas(res)
                // dispatch(ac_descargaEmpreendimentosFiltrado(empreendimentos))
            }
            )
    }


    if (!pessoas) {
        return <div>Não há registros</div>
    }

    const goToForm = (pessoa) => {
        setGetLista(true)
        const id = pessoa ? pessoa.id_pessoa : null
        navigate('/pessoa/formdados', { state: id })
        dispatch(pessoasActions.setPessoa(pessoa))
    }

    const FichaCadastral = (id_pessoa) => {

        let formDataI
        let formDataII

        clienteAxios.get(`/pessoa/lista/id/${id_pessoa}`)
                .then(resposta => {
                    const id_pessoa = resposta.data.id_pessoa
                    formDataI = resposta.data

                    clienteAxios.get(`/pessoacomplemento/lista/id/${id_pessoa}`)
                        .then(resposta => {
                            if (resposta.data.length === 0) {
                                formDataII = {}
                            } else {
                                formDataII = resposta.data[0]
                            }

                        PessoaFichaCadastralPdf(formDataI, formDataII)

                        })
                        .catch(err => {
                            console.log('Erro ao buscar ', err)
                        })
                })
                .catch(err => {
                    console.log('Erro ao buscar ', err)
                })

        
    }

    return (
        <div className={classes.container}>
            <Nav />
            {isLoading && <Spinner />}
            <main className={classes.main}>
                <div className={classes.containerHeaderButtons}>
                    <h2>Proponentes</h2>
                    <button type="button" onClick={() => goToForm(null)}>Novo</button>
                    <button type="button" onClick={() => PessoaListaPdf(pessoas)}>PDF</button>
                    <button type="button" onClick={() => navigate('/', { replace: true })}>Sair</button>
                </div>
                <ul className={classes.containerLista}>
                    <div className={classes.busca}>
                        <div className={classes2.inputBox}>
                            <label htmlFor="busca">Busca:</label>
                            <input
                                className={classes2['login-input']}
                                id="busca"
                                name="busca"
                                onChange={textHandler}
                                value={busca}
                            />
                        </div>
                        {/* <div style={{ textAlign: 'right' }}><button className={classes.pdf} onClick={() => PessoaListaPdf(pessoas)}><FaRegFilePdf size={30} color='grey' style={{ paddingTop: 0 }} /></button></div> */}
                    </div>
                    {
                        pessoas.map(pessoa => (
                            <div>
                                <div className={classes.item} key={pessoa.id_pessoa}>
                                    <li
                                        className={classes.linha}
                                        onClick={() => clickHandle(pessoa.id_pessoa)}>{pessoa.nome}
                                    </li>

                                    {icones && id === pessoa.id_pessoa &&
                                        <div>
                                            <button onClick={() => goToForm(pessoa)}><FaRegEdit size={30} color='blue' /></button>
                                            <button onClick={() => FichaCadastral(pessoa.id_pessoa)}><FaRegFilePdf size={30} color='grey' /></button>
                                            <button onClick={() => deletePessoaHandler(pessoa.id_pessoa)}><BsTrash size={30} color='red' /></button>
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

export default PessoaLista;