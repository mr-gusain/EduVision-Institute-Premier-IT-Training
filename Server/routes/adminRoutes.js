import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Contact from "../models/Contact.js";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

router.get("/stats", protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "student" });
        const totalCourses = await Course.countDocuments();
        const totalEnrollments = await Enrollment.countDocuments({ status: "active" });
        const totalContacts = await Contact.countDocuments();
        const unreadContacts = await Contact.countDocuments({ isRead: false });
        const pendingTestimonials = await Testimonial.countDocuments({ isApproved: false });

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalCourses,
                totalEnrollments,
                totalContacts,
                unreadContacts,
                pendingTestimonials
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

router.get("/users", protect, admin, async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

export default router;
