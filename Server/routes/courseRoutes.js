import express from "express";
import { getAllCourses, getCourseById, getCourseBySlug, getCategories, createCourse, updateCourse, deleteCourse } from "../controllers/courseController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/categories", getCategories);
router.get("/slug/:slug", getCourseBySlug);
router.get("/:id", getCourseById);
router.post("/", protect, admin, createCourse);
router.put("/:id", protect, admin, updateCourse);
router.delete("/:id", protect, admin, deleteCourse);

export default router;
