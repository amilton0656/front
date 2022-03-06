import React from 'react'


const Empreend_TelefonesNome = (pessoa) => {

    const { contatos } = pessoa

    const mostrarNome = <p>{contatos.nome}</p>

    const mostrarContatos = contatos.contatos !== null
    ? contatos.contatos.map(cont => {

        let aa = cont.observacao
        if (cont.observacao !== null) aa = aa.trim()

        if (aa !== '') {
            return <p>{cont.contato} - {cont.observacao}</p>
        } else return <p>{cont.contato}</p>

    })
    
    : null

    return (
        <div className="intra-card-contato">
            {mostrarNome}
            {mostrarContatos}
        </div>
    )
}

export default Empreend_TelefonesNome

