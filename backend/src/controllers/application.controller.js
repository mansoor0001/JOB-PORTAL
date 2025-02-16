import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;


        // Ensure job exists
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found", success: false });

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication)
            return res.status(400).json({ message: "You already applied for this job", success: false });

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        const populatedApplication = await Application.findById(newApplication._id).populate('applicant job');

        // Add the application to the job's applications list

        return res.status(201).json({ data: populatedApplication, message: "Job applied successfully", success: true });
    } catch (error) {
        console.error("Error in applyJob controller:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const appliedJobs = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        })
        if (!appliedJobs.length) return res.status(401).json({ message: "No Applications Found", success: false })

        return res.status(201).json({ appliedTo: appliedJobs.length, appliedJobs, success: true })
    } catch (error) {
        console.log("Something went wrong at getAppliedJobs :", error);

    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        if (!jobId) return res.status(404).json({ message: "jobId is required", success: false })

        const jobs = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: -1 } },
            },
        });
      
        if (!jobs) return res.status(404).json({ message: "No Applicants Found", success: false })

        return res.status(201).json({ jobs, success: true })

    } catch (error) {
        console.log("Something went wrong at getApplicants at application.controller.js :", error);
    }
}

export const updateStatus = async (req, res) => {
    
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) return res.status(404).json({ message: "Status Not Found", success: false })

        const application = await Application.findById(applicationId);
        if (!application) return res.status(404).json({ message: "Application Not Found", success: false })
        application.status = status.toLowerCase();
        await application.save();

        return res.status(201).json({ message: "Status Updated Successfully", success: true })
    } catch (error) {
        console.log("Something went wrong at updateStatus in application.controller.js :", error);

    }
}