import express from "express"
// import cors from "cors"
import cors from "cors"
import cookieParser from "cookie-parser"
import { User } from "./models/user.model.js"
import { generateToken } from "./config/generateToken.js"
import { upload } from "./middlewares/multer.middleware.js"
import path from "path"
import { protectedRoute } from "./middlewares/auth.middleware.js"

const app = express()
// const corsOptions = {
//     origin: 'http://localhost:5173/', // Allow only this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     credentials: true // Allow cookies and authorization headers
// };


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors())
app.use(cors())
app.use(cookieParser())

// app.post('/api/user/profile/update', protectedRoute, async (req, res) => {
    // console.log("I am working")
    // try {

    //     const { fullname, email, contact, bio, skills } = req.body;
    //     console.log(fullname, email, contact, bio, skills)


    //     if ([fullname, email, bio].some((field) => field?.trim() === "")) {
    //         return res.status(401).json({ message: "All fields should be filled", success: false })
    //     }
    //     if (!contact) return res.status(404).json({ message: "Contact information needed", success: false })
    //     const userId = req.user.id;

    //     let skillArray = skills.split(",");
    //     if (!userId) {
    //         console.log("Error at userId userController :");

    //         return res.status(401).json({ message: "User Not Found,Please Login", success: false })
    //     }


    //     // const localFilePath = req.file?.path;

    //     // if (!localFilePath) return res.status(404).json({ message: "File not uploaded", success: false })

    //     // const upload = await uploadOnCloudinary(localFilePath);

    //     // if (!upload.url) return res.status(404).json({ message: "URL not found at uploading the file url in user.controller.js" })


    //     const updatedUser = await User.findByIdAndUpdate(userId, { fullname, email, contact, bio, skills: skillArray }, { new: true });

    //     if (!updatedUser) {
    //         console.log("Error at updateUser at user.controller");

    //         return res.status(401).json({ message: "Something went wrong, please try again later", success: false })
    //     }


    //     return res.status(201).json({ message: "Successfully Updated", success: true })
    // } catch (error) {
    //     console.log("Something went wrong at update profile", error)
    // }
// });

// user routes
import userRoutes from "./routes/user.router.js"
import jobRoutes from "./routes/job.router.js"
import applicationRoutes from "./routes/application.router.js"
import companyRoutes from "./routes/company.router.js"

app.use("/api/user", userRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/application", applicationRoutes)
app.use("/api/company", companyRoutes)

export { app };