import { useSelector } from "react-redux"
import { selectIsAuthenticated, selectUser } from "../store/slices/authSlice"
import { Navigate } from "react-router-dom"



const AdminProtectedRoute= ({children})=>{
    const isAuthenticated= useSelector(selectIsAuthenticated)
    const user= useSelector(selectUser)

    if(!isAuthenticated){
        return <Navigate to='/login' replace/>
    }

    if(user?.role!=='admin'){
        return <Navigate to='/' replace/>
    }

    return children
}

export default AdminProtectedRoute