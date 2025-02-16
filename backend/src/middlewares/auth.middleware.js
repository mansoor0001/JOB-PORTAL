import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const protectedRoute = async (req, res,next) => {
    let token = req.headers.authorization;
    


    if (!token) return res.status(401).json({  message: "User not registered" })
        
        if (token && token.startsWith("Bearer")) {
            try {
                token = token.split(" ")[1];
                console.log("token at midddleware :",token);
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
            req.user = await User.findById(decoded.id).select("-password");

            await req.user.save()
            next();
        } catch (error) {
            res.status(404).json({ message: "Something went wrong, Please try again later..." })
            console.log("Something went wrong a auth.middleware",error);
            
        }
    }

}

// export const protectedRoute = async (req, res, next) => {
//         try {
//             let token = req.cookies?.accessToken;
//             console.log("accesstoken :",token)
//             if(!token) return res.status(401).json({message : "Token is Not Available",success:false})
//             const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)
//             req.user = await User.findById(decoded.id) ;
//             next();
//         } catch (error) {
//             console.log("Something went wrong, protectedRoute...",error)
//         }
        
//     }