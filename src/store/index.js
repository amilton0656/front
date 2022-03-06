import { configureStore } from '@reduxjs/toolkit'

import loginSlice from './loginReducers'
import usuariosSlice from './usuarioReducers'
import pessoasSlice from './pessoaReducers'

const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        usuarios: usuariosSlice.reducer,
        pessoas: pessoasSlice.reducer
    }
})

export default store
