import express from "express";
import { enrollInCourse, getMyEnrollments, cancelEnrollment, getAllEnrollments } from "../controllers/enrollmentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, enrollInCourse);
router.get("/my", protect, getMyEnrollments);
router.patch("/:id/cancel", protect, cancelEnrollment);
router.get("/all", protect, admin, getAllEnrollments);

export default router;