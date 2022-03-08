import React from 'react'
import './Mensagem.css'
import Card from '../../../../components/Card'

const MensagemImg = ({titulo,cor,data,img}) => {
    return (
        <div className="intra-card intra-flex-center">
            <Card>
            <div className="intra-card__barra" style={{background: cor}}>
                <div className="intra-card__titulo">{titulo}</div>
                <div className="intra-card__date">{data}</div>
            </div>

            <div>
                <img src={img} className="intra-img-all" alt="foto"/>
            </div>
            </Card>
        </div>





    )
}


export default MensagemImg
