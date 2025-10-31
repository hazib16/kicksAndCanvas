import axiosInstance from "./axiosInstance";



export const userSignup= async(userData)=>{
    try {
        const response= await axiosInstance.post("/auth/signup", userData)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Signup Failed"
    }
}