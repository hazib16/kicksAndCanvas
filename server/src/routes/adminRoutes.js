import express from "express"
import { authMiddleware } from "../middleware/auth.js"
import { blockUser, getAllUsers, unblockUser } from "../controllers/adminController.js"


const router = express.Router()


router.use(authMiddleware)


router.get('/users', getAllUsers)
router.patch('/users/:id/block', blockUser)
router.patch('/users/:id/unblock', unblockUser)