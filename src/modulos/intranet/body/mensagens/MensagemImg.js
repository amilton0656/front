import React from 'react'

const MensagemImg = ({titulo,cor,data,img}) => {
    return (
        <div className="intra-card intra-flex-center">

            <div className="intra-card__barra" style={{background: cor}}>
                <div className="intra-card__titulo">{titulo}</div>
                <div className="intra-card__date">{data}</div>
            </div>

            <div>
                <img src={img} className="intra-img-all" alt="foto"/>
            </div>

        </div>





    )
}


export default MensagemImg
