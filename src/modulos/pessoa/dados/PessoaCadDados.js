import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import clienteAxios from '../../../config/axios'
import classes from '../PessoaCad.module.css'
import classes2 from '../lista/PessoaLista.module.css'
import { pessoasActions } from '../../../store/pessoaReducers'
import { cepMask, cpfMask, cnpjMask, validarCPF, validarCNPJ } from '../../../util/util'
import Nav from '../../proponente/nav/NavProponente'
import InputNumber from '../../../components/InputNumber'
import PessoaContatosLista from '../contatos/PessoaContatosLista'

const ProponenteCadDados = props => {

    const dispatch = useDispatch()

    const initialStateI = {
        tipo_pessoa: '1',
        cpf_cnpj: '',
        nome: '',
        cep: '',
        endereco: '',
        complemento: '',
        bairro: '',
        municipio: '',
        uf: 'SC',
    }

    const initialStateII = {
        data_nascimento: null,
        nacionalidade: null,
        sexo: 1,
        estado_civil: 1,
        uniao_estavel: 0,
        conjuge_nome: null,
        conjuge_cpf: null,
        regime_casamento: 2,
        data_casamento: null,
        pacto_nupcial: null,
        profissao: null,
        numero_dependentes: null,
        rg: null,
        orgao_emissor_uf: null,
        empresa_nome: null,
        cargo: null,
        tempo_empresa: null,
    }


    const { token } = useSelector(state => state.login.login)

    const navigate = useNavigate()

    const location = useLocation()

    const id_pessoa = location.state

    const [formDataI, setFormDataI] = useState(initialStateI)
    const [formDataII, setFormDataII] = useState(initialStateII)
    const [cpfValido, setCpfValido] = useState(false)

    useEffect(() => {

        if (id_pessoa) {
            clienteAxios.get(`/pessoa/lista/id/${id_pessoa}`)
                .then(resposta => {
                    setFormDataI(resposta.data)
                    const id_pessoa = resposta.data.id_pessoa
                    
                    checaCPF(resposta.data.tipo_pessoa, resposta.data.cpf_cnpj.replace(/\D/g, ''))


                    dispatch(pessoasActions.setPessoa(resposta.data))

                    clienteAxios.get(`/pessoacomplemento/lista/id/${id_pessoa}`)
                        .then(resposta => {
                            if (resposta.data.length === 0) {
                                setFormDataII({ ...initialStateII, id_pessoa })
                            } else {
                                setFormDataII(resposta.data[0])
                            }
                            dispatch(pessoasActions.setComplemento(resposta.data))
                        })
                        .catch(err => {
                            console.log('Erro ao buscar ', err)
                        })
                })
                .catch(err => {
                    console.log('Erro ao buscar ', err)
                })
        }
    }, [])

    const checaCPF = (tipo_pessoa, cpf_cnpj) => {

        if (tipo_pessoa.toString() === '1') {
            setCpfValido(validarCPF(cpf_cnpj))
        } else {
            setCpfValido(validarCNPJ(cpf_cnpj))
        }
    }

    const addHandle = () => {
        clienteAxios.post('/pessoa/add', formDataI)
            .then(resposta => {
                const id_pessoa = resposta.data.id_pessoa
                dispatch(pessoasActions.setPessoa(resposta.data))

            })
            .then(resposta => {
                const complemento = { ...formDataII, id_pessoa }

                clienteAxios.post('/pessoacomplemento/add', complemento)
                    .then(resposta => {
                        console.log('Erro ao cadastrar ', resposta)
                        dispatch(pessoasActions.setComplemento(resposta.data))
                    })
                    .catch(err => {
                        console.log('Erro ao cadastrar ', err)
                    })
            })
            .then(resposta => {
                getPessoas()
            })
            .catch(err => {
                console.log('Erro ao cadastrar ', err)
            })
    }

    const editHandle = () => {

        clienteAxios.put('/pessoa/upd', formDataI)
            .then(resposta => {
                dispatch(pessoasActions.setPessoa(resposta.data))
            })
            .then(resposta => {
                if (formDataII.id_dados) {
                    clienteAxios.put('/pessoacomplemento/upd', formDataII)
                        .then(resposta => {
                            dispatch(pessoasActions.setComplemento(resposta.data))
                        })
                        .catch(err => {
                            console.log('Erro ao cadastrar')
                        })

                } else {
                    clienteAxios.post('/pessoacomplemento/add', formDataII)
                        .then(resposta => {
                            dispatch(pessoasActions.setComplemento(resposta.data))
                        })
                        .catch(err => {
                            console.log('Erro ao cadastrar ', err)
                        })
                }
            })
            .then(resposta => {
                getPessoas()

            })
            .catch(err => {
                console.log('Erro ao cadastrar')
            })
    }

    const atualizaComplemento = () => {
        if (formDataI.id_pessoa) {
            clienteAxios.get(`/pessoacomplemento/lista/id/${formDataI.id_pessoa}`, { headers: { Authorization: token } })
                .then(resposta => {
                    setFormDataII({ ...formDataII, ...resposta.data[0] })
                })
                .catch(err => {
                    // dispatch(descargaEmpreendimentosError())
                })
        }
    }

    const textHandlerI = (event) => {

        let dataEntered = event.target.value

        if ([
            'nome',
            'endereco',
            'complemento',
            'bairro',
            'municipio',
            'uf'
        ].find(item => item === event.target.name)) {
            dataEntered = dataEntered.toUpperCase().trim()
        }

        if (event.target.name === 'tipo_pessoa') {
            if (event.target.id === 'tipo_pessoa1') {
                dataEntered = '1'
            } else {
                dataEntered = '2'
            }
        }

        if (event.target.name === 'cpf_cnpj') {
            if (formDataI.tipo_pessoa.toString() === '1') {
                dataEntered = cpfMask(event.target.value)
                setCpfValido(validarCPF(dataEntered))
            } else {
                dataEntered = cnpjMask(event.target.value)
                setCpfValido(validarCNPJ(dataEntered))
            }
        }

        if (event.target.name === 'cep') {
            dataEntered = cepMask(event.target.value)
            if (event.target.value.length === 9) {
                onBuscarCep(event.target.value)
            }
        }

        setFormDataI({
            ...formDataI,
            [event.target.name]: dataEntered
        })
    }

    const textHandlerII = (event) => {

        let dataEntered = event.target.value

        if ([
            'nacionalidade',
            'conjuge_nome',
            'pacto_nupcial',
            'profissao',
            'empresa_nome',
            'cargo'
        ].find(item => item === event.target.name)) {
            dataEntered = dataEntered.toUpperCase().trim()
        }

        if (event.target.name === 'sexo') {
            if (event.target.id === 'sexo1') {
                dataEntered = '1'
            } else {
                dataEntered = '2'
            }
        }

        if (event.target.name === 'estado_civil') {
            switch (event.target.id) {
                case 'estado_civil1':
                    dataEntered = '1'
                    break

                case 'estado_civil2':
                    dataEntered = '2'
                    break

                case 'estado_civil3':
                    dataEntered = '3'
                    break

                case 'estado_civil4':
                    dataEntered = '4'
                    break

                case 'estado_civil5':
                    dataEntered = '5'
                    break
            }
        }

        if (event.target.name === 'regime_casamento') {
            switch (event.target.id) {
                case 'regime_casamento1':
                    dataEntered = '1'
                    break

                case 'regime_casamento2':
                    dataEntered = '2'
                    break

                case 'regime_casamento3':
                    dataEntered = '3'
                    break

                case 'regime_casamento4':
                    dataEntered = '4'
                    break
            }
        }

        if (event.target.name === 'numero_dependentes') {
            dataEntered = dataEntered.replace(/\D/g, '')
            if (dataEntered === '') { dataEntered = null }
        }

        if (event.target.name === 'uniao_estavel') {
            dataEntered = event.target.value === '0' ? '1' : '0'
        }

        if (event.target.name === 'conjuge_cpf') {
            dataEntered = cpfMask(event.target.value)
        }

        if (event.target.name === 'remuneracao') {
            if (dataEntered === '' || dataEntered < 0) { dataEntered = null }
        }

        setFormDataII({
            ...formDataII,
            [event.target.name]: dataEntered
        })
    }

    const submitHandler = event => {
        event.preventDefault()

        addHandle()

    }

    const getPessoas = () => {
        // setIsLoading(true)
        clienteAxios.get('/pessoa/lista', { headers: { Authorization: token } })
            .then(resposta => {
                dispatch(pessoasActions.loadPessoas(resposta.data))
                dispatch(pessoasActions.setAtualizar(true))
            })
            .then(resp => {
                navigate('/pessoa/lista', { state: true })

            })
            .catch(err => {
                // setIsLoading(false)
            })
    }

    const botao = !!formDataI.id_pessoa
        ? <button className={classes['botaoBox-button']} type="button" onClick={editHandle}>Salvar</button>
        : <button className={classes['botaoBox-button']} type="button" onClick={addHandle}>Salvar</button>

    const onBuscarCep = cep => {

        axios.get(`https://api.postmon.com.br/v1/cep/${cep}`)
            .then(resposta => {
                const { logradouro, bairro, cidade, estado } = resposta.data

                setFormDataI(
                    {
                        ...formDataI,
                        cep: cepMask(cep),
                        endereco: logradouro.toUpperCase(),
                        bairro: bairro.toUpperCase(),
                        municipio: cidade.toUpperCase(),
                        uf: estado.toUpperCase()
                    }
                )
            })
            .catch(err => {
                // Swal.fire({
                //     position: 'center',
                //     type: 'erro',
                //     title: 'CEP não encontrado',
                //     showConfirmButton: false,
                //     timer: 3000
                //     })
            })

    }

    const verCPF = () => {
        clienteAxios.get(`/pessoa/lista/cpf/${formDataI.cpf_cnpj}`, { headers: { Authorization: token } })
            .then(resposta => {
                if (resposta.data) {
                    setFormDataI(resposta.data)
                    atualizaComplemento()

                }
            })
            .catch(err => {
                // dispatch(descargaEmpreendimentosError())
            })
    }

    const getOutHandle = () => {
        navigate(-1)
        dispatch(pessoasActions.setPessoa({}))
    }

    return (
        <div className={classes.container}>
            <Nav />

            <main className={classes.main}>
                <div className={classes2.containerHeaderButtons}>
                    <h2>Proponente</h2>
                    <div style={{ width: '70px' }}>
                        <button type="button" onClick={getOutHandle}>Voltar</button>

                    </div>
                </div>
                <form onSubmit={submitHandler} className={classes.form}>
                    <div>{formDataI.id_pessoa}</div>
                    {/* Tipo de Pessoa */}
                    <div className={classes.inputBox}>
                        <label htmlFor="tipo_pessoa">Tipo de Pessoa:</label>
                        <div className={classes.radioBox}>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='tipo_pessoa'
                                    id="tipo_pessoa1"
                                    onChange={textHandlerI}

                                    value={formDataI.tipo_pessoa}
                                    checked={formDataI.tipo_pessoa.toString() === "1"}
                                /><label htmlFor="tipo_pessoa1">Física</label>

                            </div>

                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='tipo_pessoa'
                                    id="tipo_pessoa2"
                                    onChange={textHandlerI}
                                    value={formDataI.tipo_pessoa}
                                    checked={formDataI.tipo_pessoa.toString() === "2"}
                                /><label htmlFor="tipo_pessoa2">Jurídica</label>

                            </div>

                        </div>
                    </div>

                    {/* CPF / CNPJ */}
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <div className={classes.inputBoxCPF}>
                            <label htmlFor="nome">{formDataI.tipo_pessoa.toString() === '1' ? 'CPF:' : 'CNPJ:'}</label>
                            <input
                                className={classes['login-input']}
                                id="cpf_cnpj"
                                name="cpf_cnpj"
                                onChange={textHandlerI}
                                value={formDataI.cpf_cnpj}
                                onBlur={verCPF}
                            />
                        </div>
                        {
                            !cpfValido &&
                            <div style={{ margin: '7px 10px', color: 'red', fontWeight: 'bold' }}>
                                Inválido !
                            </div>
                        }

                    </div>

                    {/* Nome / Razão Social */}
                    <div className={classes.inputBox}>
                        <label htmlFor="nome">{formDataI.tipo_pessoa.toString() === '1' ? 'Nome:' : 'Razão Social:'}</label>
                        <input
                            required
                            className={classes['login-input']}
                            id="nome"
                            name="nome"
                            onChange={textHandlerI}
                            value={formDataI.nome}
                        />
                    </div>

                    {/* CEP */}
                    <div className={classes.inputBoxCPF}>
                        <label htmlFor="cep">CEP:</label>
                        <input
                            className={classes['login-input']}
                            id="cep"
                            name="cep"
                            onChange={textHandlerI}
                            value={formDataI.cep}
                        />
                    </div>

                    {/* Endereço */}
                    <div className={classes.inputBox}>
                        <label htmlFor="endereco">Endereço:</label>
                        <input
                            className={classes['login-input']}
                            id="endereco"
                            name="endereco"
                            onChange={textHandlerI}
                            value={formDataI.endereco}
                        />
                    </div>

                    {/* Complemento */}
                    <div className={classes.inputBox}>
                        <label htmlFor="complemento">Complemento:</label>
                        <input
                            className={classes['login-input']}
                            id="complemento"
                            name="complemento"
                            onChange={textHandlerI}
                            value={formDataI.complemento}
                        />
                    </div>

                    {/* Bairro */}
                    <div className={classes.inputBox}>
                        <label htmlFor="bairro">Bairro:</label>
                        <input
                            className={classes['login-input']}
                            id="bairro"
                            name="bairro"
                            onChange={textHandlerI}
                            value={formDataI.bairro}
                        />
                    </div>

                    {/* Município */}
                    <div className={classes.inputBox}>
                        <label htmlFor="municipio">Município:</label>
                        <input
                            className={classes['login-input']}
                            id="municipio"
                            name="municipio"
                            onChange={textHandlerI}
                            value={formDataI.municipio}
                        />
                    </div>

                    {/* Município */}
                    <div className={classes.inputBox}>
                        <label htmlFor="uf">UF:</label>
                        <select
                            className={classes['login-input']}
                            id="uf"
                            name="uf"
                            onChange={textHandlerI}
                            value={formDataI.uf}
                        >
                            <option value="SC">SANTA CATARINA</option>
                            <option value="AC">ACRE</option>
                            <option value="AL">ALAGOAS</option>
                            <option value="AP">AMAPÁ</option>
                            <option value="AM">AMAZONAS</option>
                            <option value="BA">BAHIA</option>
                            <option value="CE">CEARÁ</option>
                            <option value="DF">DISTRITO FEDERAL</option>
                            <option value="ES">ESPÍRITO SANTO</option>
                            <option value="GO">GOIÁS</option>
                            <option value="MA">MARANHÃO</option>
                            <option value="MT">MATO GROSSO</option>
                            <option value="MS">MATO GROSSO DO SUL</option>
                            <option value="MG">MINAS GERAIS</option>
                            <option value="PA">PARÁ</option>
                            <option value="PB">PARAÍBA</option>
                            <option value="PR">PARANÁ</option>
                            <option value="PE">PERNAMBUCO</option>
                            <option value="PI">PIAUÍ</option>
                            <option value="RJ">RIO DE JANEIRO</option>
                            <option value="RN">RIO GRANDE DO NORTE</option>
                            <option value="RS">RIO GRANDE DO SUL</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>

                    {formDataI.id_pessoa && <PessoaContatosLista
                        id_pessoa={formDataI.id_pessoa}
                        formDataI={formDataI}
                        formDataII={formDataII}
                        addHandle={addHandle}
                    />}

                    {
                        (formDataI.tipo_pessoa.toString() === '1') && <div>

                            {/* Data de Nascimento */}
                            <div className={classes.inputBoxCPF}>
                                <label htmlFor="data_nascimento">Data de Nascimento:</label>
                                <input
                                    className={classes['login-input']}
                                    type='date'
                                    id="data_nascimento"
                                    name="data_nascimento"
                                    onChange={textHandlerII}
                                    value={formDataII.data_nascimento}
                                />
                            </div>


                            {/* Nacionalidade */}
                            <div className={classes.inputBox}>
                                <label htmlFor="nacionalidade">Nacionalidade:</label>
                                <input
                                    className={classes['login-input']}
                                    id="nacionalidade"
                                    name="nacionalidade"
                                    onChange={textHandlerII}
                                    value={formDataII.nacionalidade}
                                />
                            </div>

                            {/* Sexo */}
                            <div className={classes.inputBox}>
                                <label htmlFor="sexo">Sexo:</label>
                                <div className={classes.radioBox}>
                                    <div className={classes.radioBoxLinha}>
                                        <input
                                            type='radio'
                                            name='sexo'
                                            id="sexo1"
                                            onChange={textHandlerII}
                                            value={formDataII.sexo}
                                            checked={formDataII.sexo.toString() === "1"}
                                        /><label htmlFor="sexo1">Masculino</label>
                                    </div>
                                    <div className={classes.radioBoxLinha}>
                                        <input
                                            type='radio'
                                            name='sexo'
                                            id="sexo2"
                                            onChange={textHandlerII}
                                            value={formDataII.sexo}
                                            checked={formDataII.sexo.toString() === "2"}
                                        /><label htmlFor="sexo2">Feminino</label>
                                    </div>
                                </div>
                            </div>

                            {/* Estado Civil */}
                            <div className={classes.inputBox}>
                                <label htmlFor="estado_civil">Estado Civil:</label>
                                <div className={classes.radioBox}>
                                    <div className={classes.radioBoxLinha}>
                                        <input
                                            type='radio'
                                            name='estado_civil'
                                            id="estado_civil1"
                                            onChange={textHandlerII}

                                            value={formDataII.estado_civil}
                                            checked={formDataII.estado_civil.toString() === "1"}
                                        /><label htmlFor="estado_civil1">Solteiro(a)</label>
                                    </div>
                                    <div className={classes.radioBoxLinha}>
                                        <input
                                            type='radio'
                                            name='estado_civil'
                                            id="estado_civil2"
                                            onChange={textHandlerII}
                                            value={formDataII.estado_civil}
                                            checked={formDataII.estado_civil.toString() === "2"}
                                        /><label htmlFor="estado_civil2">Casado(a)</label>
                                    </div>
                                    <div className={classes.radioBoxLinha}>
                                        <input
                                            type='radio'
                                            name='estado_civil'
                                            id="estado_civil3"
                                            onChange={textHandlerII}
                                            value={formDataII.estado_civil}
                                            checked={formDataII.estado_civil.toString() === "3"}
                                        /><label htmlFor="estado_civil3">Separado(a)</label>
                                    </div>
                                    <div className={classes.radioBoxLinha}>
                                        <input
                                            type='radio'
                                            name='estado_civil'
                                            id="estado_civil4"
                                            onChange={textHandlerII}
                                            value={formDataII.estado_civil}
                                            checked={formDataII.estado_civil.toString() === "4"}
                                        /><label htmlFor="estado_civil4">Divorciado(a)</label>
                                    </div>
                                    <div className={classes.radioBoxLinha}>
                                        <input
                                            type='radio'
                                            name='estado_civil'
                                            id="estado_civil5"
                                            onChange={textHandlerII}
                                            value={formDataII.estado_civil}
                                            checked={formDataII.estado_civil.toString() === "5"}
                                        /><label htmlFor="estado_civil5">Viúvo(a)</label>
                                    </div>
                                </div>
                            </div>

                            {/* União Estável */}
                            <div className={classes.checkboxBox}>
                                <input
                                    type='checkbox'
                                    className={classes['login-input']}
                                    id="uniao_estavel"
                                    name="uniao_estavel"
                                    defaultChecked={formDataII.uniao_estavel.toString() === '0' ? false : true}
                                    onChange={textHandlerII}
                                    value={formDataII.uniao_estavel}
                                />
                                <label htmlFor="uniao_estavel">União Estável:</label>
                            </div>

                            {/* Nome do Cônjuge */}
                            <div className={classes.inputBox}>
                                <label htmlFor="nome">Nome do Cônjuge</label>
                                <input
                                    className={classes['login-input']}
                                    id="conjuge_nome"
                                    name="conjuge_nome"
                                    onChange={textHandlerII}
                                    value={formDataII.conjuge_nome}
                                />
                            </div>

                            {/* CPF do Cônjuge */}
                            <div className={classes.inputBoxCPF}>
                                <label htmlFor="conjuge_cpf">CPF do Cônjuge:</label>
                                <input
                                    className={classes['login-input']}
                                    id="conjuge_cpf"
                                    name="conjuge_cpf"
                                    onChange={textHandlerII}
                                    value={formDataII.conjuge_cpf}
                                />
                            </div>
                            {
                                (formDataII.estado_civil.toString() === '2' || formDataII.estado_civil.toString() === '3') && <div>


                                    {/* Regime de Casamento */}
                                    <div className={classes.inputBox}>
                                        <label htmlFor="regime_casamento">Regime de Casamento:</label>
                                        <div className={classes.radioBox}>
                                            <div className={classes.radioBoxLinha}>
                                                <input
                                                    type='radio'
                                                    name='regime_casamento'
                                                    id="regime_casamento1"
                                                    onChange={textHandlerII}

                                                    value={formDataII.regime_casamento}
                                                    checked={formDataII.regime_casamento.toString() === "1"}
                                                /><label htmlFor="regime_casamento1">Comunhão Universal de Bens</label>
                                            </div>
                                            <div className={classes.radioBoxLinha}>
                                                <input
                                                    type='radio'
                                                    name='regime_casamento'
                                                    id="regime_casamento2"
                                                    onChange={textHandlerII}
                                                    value={formDataII.regime_casamento}
                                                    checked={formDataII.regime_casamento.toString() === "2"}
                                                /><label htmlFor="regime_casamento2">Comunhão Parcial de Bens</label>
                                            </div>
                                            <div className={classes.radioBoxLinha}>
                                                <input
                                                    type='radio'
                                                    name='regime_casamento'
                                                    id="regime_casamento3"
                                                    onChange={textHandlerII}

                                                    value={formDataII.regime_casamento}
                                                    checked={formDataII.regime_casamento.toString() === "3"}
                                                /><label htmlFor="regime_casamento3">Separação de Bens</label>
                                            </div>
                                            <div className={classes.radioBoxLinha}>
                                                <input
                                                    type='radio'
                                                    name='regime_casamento'
                                                    id="regime_casamento4"
                                                    onChange={textHandlerII}
                                                    value={formDataII.regime_casamento}
                                                    checked={formDataII.regime_casamento.toString() === "4"}
                                                /><label htmlFor="regime_casamento4">Outros</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data do Casamento */}
                                    <div className={classes.inputBoxCPF}>
                                        <label htmlFor="data_casamento">Data do Casamento:</label>
                                        <input
                                            className={classes['login-input']}
                                            type='date'
                                            id="data_casamento"
                                            name="data_casamento"
                                            onChange={textHandlerII}
                                            value={formDataII.data_casamento}
                                        />
                                    </div>

                                    {/* Pacto Antenupcial */}
                                    <div className={classes.inputBox}>
                                        <label htmlFor="pacto_nupcial">Pacto Antenupcial:</label>
                                        <textarea
                                            className={classes['login-input']}
                                            type='text'
                                            cols="100"
                                            rows="5"
                                            id="pacto_nupcial"
                                            name="pacto_nupcial"
                                            onChange={textHandlerII}
                                            value={formDataII.pacto_nupcial}
                                        />
                                    </div>
                                </div>}

                            {/* Profissão */}
                            <div className={classes.inputBox}>
                                <label htmlFor="profissao">Profissão:</label>
                                <input
                                    className={classes['login-input']}
                                    id="profissao"
                                    name="profissao"
                                    onChange={textHandlerII}
                                    value={formDataII.profissao}
                                />
                            </div>

                            {/* Número de Dependentes */}
                            <div className={classes.inputBoxCPF}>
                                <label htmlFor="numero_dependentes">Número de Dependentes:</label>
                                <input
                                    type='number'
                                    step="1"
                                    className={classes['login-input']}
                                    id="numero_dependentes"
                                    name="numero_dependentes"
                                    onChange={textHandlerII}
                                    value={formDataII.numero_dependentes}
                                />
                            </div>

                            {/* Número do RG */}
                            <div className={classes.inputBox}>
                                <label htmlFor="rg">Número do RG:</label>
                                <input
                                    className={classes['login-input']}
                                    id="rg"
                                    name="rg"
                                    onChange={textHandlerII}
                                    value={formDataII.rg}
                                />
                            </div>

                            {/* Data da Expedição */}
                            <div className={classes.inputBoxCPF}>
                                <label htmlFor="data_expedicao">Data da Expedição:</label>
                                <input
                                    className={classes['login-input']}
                                    type='date'
                                    id="data_expedicao"
                                    name="data_expedicao"
                                    onChange={textHandlerII}
                                    value={formDataII.data_expedicao}
                                />
                            </div>

                            {/* Órgao Emissor / UF */}
                            <div className={classes.inputBox}>
                                <label htmlFor="orgao_emissor_uf">Órgão Emissor / UF:</label>
                                <input
                                    className={classes['login-input']}
                                    id="orgao_emissor_uf"
                                    name="orgao_emissor_uf"
                                    onChange={textHandlerII}
                                    value={formDataII.orgao_emissor_uf}
                                />
                            </div>

                            {/* Empresa onde trabalha */}
                            <div className={classes.inputBox}>
                                <label htmlFor="empresa_nome">Empresa onde trabalha:</label>
                                <input
                                    className={classes['login-input']}
                                    id="empresa_nome"
                                    name="empresa_nome"
                                    onChange={textHandlerII}
                                    value={formDataII.empresa_nome}
                                />
                            </div>

                            {/* Cargo */}
                            <div className={classes.inputBox}>
                                <label htmlFor="cargo">Cargo:</label>
                                <input
                                    className={classes['login-input']}
                                    id="cargo"
                                    name="cargo"
                                    onChange={textHandlerII}
                                    value={formDataII.cargo}
                                />
                            </div>

                            {/* Tempo na Empresa */}
                            <div className={classes.inputBox}>
                                <label htmlFor="tempo_empresa">Tempo na Empresa:</label>
                                <input
                                    className={classes['login-input']}
                                    id="tempo_empresa"
                                    name="tempo_empresa"
                                    onChange={textHandlerII}
                                    value={formDataII.tempo_empresa}
                                />
                            </div>

                            {/* Renda Familiar */}
                            <div className={classes.inputBox}>
                                <label htmlFor="remuneracao">Renda Familiar:</label>
                                <InputNumber
                                    formData={formDataII}
                                    setFormData={setFormDataII}
                                    className={classes['login-input']}
                                    id="remuneracao"
                                    name="remuneracao"
                                />
                            </div>

                            <div className={classes.comprometimentoBox}>

                                <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '5px', marginTop: '10px' }}>
                                    <p style={{ fontWeight: '70%', textAlign: 'center' }}>Compromentimento da Renda Familiar</p>


                                    {/* Comprometimento - Percentual */}
                                    <div className={classes.inputBoxCPF}>
                                        <label htmlFor="financ_valor">Percentual:</label>
                                        <InputNumber
                                            formData={formDataII}
                                            setFormData={setFormDataII}
                                            className={classes['login-input']}
                                            id="financ_valor"
                                            name="financ_valor"
                                        />

                                    </div>

                                    {/* Comprometimento - Prazo */}
                                    <div className={classes.inputBox}>
                                        <label htmlFor="financ_prazo">Prazo:</label>
                                        <input
                                            className={classes['login-input']}
                                            id="financ_prazo"
                                            name="financ_prazo"
                                            onChange={textHandlerII}
                                            value={formDataII.financ_prazo}
                                        />
                                    </div>

                                    {/* Comprometimento - Descrição */}
                                    <div className={classes.inputBox}>
                                        <label htmlFor="financ_descricao">Descrição:</label>
                                        <input
                                            className={classes['login-input']}
                                            id="financ_descricao"
                                            name="financ_descricao"
                                            onChange={textHandlerII}
                                            value={formDataII.financ_descricao}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>}

                    <div className={classes.botaoBox}>
                        {botao}
                    </div>

                </form>
                <div style={{ height: '20px' }}></div>

            </main>
        </div>
    );
}

export default ProponenteCadDados;