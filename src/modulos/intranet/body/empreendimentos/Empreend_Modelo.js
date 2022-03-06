import React from 'react'
import Card from '../../../../components/Card'

import './Empreend_Modelo.css'

const EmpreendimentoModelo = ({ logo, fachada }) => {


    return (
        <div>

            <div className="intra-empreend-card">
                <Card>
                    <a onclick="pg_const()" href="#">
                        <div>
                            <div>
                                <img src={logo} class="intra-empreend-card-fluid" alt="foto" />
                            </div>
                            <div>
                                <img src={fachada} class="intra-empreend-card-fluid" alt="foto" />
                            </div>
                        </div>
                    </a>

                </Card>
            </div>

        </div>
    )
}

export default EmpreendimentoModelo