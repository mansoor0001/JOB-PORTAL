import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, experience, requirements, salary, location, jobType, positions, companyId } = req.body;

        // Validate input
        if (![title, description, experience, location, requirements, salary, jobType, positions, companyId].every(Boolean)) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const userId = req.user._id; // Ensure req.user is set by authentication middleware

        // Create Job
        const postedJob = await Job.create({
            title,
            description,
            experience,
            requirements: requirements.split(",").map((req) => req.trim()),
            salary: Number(salary),
            location,
            jobType,
            positions,
            created_by: userId,
            company: companyId,
        });

        return res.status(201).json({ message: "Job posted successfully", job: postedJob, success: true });
    } catch (error) {
        console.error("Something went wrong at job creation:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const getJobs = async (req, res) => {
    try {
        const searchQuery = req.query.search
            ? {
                $or: [
                    { title: { $regex: req.query.search, $options: "i" } },
                    { jobType: { $regex: req.query.search, $options: "i" } },
                ],
            }
            : {};

        const jobs = await Job.find(searchQuery);

        if (!jobs.length) {
            return res.status(404).json({ message: "No jobs found", success: false });
        }

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error("Something went wrong at getJobs:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const allJobs = await Job.find().populate("company applications");
        if (!allJobs || allJobs.length === 0) {
            return res.status(404).json({
                message: "No Jobs Found",
                success: fail,
            })
        }

        return res.status(201).json({
            message: "Jobs Found",
            success: true,
            data: allJobs
        })

    } catch (error) {
        console.log("Something went wrong at getAllJobs :", error)
    }
}

export const jobById = async (req, res) => {

    try {
        const jobId = req.params.id;


        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required", success: false });
        }

        const job = await Job.findById(jobId).populate("company applications");

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error("Something went wrong at jobById:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.id;

        if (!adminId) {
            return res.status(400).json({ message: "Admin ID is required", success: false });
        }

        const adminJobs = await Job.find({ created_by: adminId }).populate("applications company");

        if (!adminJobs.length) {
            return res.status(404).json({ message: "No jobs found for this admin", success: false });
        }

        return res.status(200).json({ adminJobs, success: true });
    } catch (error) {
        console.error("Something went wrong at getAdminJobs:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const updateJobDetails = async (req, res) => {

    try {
        const userId = req.user.id;
        const id = req.params.id;

        if (!userId) {
            return res.status(404).json({ message: "Please login", success: false });
        }

        const { title, description, requirements, salary, jobType, experience, positions, companyId } = req?.body;
        if (![title, description, requirements, jobType, salary, positions, experience, companyId].every((Boolean))) {

            return res
                .status(401)
                .json({
                    message: "All Fields Should be Filled",
                    success: false,
                });
        }

        const jobUpdate = await Job.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                requirements: typeof requirements === 'string' 
                ? requirements.split(",").map((req) => req.trim()) 
                : [],
                salary : Number(salary),
                jobType,
                experience,
                positions,
                companyId
            },
            { new: true }
        );

        if (!jobUpdate) {
            return res.status(404).json({
                message: "Failed to update company details",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company details updated successfully",
            jobUpdate,
            success: true,
        });

    } catch (error) {
        console.error("Error in updateCompanyDetails:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
