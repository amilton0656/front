import React, { useState } from 'react'

import './IntranetLayout.css'
import IntranetHeader from './header/IntranetHeader'

import Card from '../../components/Card'

import MensagensLista from './body/mensagens/MensagensLista'
import EmpreendsLista from './body/empreendimentos/EmpreendsLista'

import MensagemCub from './body/mensagens/MensagemCub'



const IntranetLayout = () => {



    const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth)

    return (
        <>
            <div className='intra-main'>

                <IntranetHeader />



                <div className='intra-body'>

                    <div className="intra-noticias">
                        <MensagensLista />
                    </div>

                    <div className="intra-empreendimentos">
                        <h1>Empreendimentos</h1>
                        <EmpreendsLista />
                    </div>
                </div>


                {/* <div className='intra-body'>

                    {
                        tamanhoTela > 700
                            ?
                            <div>
                                <div className="intra-noticias">

                                    <MensagensLista />
                                </div>
                                <div className="intra-empreendimentos">

                                    <EmpreendsLista />
                                </div>
                            </div>
                            :
                            <div>
                                <div className='intra-noticias'>

                                    <MensagensLista />
                                </div>
                                <div className="intra-empreendimentos">

                                    <div>
                                        <h3 style={{ textAlign: 'center' }}>Empreendimentos</h3>
                                    </div>

                                    <EmpreendsLista />
                                </div>
                            </div>
                    }
                </div> */}

            </div>
        </>
    )
}


export default IntranetLayout





