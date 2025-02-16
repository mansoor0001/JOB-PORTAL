import { generateToken } from "../config/generateToken.js";
import { upload } from "../middlewares/multer.middleware.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const options = {
    httpOnly: true,
    secure: true,
}

export const registerUser = async (req, res) => {
    try {

        const { fullname, contact, email, password, role } = req.body;

        if ([fullname, contact, email, password, role].some((field) => field?.trim() === "")) {
            return res
                .status(401)
                .json({
                    message: "All Fields Should be Filled",
                    success: false,
                })
        }


        const existedUser = await User.findOne({
            $or: [{ email }]
        })
        if (existedUser) {
            return res
                .status(400)
                .json({
                    message: "User Already Exist,please Login",
                    success: false,
                })
        }
        const user = await User.create({
            fullname,
            email,
            contact,
            password,
            role
        })
        if (!user) {
            return res
                .status(401)
                .json({
                    message: "Server busy,Please try again",
                    success: false
                })
        }
        return res
            .status(201)
            .json({
                message: "Registered Successfully, Please login",
                success: true
            })
    } catch (error) {
        console.log("Something went wrong at registerUser :", error);

    }

}

export const loginUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if ([username, email, password, role].some((field) => field?.trim() == "")) {
            return res
                .status(401)
                .json({
                    message: "All Fields Should be Filled",
                    success: false,
                })
        }

        const user = await User.findOne({
            $or: [{ username, email }]
        })
        if (!user) {
            return res
                .status(401)
                .json({
                    message: "No Users Found, Please Register",
                    success: true
                })
        }

        const isPasswordValid = await user.isCorrectPassword(password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({
                    message: "Email or Password incorrect",
                    success: false
                })
        }
        if (role !== user.role) {
            return res
                .status(401)
                .json({
                    message: "No email found for this role",
                    success: false
                })
        }

        const accessToken = await generateToken(user._id);
        // console.log("At LoginUser", accessToken);

        if (!accessToken) {
            return res
                .status(401)
                .json({
                    message: "Something went wrong,Please try again, at accessToken",
                    success: false,
                })
        }

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .json({
                accessToken,
                data: user,
                message: "User LoggedIn",
                success: true
            })
    } catch (error) {
        console.log("Something went wrong at loginUser", error);
    }
}

export const logoutUser = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "User not logged in , please login" })
        res.clearCookie("accessToken", options);
        return res.status(200).json({ message: "Successfully logged out", success: true });
    } catch (error) {
        console.log("Error : ", error)
        return res.status(500).json({ message: "Something went wrong during logout", success: false });
    }
}

export const updateProfile = async (req, res) => {
    try {

        const { fullname, email, contact, bio, skills } = req.body;
        // console.log(fullname, email, contact, bio, skills)

        const file = req?.file;
        // console.log("PDF URL:", user.data.profile.resume);
        if ([fullname, email, bio].some((field) => field?.trim() === "")) {
            return res.status(401).json({ message: "All fields should be filled", success: false })
        }
        if (!contact) return res.status(404).json({ message: "Contact information needed", success: false })
        const userId = req.user.id;

        let skillArray = skills.split(",");
        console.log(skillArray)
        if (!userId) {
            console.log("Error at userId userController :");

            return res.status(401).json({ message: "User Not Found,Please Login", success: false })
        }


        const localFilePath = req?.file?.path;
        if (!localFilePath) return res.status(404).json({ message: "File not uploaded", success: false })

        const upload = await uploadOnCloudinary(localFilePath);

        if (!upload) return res.status(404).json({ message: "URL not found at uploading the file url in user.controller.js" })

        console.log("cloudinary url :",upload.url)
        const updatedUser = await User.findByIdAndUpdate(userId, { fullname, email, contact,profile : { bio, resume: upload?.url, skills: skillArray,resumeName : file.originalname }}, { new: true }).select("-password");
    
        console.log("Updated User :",updatedUser)
        if (!updatedUser) {
            console.log("Error at updateUser at user.controller");

            return res.status(401).json({ message: "Something went wrong, please try again later", success: false })
        }
        // console.log("The update user is  :",updatedUser)

        return res.status(201).json({ message: "Successfully Updated", success: true,data : updatedUser })
    } catch (error) {
        console.log("Something went wrong at update profile", error)
    }
}

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, bio, skills } = req.body;
//         const userId = req.user?.id;

//         if (!userId) {
//             return res.status(401).json({ message: "User not found, please log in.", success: false });
//         }

//         if (!fullname?.trim() || !email?.trim()) {
//             return res.status(400).json({ message: "Full Name and Email are required.", success: false });
//         }

//         const skillArray = skills ? skills.split(" ") : [];

//         // Handle resume file if applicable (assuming you're using multer)
//         const resume = req.file ? req.file.filename : undefined;

//         const updateData = { fullname, email, bio, skills: skillArray };
//         if (resume) updateData.resume = resume;

//         const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
