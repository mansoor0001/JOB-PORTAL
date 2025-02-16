import { User } from "../models/user.model.js"

export const generateToken = async (userId) => {

    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not Found");
        }
        const accessToken = await user.generateAccessToken()
        console.log("generateToken", accessToken);
        return accessToken
    } catch (error) {
        console.log("Something went wrong at generateToken", error);


    }
}