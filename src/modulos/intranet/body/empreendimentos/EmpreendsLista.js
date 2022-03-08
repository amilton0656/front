import React, { useState, Fragment } from 'react'

import Empreend_Ramais from '../telefones/Empreend_Ramais'
import Empreend_Telefones from '../telefones/Empreend_Telefones'
import Empreend_Modelo from './Empreend_Modelo'

const EmpreendLista = ({ history }) => {

    const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth)

    window.addEventListener('resize', function () {
        setTamanhoTela(window.innerWidth)
    });

    return (

        <div>
            {/* {tamanhoTela} */}
            {
                tamanhoTela > 700
                    ?
                    <>
                        <Empreend_Ramais />
                        <Empreend_Telefones />
                    </>
                    : null
            }

            <Empreend_Modelo 
                logo = 'img/Vivaz Condominio Jardim - Logo.jpg' 
                fachada = 'img/Vivaz Condominio Jardim - Fachada.jpg' />

            <Empreend_Modelo 
                logo = 'img/Porto Mare Residence - Logo.jpg' 
                fachada = 'img/Porto Mare Residence - Fachada.jpg' />  

            <Empreend_Modelo 
                logo = 'img/Horizonte Novo Estreito - Logo.jpg' 
                fachada = 'img/Horizonte Novo Estreito - Fachada.jpg' />  

            <Empreend_Modelo 
                logo = 'img/Urban Classic - Logo.jpg' 
                fachada = 'img/Urban Classic - Fachada.jpg' />  

            <Empreend_Modelo 
                logo = 'img/City_Logo.jpg' 
                fachada = 'img/City_Fachada.jpg' />     

            <Empreend_Modelo 
                logo = 'img/SolarDeGaia - Logo.jpg' 
                fachada = 'img/SolarDeGaia - Fachada.jpg' />              

        </div>
    )
}

export default EmpreendLista