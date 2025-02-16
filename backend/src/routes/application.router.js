import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router() ;

router.post("/apply/:id",protectedRoute,applyJob)
router.get("/applied/jobs",protectedRoute,getAppliedJobs)
router.get("/get/applicant/:id",protectedRoute,getApplicants)
router.post("/update/status/:id",protectedRoute,updateStatus)

export default router ;