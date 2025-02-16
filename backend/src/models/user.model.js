import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        contact : {
            type:Number,
            required:true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['student', 'recruiter'],
            required: true, // Consider making this required if every user should have a role
        },
        profile: {
            bio: { type: String },
            skills: [{ type: String }], // Changed to an array for multiple skills
            resume: { type: String },
            resumeName : String,
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company",
            },
            profilePhoto: {
                type: String, // Fixed typo here
                default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEiaDNDqRo6K0Zn_NlRJjAde-B1zommEhIg&s",
            },
        },
    },
    { timestamps: true } // Correctly set timestamps
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

export const User = mongoose.model("User", userSchema);