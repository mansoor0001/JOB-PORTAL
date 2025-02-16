import { upload } from "../middlewares/multer.middleware.js";
import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createCompany = async (req, res) => {
    try {

        const userId = req.user.id;
        if (!userId) res.status(404).json({ message: "Please login", success: false })

        const user = await User.findById(userId);
        if (user.role !== "recruiter") return res.status(404).json({ message: "Login as Recruiter to create jobs", success: false })
        const { name, description, location, website } = req.body;
        let logoUrl = null;
        if (req?.file) {

            const localFilePath = req?.file?.path;

            if (!localFilePath) {
                return res.status(404).json({
                    message: "File Path not Found, please try again later",
                    success: false
                })
            }

            const upload = await uploadOnCloudinary(localFilePath)
            if (!upload) {
                return res.status(404).json({
                    message: "Unable to upload logo, please try again later",
                    success: false
                })
            }
            logoUrl = upload?.url
        }
        const newCompany = await Company.create({
            name,
            description,
            location,
            userId,
            website,
            logo: logoUrl
        })
        if (!newCompany) return res
            .status(404)
            .json({
                message: "Failed to Add a Company",
                success: false
            })
        return res.
            status(201)
            .json({
                message: "Company successfully added",
                company: newCompany,
                success: true
            })
    } catch (error) {
        console.log("Something wrong at createCompany of company.controlller.js :", error)
    }
}

export const getAllCompanies = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) res.status(404).json({ message: "Please login", success: false })

        const companies = await Company.find();
        if (!companies) {
            return res.status(404).json({
                message: "Something went wrong , while fetching companies, please try again later",
                success: false
            })

        }

        return res.status(201).json({
            message: "Successfully fetched the Companies",
            success: true,
            data: companies
        })


    } catch (error) {
        console.log("Something went wrong at company.controller:", error);


    }
}

export const getCompanyById = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) res.status(404).json({ message: "Please login", success: false })

        const { id } = req?.params;
        const company = await Company.findOne({
            _id: id
        })
        if (!company) {
            return res.status(404).json({
                message: "Something went wrong , please try again later",
                success: false
            })
        }
        return res.status(201).json({
            message: "Successfully",
            company,
            success: true,
        })
    } catch (error) {
        console.log("Something went wrong at company.controller :", error);


    }
}

export const updateCompanyDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        if (!userId) {
            return res.status(404).json({ message: "Please login", success: false });
        }

        const { name, description, location, website } = req?.body;
        if ([name, description, location, website].some((val) => typeof val === 'string' && val.trim() === "")) {
            return res
                .status(401)
                .json({
                    message: "All Fields Should be Filled",
                    success: false,
                });
        }

        let logoUrl = null;
        if (req?.file) {
            const localFilePath = req?.file?.path;
            if (!localFilePath) {
                return res.status(404).json({
                    message: "File not Found",
                    success: false,
                });
            }

            const upload = await uploadOnCloudinary(localFilePath);
            if (!upload) {
                return res.status(404).json({
                    message: "Unable to upload logo, please try again later",
                    success: false,
                });
            }
            logoUrl = upload?.url;
        }

        const company = await Company.findByIdAndUpdate(
            {_id : id},
            {
                name,
                description,
                website,
                location,
                logo: logoUrl,
            },
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Failed to update company details",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company details updated successfully",
            company,
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
    