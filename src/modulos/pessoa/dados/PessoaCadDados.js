import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import clienteAxios from '../../../config/axios'
// import classes from '../PessoaCad.module.css'
// import classes2 from '../lista/PessoaLista.module.css'
import { pessoasActions } from '../../../store/pessoaReducers'
import { cepMask, cpfMask, cnpjMask, validarCPF, validarCNPJ } from '../../../util/util'
import Nav from '../../proponente/nav/NavProponente'
import Form from '../../../components/Form'
import Input from '../../../components/Input'
import InputNumber from '../../../components/InputNumber'
import Button from '../../../components/Button'
import RadioBox from '../../../components/RadioBox'
import PessoaContatosLista from '../contatos/PessoaContatosLista'

import './pessoaCadDados.css'

const classes = {}
const classes2 = {}

const Header = props => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getOutHandle = () => {
        navigate(-1)
        dispatch(pessoasActions.setPessoa({}))
    }
    return (
        <div className='pessoa-container__header-buttons'>
            <h2 style={{ marginLeft: '5px' }}>Proponente</h2>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    className='w150'
                    bg='transparent'
                    c='white'
                    title='<<<  Voltar'
                    onClick={getOutHandle}
                    style={{ textAlign: 'right' }}
                />
            </div>


        </div>
    )
}

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

        console.log('id_pessoa ', id_pessoa)

        if (id_pessoa) {
            clienteAxios.get(`/pessoa/${id_pessoa}`, { headers: { Authorization: token } })
                .then(resposta => {
                    console.log('id_pessoa_datda ', resposta.data)
                    setFormDataI(resposta.data)
                    const id_pessoa = resposta.data.id_pessoa

                    checaCPF(resposta.data.tipo_pessoa, resposta.data.cpf_cnpj.replace(/\D/g, ''))


                    dispatch(pessoasActions.setPessoa(resposta.data))

                    clienteAxios.get(`/pessoacomplemento/id/${id_pessoa}`, { headers: { Authorization: token } })
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
                    console.log('id_pessoa_erro ', err)
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

        clienteAxios.put('/pessoa/upd', formDataI, { headers: { Authorization: token } })
            .then(resposta => {
                dispatch(pessoasActions.setPessoa(resposta.data))
            })
            .then(resposta => {
                if (formDataII.id_dados) {
                    clienteAxios.put('/pessoacomplemento/upd', formDataII, { headers: { Authorization: token } })
                        .then(resposta => {
                            dispatch(pessoasActions.setComplemento(resposta.data))
                        })
                        .catch(err => {
                            console.log('Erro ao cadastrar')
                        })

                } else {
                    clienteAxios.post('/pessoacomplemento/add', formDataII, { headers: { Authorization: token } })
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

    // const botao = !!formDataI.id_pessoa
    //     ? <button className={classes['botaoBox-button']} type="button" onClick={editHandle}>Salvar</button>
    //     : <button className={classes['botaoBox-button']} type="button" onClick={addHandle}>Salvar</button>

    const botao = !!formDataI.id_pessoa
        ? (
            <div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
                <Button
                    className='w150'
                    title='Salvar'
                    onClick={editHandle}
                />
            </div>

        )
        : (
            <div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
                <Button
                    className='w150'
                    title='Salvar'
                    onClick={addHandle}
                />
            </div>
        )


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


    return (
        <div className='pessoa-container'>
            <main className='pessoa-main'>
                <Header />
                <Form className='pessoa-form'>
                    <div>{formDataI.id_pessoa}</div>

                    <RadioBox
                        name='tipo_pessoa'
                        label='Tipo de Pessoa:'
                        direction='row'
                    >

                        <div className='form-radioBoxLinha'>
                            <input
                                type='radio'
                                name='tipo_pessoa'
                                id="tipo_pessoa1"
                                onChange={textHandlerI}
                                value={formDataI.tipo_pessoa}
                                checked={formDataI.tipo_pessoa.toString() === "1"}
                            /><label htmlFor="tipo_pessoa1">Física</label>

                        </div>

                        <div className='form-radioBoxLinha'>
                            <input
                                style={{ marginLeft: '50px' }}
                                type='radio'
                                name='tipo_pessoa'
                                id="tipo_pessoa2"
                                onChange={textHandlerI}
                                value={formDataI.tipo_pessoa}
                                checked={formDataI.tipo_pessoa.toString() === "2"}
                            /><label htmlFor="tipo_pessoa2">Jurídica</label>

                        </div>
                    </RadioBox>

                    {/* CPF / CNPJ */}
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <Input
                            label={formDataI.tipo_pessoa.toString() === '1' ? 'CPF:' : 'CNPJ:'}
                            type='text'
                            id='cpf_cnpj'
                            name='cpf_cnpj'
                            value={formDataI.cpf_cnpj}
                            onChange={textHandlerI}
                            onBlur={verCPF}
                            className='w200'
                        />
                        {
                            !cpfValido &&
                            <div style={{ margin: '7px 10px', color: 'red', fontWeight: 'bold' }}>
                                Inválido !
                            </div>
                        }

                    </div>

                    {/* Nome / Razão Social */}
                    <Input
                        label={formDataI.tipo_pessoa.toString() === '1' ? 'Nome:' : 'Razão Social:'}
                        type='text'
                        id='nome'
                        name='nome'
                        value={formDataI.nome}
                        onChange={textHandlerI}
                    />

                    {/* CEP */}
                    <Input
                        label='CEP:'
                        type='text'
                        id='cep'
                        name='cep'
                        value={formDataI.cep}
                        onChange={textHandlerI}
                        className='w100'
                    />

                    {/* Endereço */}
                    <Input
                        label='Endereço:'
                        type='text'
                        id='endereco'
                        name='endereco'
                        value={formDataI.endereco}
                        onChange={textHandlerI}
                    />

                    {/* Complemento */}
                    <Input
                        label='Complemento:'
                        type='text'
                        id='complemento'
                        name='complemento'
                        value={formDataI.complemento}
                        onChange={textHandlerI}
                    />

                    {/* Bairro */}
                    <Input
                        label='Bairro:'
                        type='text'
                        id='bairro'
                        name='bairro'
                        value={formDataI.bairro}
                        onChange={textHandlerI}
                    />

                    {/* Município */}
                    <Input
                        label='Município:'
                        type='text'
                        id='municipio'
                        name='municipio'
                        value={formDataI.municipio}
                        onChange={textHandlerI}
                    />

                    {/* UF */}
                    <div className='form-inputBox'>
                        <label htmlFor="uf">UF:</label>
                        <select
                            className='form-input'
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

                    {/* formDataI.id_pessoa && <PessoaContatosLista */}

                    {1 && <PessoaContatosLista
                        id_pessoa={formDataI.id_pessoa}
                        formDataI={formDataI}
                        formDataII={formDataII}
                        addHandle={addHandle}
                    />}

                    {
                        (formDataI.tipo_pessoa.toString() === '1') && <div>

                            {/* Data de Nascimento */}
                            <Input
                                label='Data de Nascimento:'
                                type='date'
                                id='data_nascimento'
                                name='data_nascimento'
                                value={formDataII.data_nascimento}
                                onChange={textHandlerII}
                                className='w170'
                            />


                            {/* Nacionalidade */}
                            <Input
                                label='Nacionalidade:'
                                type='text'
                                id='nacionalidade'
                                name='nacionalidade'
                                value={formDataII.nacionalidade}
                                onChange={textHandlerII}
                            />

                            {/* Sexo */}
                            <RadioBox
                                name='sexo'
                                label='Sexo:'
                                direction='row'
                            >

                                <div className='form-radioBoxLinha'>
                                    <input
                                        type='radio'
                                        name='sexo'
                                        id="sexo1"
                                        onChange={textHandlerII}
                                        value={formDataII.sexo}
                                        checked={formDataII.sexo.toString() === "1"}
                                    /><label htmlFor="sexo1">Masculino</label>
                                </div>
                                <div className='form-radioBoxLinha'>
                                    <input
                                        style={{ marginLeft: '50px' }}
                                        type='radio'
                                        name='sexo'
                                        id="sexo2"
                                        onChange={textHandlerII}
                                        value={formDataII.sexo}
                                        checked={formDataII.sexo.toString() === "2"}
                                    /><label htmlFor="sexo2">Feminino</label>
                                </div>

                            </RadioBox>

                            {/* Estado Civil */}
                            <RadioBox
                                name='estado_civil'
                                label='Estado Civil:'
                                direction='column'
                            >
                                <div className='form-radioBoxLinha'>
                                    <input
                                        type='radio'
                                        name='estado_civil'
                                        id="estado_civil1"
                                        onChange={textHandlerII}

                                        value={formDataII.estado_civil}
                                        checked={formDataII.estado_civil.toString() === "1"}
                                    /><label htmlFor="estado_civil1">Solteiro(a)</label>
                                </div>
                                <div className='form-radioBoxLinha'>
                                    <input
                                        type='radio'
                                        name='estado_civil'
                                        id="estado_civil2"
                                        onChange={textHandlerII}
                                        value={formDataII.estado_civil}
                                        checked={formDataII.estado_civil.toString() === "2"}
                                    /><label htmlFor="estado_civil2">Casado(a)</label>
                                </div>
                                <div className='form-radioBoxLinha'>
                                    <input
                                        type='radio'
                                        name='estado_civil'
                                        id="estado_civil3"
                                        onChange={textHandlerII}
                                        value={formDataII.estado_civil}
                                        checked={formDataII.estado_civil.toString() === "3"}
                                    /><label htmlFor="estado_civil3">Separado(a)</label>
                                </div>
                                <div className='form-radioBoxLinha'>
                                    <input
                                        type='radio'
                                        name='estado_civil'
                                        id="estado_civil4"
                                        onChange={textHandlerII}
                                        value={formDataII.estado_civil}
                                        checked={formDataII.estado_civil.toString() === "4"}
                                    /><label htmlFor="estado_civil4">Divorciado(a)</label>
                                </div>
                                <div className='form-radioBoxLinha'>
                                    <input
                                        type='radio'
                                        name='estado_civil'
                                        id="estado_civil5"
                                        onChange={textHandlerII}
                                        value={formDataII.estado_civil}
                                        checked={formDataII.estado_civil.toString() === "5"}
                                    /><label htmlFor="estado_civil5">Viúvo(a)</label>
                                </div>
                            </RadioBox>

                            {/* União Estável */}
                            <div className='form-checkboxBox'>
                                <input
                                    type='checkbox'
                                    className='form-input'
                                    id="uniao_estavel"
                                    name="uniao_estavel"
                                    defaultChecked={formDataII.uniao_estavel.toString() === '0' ? false : true}
                                    onChange={textHandlerII}
                                    value={formDataII.uniao_estavel}
                                />
                                <label htmlFor="uniao_estavel">União Estável:</label>
                            </div>

                            {/* Nome do Cônjuge */}
                            <Input
                                label='Nome do Cônjuge:'
                                type='text'
                                id='conjuge_nome'
                                name='conjuge_nome'
                                value={formDataII.conjuge_nome}
                                onChange={textHandlerII}
                            />

                            {/* CPF do Cônjuge */}
                            <Input
                                label='CPF do Cônjuge:'
                                type='text'
                                id='conjuge_cpf'
                                name='conjuge_cpf'
                                value={formDataII.conjuge_cpf}
                                onChange={textHandlerII}
                                // onBlur={verCPF}
                                className='w200'
                            />
                            {/* {
                            !cpfValido &&
                            <div style={{ margin: '7px 10px', color: 'red', fontWeight: 'bold' }}>
                                Inválido !
                            </div>
                        } */}

                            {
                                (formDataII.estado_civil.toString() === '2' || formDataII.estado_civil.toString() === '3') && <div>


                                    {/* Regime de Casamento */}

                                    <RadioBox
                                        name='regime_casamento'
                                        label='Regime de Casamento:'
                                        direction='column'
                                    >
                                        <div className='form-radioBoxLinha'>
                                            <input
                                                type='radio'
                                                name='regime_casamento'
                                                id="regime_casamento1"
                                                onChange={textHandlerII}

                                                value={formDataII.regime_casamento}
                                                checked={formDataII.regime_casamento.toString() === "1"}
                                            /><label htmlFor="regime_casamento1">Comunhão Universal de Bens</label>
                                        </div>
                                        <div className='form-radioBoxLinha'>
                                            <input
                                                type='radio'
                                                name='regime_casamento'
                                                id="regime_casamento2"
                                                onChange={textHandlerII}
                                                value={formDataII.regime_casamento}
                                                checked={formDataII.regime_casamento.toString() === "2"}
                                            /><label htmlFor="regime_casamento2">Comunhão Parcial de Bens</label>
                                        </div>
                                        <div className='form-radioBoxLinha'>
                                            <input
                                                type='radio'
                                                name='regime_casamento'
                                                id="regime_casamento3"
                                                onChange={textHandlerII}

                                                value={formDataII.regime_casamento}
                                                checked={formDataII.regime_casamento.toString() === "3"}
                                            /><label htmlFor="regime_casamento3">Separação de Bens</label>
                                        </div>
                                        <div className='form-radioBoxLinha'>
                                            <input
                                                type='radio'
                                                name='regime_casamento'
                                                id="regime_casamento4"
                                                onChange={textHandlerII}
                                                value={formDataII.regime_casamento}
                                                checked={formDataII.regime_casamento.toString() === "4"}
                                            /><label htmlFor="regime_casamento4">Outros</label>
                                        </div>
                                    </RadioBox>

                                    {/* Data do Casamento */}
                                    <Input
                                        label='Data do Casamento:'
                                        type='date'
                                        id='data_casamento'
                                        name='data_casamento'
                                        value={formDataII.data_casamento}
                                        onChange={textHandlerII}
                                        className='w170'
                                    />

                                    {/* Pacto Antenupcial */}
                                    <div className='form-inputBox'>
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
                            <Input
                                label='Profissão:'
                                type='text'
                                id='profissao'
                                name='profissao'
                                value={formDataII.profissao}
                                onChange={textHandlerII}
                            />

                            {/* Número de Dependentes */}
                            <Input
                                label='Número de Dependentes:'
                                type='text'
                                id='numero_dependentes'
                                name='numero_dependentes'
                                value={formDataII.numero_dependentes}
                                onChange={textHandlerII}
                                className='w200'
                            />


                            {/* Número do RG */}
                            <Input
                                label='Número do RG:'
                                type='text'
                                id='rg'
                                name='rg'
                                value={formDataII.rg}
                                onChange={textHandlerII}
                                className='w200'
                            />

                            {/* Data da Expedição */}
                            <Input
                                label='Data da Expedição:'
                                type='date'
                                id='data_expedicao'
                                name='data_expedicao'
                                value={formDataII.data_expedicao}
                                onChange={textHandlerII}
                                className='w170'
                            />

                            {/* Órgao Emissor / UF */}
                            <Input
                                label='Órgão Emissor / UF:'
                                type='text'
                                id='orgao_emissor_uf'
                                name='orgao_emissor_uf'
                                value={formDataII.orgao_emissor_uf}
                                onChange={textHandlerII}
                                className='w300'
                            />

                            {/* Empresa onde trabalha */}
                            <Input
                                label='Empresa onde trabalha:'
                                type='text'
                                id='empresa_nome'
                                name='empresa_nome'
                                value={formDataII.empresa_nome}
                                onChange={textHandlerII}
                            />

                            {/* Cargo */}
                            <Input
                                label='Cargo:'
                                type='text'
                                id='cargo'
                                name='cargo'
                                value={formDataII.cargo}
                                onChange={textHandlerII}
                            />

                            {/* Tempo na Empresa */}
                            <Input
                                label='Tempo na Empresa:'
                                type='text'
                                id='tempo_empresa'
                                name='tempo_empresa'
                                value={formDataII.tempo_empresa}
                                onChange={textHandlerII}
                                className='w200'
                            />

                            {/* Renda Familiar */}
                            <InputNumber
                                label='Renda Familiar:'
                                formData={formDataII}
                                setFormData={setFormDataII}
                                className='w150'
                                id="remuneracao"
                                name="remuneracao"
                                value={formDataII.remuneracao}
                            />


                            <div className={classes.comprometimentoBox}>

                                <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '5px', marginTop: '10px' }}>
                                    <p style={{ fontWeight: '70%', textAlign: 'center' }}>Compromentimento da Renda Familiar</p>


                                    {/* Comprometimento - Percentual */}
                                    <InputNumber
                                        label='Percentual:'
                                        formData={formDataII}
                                        setFormData={setFormDataII}
                                        className='w150'
                                        id="financ_valor"
                                        name="financ_valor"
                                    />

                                    {/* Comprometimento - Prazo */}
                                    <Input
                                        label='Prazo:'
                                        type='text'
                                        id='financ_prazo'
                                        name='financ_prazo'
                                        value={formDataII.financ_prazo}
                                        onChange={textHandlerII}
                                        className='w300'
                                    />


                                    {/* Comprometimento - Descrição */}
                                    <Input
                                        label='Descrição:'
                                        type='text'
                                        id='financ_descricao'
                                        name='financ_descricao'
                                        value={formDataII.financ_descricao}
                                        onChange={textHandlerII}
                                    />
                                </div>

                            </div>
                        </div>}

                    <div className={classes.botaoBox}>
                        {botao}
                    </div>
                </Form>
                {/* </form> */}
                <div style={{ height: '20px' }}></div>

            </main>
        </div >
    );
}

export default ProponenteCadDados;