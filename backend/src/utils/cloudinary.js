import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
})

cloudinary.config({ 
    cloud_name: 'ddell5lzz', 
    api_key: '587787941298997', 
    api_secret: '-C_KEc_iOjnjLwI5-9_VBzRCUyk' // Click 'View API Keys' above to copy your API secret
});


export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return res.status(404).json({ message: "Path not found", success: false })
    
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("Something went wrong at while uploading file in cloudinary :",error)
    }
}