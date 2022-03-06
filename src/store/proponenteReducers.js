import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pessoas: [{
        id: '1',
        nome: 'aaaaaa',
        email: '',
        telefone: '',
    },
    {
        id: '2',
        nome: 'bbbbbb',
        email: '',
        telefone: '',
    }]
}

const pessoasSlice = createSlice({
    name: 'pessoas',
    initialState,
    reducers: {
        addPessoa(state, action) {
            state.pessoas.push({...action.payload, id: Math.random().toString()})
        },
        editPessoa(state, action) {
            const proponenteIndex = state.pessoas.findIndex(pes => pes.id === action.payload.id)
            state.pessoas[proponenteIndex] = action.payload

        },
        deletePessoa(state, action) {
            state.pessoas = state.pessoas.filter(pes => pes.id !== action.payload)
        }
    }
})

export const pessoasActions = pessoasSlice.actions

export default pessoasSlice
  