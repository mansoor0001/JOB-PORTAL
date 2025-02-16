import express from "express";
import { createCompany, getAllCompanies, getCompanyById, updateCompanyDetails } from "../controllers/company.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router()

router.post("/create",protectedRoute,upload.single("logo"),createCompany)
router.get("/getAllCompanies",protectedRoute,getAllCompanies)
router.get("/getCompanyById/:id",protectedRoute,getCompanyById)
router.post("/update/company/details/:id",protectedRoute,upload.single("logo"),updateCompanyDetails)

export default router;