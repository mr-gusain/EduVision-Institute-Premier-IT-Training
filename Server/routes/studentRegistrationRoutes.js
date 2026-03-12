import express from "express";
import {
    submitRegistration,
    getMyRegistrations,
    getRegistrationByEnrollment,
    getAllRegistrations,
    updateRegistrationStatus
} from "../controllers/studentRegistrationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitRegistration);
router.get("/my", protect, getMyRegistrations);
router.get("/enrollment/:enrollmentId", protect, getRegistrationByEnrollment);
router.get("/all", protect, admin, getAllRegistrations);
router.patch("/:id/status", protect, admin, updateRegistrationStatus);

export default router;
