import {createSlice} from '@reduxjs/toolkit'


const initialState= {
    user: null,
    isAuthenticated: false,
    loading: true,
}

const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state,action)=>{
            state.user= action.payload
            state.isAuthenticated= !!action.payload
            state.loading= false
        },
        login: (state,action)=>{
            state.user= action.payload
            state.isAuthenticated= true
            state.loading= false

            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state)=>{
            state.user= null
            state.isAuthenticated= false
            state.loading= false

            localStorage.removeItem('user')
        },
        setLoading: (state, action)=>{
            state.loading= action.payload
        }
    }
})


export const {setUser,login,logout,setLoading}= authSlice.actions
export default authSlice.reducer


//selectors
export const selectUser= (state)=> state.auth.user
export const selectIsAuthenticated= (state)=> state.auth.isAuthenticated
export const selectAuthLoading= (state)=> state.auth.loading
