import express from "express"
import { loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js"
import { protectedRoute } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", protectedRoute, logoutUser)
router.post("/profile/update", protectedRoute, upload.single("resume"), updateProfile)
// router.post("/profile-update",protectedRoute,updateProfile)
// router.post("/logout",protectedRoute,logoutUser)

export default router;