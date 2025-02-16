import express from "express";
import { getAdminJobs, getAllJobs, getJobs, jobById, postJob, updateJobDetails } from "../controllers/job.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getAllJobs", getAllJobs)
router.post("/postJob", protectedRoute, postJob)
// router.get("/getJobs", protectedRoute, getJobs)
router.get("/getJobById/:id", jobById)
router.get("/getAdminJobs", protectedRoute, getAdminJobs)
router.post("/update/:id", protectedRoute, updateJobDetails)

export default router;