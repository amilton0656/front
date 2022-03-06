import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    login: {
        id: '',
        usuario: '',
        auth: false,
        token: ''
    }
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        addUsuario(state, action) {
            // state.usuarios.push({...action.payload})
            console.log("adding...")
        },
        editUsuario(state, action) {
            // const usuarioIndex = state.usuarios.findIndex(pes => pes.id === action.payload.id)
            // state.usuarios[usuarioIndex] = action.payload
            console.log("editing...")

        },
        deleteUsuario(state, action) {
            // state.usuarios = state.usuarios.filter(pes => pes.id !== action.payload)
            console.log("deleting...")
        },

        login(state, action) {
            state.login = {
                ...state.login,
                id: action.payload.id,
                usuario: action.payload.usuario,
                auth: action.payload.auth,
                token: action.payload.token
            }
        }



        
    }
})

export const loginActions = loginSlice.actions

export default loginSlice
  