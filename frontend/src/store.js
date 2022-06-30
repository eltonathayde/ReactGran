import {configureStore} from '@reduxjs/toolkit'

// importando os reducer's
import authReducer from './slice/authSlice'
import userReducer from './slice/userSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    }
})