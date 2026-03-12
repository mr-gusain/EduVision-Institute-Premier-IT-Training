import express from "express";
import { createTestimonial, getApprovedTestimonials, getAllTestimonials, approveTestimonial, deleteTestimonial } from "../controllers/testimonialController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTestimonial);
router.get("/", getApprovedTestimonials);
router.get("/all", protect, admin, getAllTestimonials);
router.patch("/:id/approve", protect, admin, approveTestimonial);
router.delete("/:id", protect, admin, deleteTestimonial);

export default router;
