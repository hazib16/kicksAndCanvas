import { success } from "zod"

export const validate= (schema)=>{
    return (req,res,next)=>{
        try {
            const validatedData= schema.parse(req.body)

            req.body= validatedData
            next()
        } catch (error) {
            if(error.errors){
                const formatedErrors= error.errors.map((err)=>({
                    field: err.path.join('.'),
                    message: err.message,
                }))

                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: formatedErrors,
                })
            }
            return res.status(400).json({
                success: false,
                message: error.message || "Validation failed",
            })
        }
    }
}