import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    website :{
        type : String ,
    },
    logo: {
        type: String // Importing image from cloudinary 
    },
    location : {
        type : String ,
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }


}, { timestamps: true })

export const Company = mongoose.model("Company", companySchema)