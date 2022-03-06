import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import clienteAxios from '../../../config/axios'
import classes from '../PessoaCad.module.css'
import { pessoasActions } from '../../../store/proponenteReducers'
import { cepMask, cpfMask, cnpjMask, cpfFormat, cnpjFormat, clearFormat } from '../../../util/util'
import Nav from '../../proponente/nav/NavProponente'

const PessoaCadComplemento = props => {

    const dispatch = useDispatch()

    const initialState = {
        data_nascimento: null,
        nacionalidade: null,
        sexo: 1,
        estado_civil: null,
        uniao_estavel: null,
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

    const location = useLocation()

    const [formData, setFormData] = useState(location.state || initialState)

    const textHandler = (event) => {

        let dataEntered = event.target.value

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

        if (event.target.name === 'uniao_estavel') {
            dataEntered = event.target.value === '0' ? '1' : '0'
        }

        if (event.target.name === 'conjuge_cpf') {
            dataEntered = cpfMask(event.target.value)
        }

        if (event.target.name === 'cep') {
            dataEntered = cepMask(event.target.value)
            if (event.target.value.length === 9) {
                onBuscarCep(event.target.value)

            }
        }

        setFormData({
            ...formData,
            [event.target.name]: dataEntered
            // .toUpperCase()
        })


    }


    const submitHandler = event => {
        event.preventDefault()

        console.log('form indo ', formData)

        clienteAxios.post('/pessoacomplemento/add', formData)
        .then(resposta => {
            console.log(resposta)

        })
        .catch(err => {
            console.log('Erro ao cadastrar ', err)
        })
        

        setFormData(initialState)
    }

    const editHandler = () => {

        dispatch(pessoasActions.editPessoa(formData))
        setFormData(initialState)
    }

    const botao = formData.id
        ? <button className={classes['botaoBox-button']} type="button" onClick={editHandler}>Salvar</button>
        : <button className={classes['botaoBox-button']} type="submit" >Salvar</button>

    const onBuscarCep = cep => {

        console.log('cep...', cep)


        axios.get(`https://api.postmon.com.br/v1/cep/${cep}`)
            .then(resposta => {
                const { logradouro, bairro, cidade, estado } = resposta.data

                setFormData(
                    {
                        ...formData,
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

    return (
        <div className={classes.container}>
            <Nav />

            <main className={classes.main}>
                <h2>Cadastro - Complemento</h2>
                <form onSubmit={submitHandler} className={classes.form}>

                    {/* Data de Nascimento */}
                    <div className={classes.inputBoxCPF}>
                        <label htmlFor="data_nascimento">Data de Nascimento:</label>
                        <input
                            className={classes['login-input']}
                            type='date'
                            id="data_nascimento"
                            name="data_nascimento"
                            onChange={textHandler}
                            value={formData.data_nascimento}
                        />
                    </div>

                    {/* Nacionalidade */}
                    <div className={classes.inputBox}>
                        <label htmlFor="nacionalidade">Nacionalidade:</label>
                        <input
                            className={classes['login-input']}
                            id="nacionalidade"
                            name="nacionalidade"
                            onChange={textHandler}
                            value={formData.nacionalidade}
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
                                    onChange={textHandler}
                                    value={formData.sexo}
                                    checked={formData.sexo === "1"}
                                /><label htmlFor="sexo1">Masculino</label>
                            </div>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='sexo'
                                    id="sexo2"
                                    onChange={textHandler}
                                    value={formData.sexo}
                                    checked={formData.sexo === "2"}
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
                                    onChange={textHandler}

                                    value={formData.estado_civil}
                                    checked={formData.estado_civil === "1"}
                                /><label htmlFor="estado_civil1">Solteiro(a)</label>
                            </div>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='estado_civil'
                                    id="estado_civil2"
                                    onChange={textHandler}
                                    value={formData.estado_civil}
                                    checked={formData.estado_civil === "2"}
                                /><label htmlFor="estado_civil2">Casado(a)</label>
                            </div>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='estado_civil'
                                    id="estado_civil3"
                                    onChange={textHandler}
                                    value={formData.estado_civil}
                                    checked={formData.estado_civil === "3"}
                                /><label htmlFor="estado_civil3">Separado(a)</label>
                            </div>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='estado_civil'
                                    id="estado_civil4"
                                    onChange={textHandler}
                                    value={formData.estado_civil}
                                    checked={formData.estado_civil === "4"}
                                /><label htmlFor="estado_civil4">Divorciado(a)</label>
                            </div>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='estado_civil'
                                    id="estado_civil5"
                                    onChange={textHandler}
                                    value={formData.estado_civil}
                                    checked={formData.estado_civil === "5"}
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
                                defaultChecked={formData.uniao_estavel === '0' ? false : true}
                                onChange={textHandler}
                                value={formData.uniao_estavel}
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
                            onChange={textHandler}
                            value={formData.conjuge_nome}
                        />
                    </div>

                    {/* CPF do Cônjuge */}
                    <div className={classes.inputBoxCPF}>
                        <label htmlFor="conjuge_cpf">CPF do Cônjuge:</label>
                        <input
                            className={classes['login-input']}
                            id="conjuge_cpf"
                            name="conjuge_cpf"
                            onChange={textHandler}
                            value={formData.conjuge_cpf}
                        />
                    </div>

                    {/* Regime de Casamento */}
                    <div className={classes.inputBox}>
                        <label htmlFor="regime_casamento">Regime de Casamento:</label>
                        <div className={classes.radioBox}>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='regime_casamento'
                                    id="regime_casamento1"
                                    onChange={textHandler}

                                    value={formData.regime_casamento}
                                    checked={formData.regime_casamento === "1"}
                                /><label htmlFor="regime_casamento1">Comunhão Universal de Bens</label>
                            </div>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='regime_casamento'
                                    id="regime_casamento2"
                                    onChange={textHandler}
                                    value={formData.regime_casamento}
                                    checked={formData.regime_casamento === "2"}
                                /><label htmlFor="regime_casamento2">Comunhão Parcial de Bens</label>
                            </div>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='regime_casamento'
                                    id="regime_casamento3"
                                    onChange={textHandler}

                                    value={formData.regime_casamento}
                                    checked={formData.regime_casamento === "3"}
                                /><label htmlFor="regime_casamento3">Separação de Bens</label>
                            </div>
                            <div className={classes.radioBoxLinha}>
                                <input
                                    type='radio'
                                    name='regime_casamento'
                                    id="regime_casamento4"
                                    onChange={textHandler}
                                    value={formData.regime_casamento}
                                    checked={formData.regime_casamento === "4"}
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
                            onChange={textHandler}
                            value={formData.data_casamento}
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
                            onChange={textHandler}
                            value={formData.pacto_nupcial}
                        />
                    </div>

                    {/* Profissão */}
                    <div className={classes.inputBox}>
                        <label htmlFor="profissao">Profissão:</label>
                        <input
                            className={classes['login-input']}
                            id="profissao"
                            name="profissao"
                            onChange={textHandler}
                            value={formData.profissao}
                        />
                    </div>

                    {/* Número de Dependentes */}
                    <div className={classes.inputBoxCPF}>
                        <label htmlFor="numero_dependentes">Número de Dependentes:</label>
                        <input
                            className={classes['login-input']}
                            id="numero_dependentes"
                            name="numero_dependentes"
                            onChange={textHandler}
                            value={formData.numero_dependentes}
                        />
                    </div>

                    {/* Número do RG */}
                    <div className={classes.inputBox}>
                        <label htmlFor="rg">Número do RG:</label>
                        <input
                            className={classes['login-input']}
                            id="rg"
                            name="rg"
                            onChange={textHandler}
                            value={formData.rg}
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
                            onChange={textHandler}
                            value={formData.data_expedicao}
                        />
                    </div>

                    {/* Órgao Emissor / UF */}
                    <div className={classes.inputBox}>
                        <label htmlFor="orgao_emissor_uf">Órgão Emissor / UF:</label>
                        <input
                            className={classes['login-input']}
                            id="orgao_emissor_uf"
                            name="orgao_emissor_uf"
                            onChange={textHandler}
                            value={formData.orgao_emissor_uf}
                        />
                    </div>

                    {/* Empresa onde trabalha */}
                    <div className={classes.inputBox}>
                        <label htmlFor="empresa_nome">Empresa onde trabalha:</label>
                        <input
                            className={classes['login-input']}
                            id="empresa_nome"
                            name="empresa_nome"
                            onChange={textHandler}
                            value={formData.empresa_nome}
                        />
                    </div>

                    {/* Cargo */}
                    <div className={classes.inputBox}>
                        <label htmlFor="cargo">Cargo:</label>
                        <input
                            className={classes['login-input']}
                            id="cargo"
                            name="cargo"
                            onChange={textHandler}
                            value={formData.cargo}
                        />
                    </div>

                    {/* Tempo na Empresa */}
                    <div className={classes.inputBox}>
                        <label htmlFor="tempo_empresa">Tempo na Empresa:</label>
                        <input
                            className={classes['login-input']}
                            id="tempo_empresa"
                            name="tempo_empresa"
                            onChange={textHandler}
                            value={formData.tempo_empresa}
                        />
                    </div>

                    {/* Renda Familiar */}
                    <div className={classes.inputBox}>
                        <label htmlFor="remuneracao">Renda Familiar:</label>
                        <input
                            className={classes['login-input']}
                            id="remuneracao"
                            name="remuneracao"
                            onChange={textHandler}
                            value={formData.remuneracao}
                        />
                    </div>

                    <div className={classes.comprometimentoBox}>

                        <div>
                            Compromentimento da Renda Familiar
                        </div>

                        {/* Comprometimento - Percentual */}
                        <div className={classes.inputBoxCPF}>
                            <label htmlFor="financ_valor">Percentual:</label>
                            <input
                                className={classes['login-input']}
                                id="financ_valor"
                                name="financ_valor"
                                onChange={textHandler}
                                value={formData.financ_valor}
                            />
                        </div>

                        {/* Comprometimento - Prazo */}
                        <div className={classes.inputBox}>
                            <label htmlFor="financ_prazo">Prazo:</label>
                            <input
                                className={classes['login-input']}
                                id="financ_prazo"
                                name="financ_prazo"
                                onChange={textHandler}
                                value={formData.financ_prazo}
                            />
                        </div>

                        {/* Comprometimento - Descrição */}
                        <div className={classes.inputBox}>
                            <label htmlFor="financ_descricao">Descrição:</label>
                            <input
                                className={classes['login-input']}
                                id="financ_descricao"
                                name="financ_descricao"
                                onChange={textHandler}
                                value={formData.financ_descricao}
                            />
                        </div>

                    </div>


                    <div className={classes.botaoBox}>
                        {botao}
                    </div>
                </form>
                <div style={{ height: '20px' }}></div>

            </main>
        </div>
    );
}

export default PessoaCadComplemento;