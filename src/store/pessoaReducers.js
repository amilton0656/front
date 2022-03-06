import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    pessoas: [],
    pessoa: {},
    complemento: {},
    contatos: [],
    contato: {},
    atualizar: true
}


const pessoasSlice = createSlice({
    name: 'pessoas',
    initialState,
    reducers: {
        addPessoa(state, action) {
            // state.usuarios.push({...action.payload})
            console.log("adding...")
        },
        editPessoa(state, action) {
            // const usuarioIndex = state.usuarios.findIndex(pes => pes.id === action.payload.id)
            // state.usuarios[usuarioIndex] = action.payload
            console.log("editing...")

        },
        deletePessoa(state, action) {
            // state.usuarios = state.usuarios.filter(pes => pes.id !== action.payload)
            console.log("deleting...")
        },

        loadPessoas(state, action) {
            state.pessoas = action.payload
        },

        setPessoa(state, action) {
            state.pessoa = action.payload
        },

        loadContatos(state, action) {
            state.contatos = action.payload
        },

        setComplemento(state, action) {
            state.complemento = action.payload
        },

        setContato(state, action) {
            state.contato = action.payload
        },

        setAtualizar(state, action) {
            state.atualizar = action.payload
        }



        
    }
})

export const pessoasActions = pessoasSlice.actions

export default pessoasSlice
  