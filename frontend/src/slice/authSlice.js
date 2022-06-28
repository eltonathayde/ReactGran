import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

// pegando o usuario do localStorage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user :null,
    error:false,
    success:false,
    loading: false,
};

// registando um usuario e fazendo login 

export const register = createAsyncThunk("auth/register",
async(user, thunkAPI) =>{

    const data = await authService.register(user)

    // checagem de erros, rejeitando requisição se tiver erros

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

     return data;
}
);

export const authSlice =  createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending,(state) => {
            state.loading = true ;
            state.error = false;
        })
        .addCase(register.fulfilled,(state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            
            // quando a requisição é rejeitada vem para esse caso, informando os erros
        })
        .addCase(register.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.user = null
        })
   
    }
})
export const {reset} = authSlice.actions

export default authSlice.reducer