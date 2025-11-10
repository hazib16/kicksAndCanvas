import { useSelector } from "react-redux"
import { selectAuthLoading, selectIsAuthenticated } from "../store/slices/authSlice"
import { Navigate } from "react-router-dom"



const PublicRoute= ({children})=>{
    const isAuthenticated= useSelector(selectIsAuthenticated)
    const loading= useSelector(selectAuthLoading)

    if(loading){
        return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
    }


    if(isAuthenticated){
        return <Navigate to='/' replace />
    }

    return children
}

export default PublicRoute