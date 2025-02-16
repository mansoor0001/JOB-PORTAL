import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    requirements: [{
        type: String
    }],
    experience: {
        type: String,
    },
    salary: {
        type: Number
    },
    location : {
        type : String,
    },
    positions: {
        type: Number,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jobType: {
        type: String,
    },
    requirements: [{
        type: String,
    }],
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    }]
}, { timestamps: true })

export const Job = mongoose.model("Job", jobSchema)