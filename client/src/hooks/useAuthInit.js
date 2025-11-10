import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLoading, setUser } from "../store/slices/authSlice"



export const useAuthInit=()=>{
    const dispatch = useDispatch()

    useEffect(()=>{
        const userData= localStorage.getItem('user')

        if(userData){
            try {
                dispatch(setUser(JSON.parse(userData)))
            } catch (error) {
                console.error('Failed to parse user data: ', error)
                localStorage.removeItem('user')
                dispatch(setLoading(false))
            }
        }else{
            dispatch(setLoading(false))
        }
    }, [dispatch])
}