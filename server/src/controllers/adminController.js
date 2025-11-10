import User from "../models/userModel"


///Get all users
export const getAllUsers= async(req,res)=>{
    try {
        const {
            page=1,
            limit=10,
            search= "",
            sortBy= "createdAt",
            order= "desc"
        }= req.query

        const filter= {role: "user"}

        if(search){
            filter.$or= [
                {name: {$regex: search, $options: "i"}},
                {email: {$regex: search, $options: "i"}},
                {phone: {$regex: search, $options: "i"}},
            ]
        }

        const sortObj ={}
        sortObj[sortBy]= order=== "desc" ? -1 : 1

        const skip= (page -1)* limit


        const users= await User.find(filter)
        .sort(sortObj)
        .limit(parseInt(limit))
        .skip(skip)
        .select("-password")

        const total= await User.countDocuments(filter)

        res.json({
            success: true,
            users,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit),
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message,
        })
    }
}



///Block User
export const blockUser= async (req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if(user.role=== "admin"){
            return res.status(403).json({
                success: false,
                message: "Cannot block admin users",
            })
        }

        user.isBlocked = true
        await user.save()


        res.json({
            success: true,
            message: "User blocked successfully",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                isBlocked: user.isBlocked,
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error blocking user",
            error: error.message,
        })
    }
}



///Unblock User
export const unblockUser= async (req, res)=>{
    try {
        const {id} = req.params
        const user= await User.findById(id)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        user.isBlocked= false
        await user.save()

        res.json({
            success: true,
            message: "User successfully unblocked",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                isBlocked: user.isBlocked,
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error unblocking user",
            error: error.message,
        })
    }
}


