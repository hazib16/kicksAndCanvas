import jwt from "jsonwebtoken"
import { verifyAccessToken } from "../utils/tokenUtils.js"

export const authMiddleware= (req,res,next)=>{
    try {
        const token = req.cookies.accessToken || req.header.authorization?.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided",
            })
        }
        const decoded= verifyAccessToken(token)
        req.user= decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid Token"
        })
    }
}