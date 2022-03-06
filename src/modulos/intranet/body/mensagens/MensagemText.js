import React from 'react'
import Card from '../../../../components/Card'

import './Mensagem.css'


const MensagemMod01 = ({ titulo, cor, data, texto }) => {
    const tex = texto
    return (
        <div className="intra-card">
            <Card style ={{padding: '5px'}}>
                <div style ={{overflow: 'hidden'}}>
                <div className="intra-card__barra" style={{ background: cor }}>
                    <div className="intra-card__titulo" >{titulo}</div>
                    <div className="intra-card__date">{data}</div>
                </div>
                <div className="intra-card__texto">
                    {tex}
                </div>

                </div>

            </Card>
        </div>
    )
}

export default MensagemMod01