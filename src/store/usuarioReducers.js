import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    usuarios: []
}


const usuariosSlice = createSlice({
    name: 'usuarios',
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

        loadUsuarios(state, action) {
            state.usuarios = action.payload
        }



        
    }
})

export const usuariosActions = usuariosSlice.actions

export default usuariosSlice
  