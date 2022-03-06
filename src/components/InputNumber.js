import React, { useState, useEffect } from 'react'

import { convertToReal } from '../util/util'

const InputNumber = props => {

    const [valorE, setValorE] = useState('')
    const [valorN, setValorN] = useState('')

    useEffect(() => {
        setValorN(props.value ? props.value.toString().replace(/\D/g, '') : '')
        setValorE(convertToReal(props.value))
    }, [])

    const getKey = event => {

        let valN
        let valE

        if (event.which === 8) {
            valN = Math.trunc(valorN/10)
            setValorN(valN)

            props.setFormData({
                ...props.formData,
                [props.name]: valN/100
            })

            valE = convertToReal(valN/100)
            setValorE(valE)
        }

        if (valN === 0) {
            setValorE('')
        }

        if (isNaN(event.key)) { return }

        valN = valorN
        valN = parseInt(valN + event.key)
        setValorN(valN)

        props.setFormData({
            ...props.formData,
            [props.name]: valN/100
        })

        valE = convertToReal(valN/100)
        setValorE(valE)
    }

    return (
            <input
                className={props.className}
                value={valorE}
                onKeyDown={getKey}
            />
    );
}

export default InputNumber;