import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

export const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user._id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ success: false, message: "Already enrolled in this course" });
        }

        const enrollment = await Enrollment.create({
            user: userId,
            course: courseId,
            status: "active"
        });

        await User.findByIdAndUpdate(userId, {
            $addToSet: { enrolledCourses: courseId }
        });

        await Course.findByIdAndUpdate(courseId, {
            $inc: { totalStudents: 1 }
        });

        const populatedEnrollment = await Enrollment.findById(enrollment._id)
            .populate("course")
            .populate("user", "-password");

        res.status(201).json({
            success: true,
            message: `Successfully enrolled in ${course.title}!`,
            enrollment: populatedEnrollment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user._id })
            .populate("course")
            .sort({ createdAt: -1 });

        res.json({ success: true, count: enrollments.length, enrollments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const cancelEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }

        enrollment.status = "cancelled";
        await enrollment.save();

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { enrolledCourses: enrollment.course }
        });

        await Course.findByIdAndUpdate(enrollment.course, {
            $inc: { totalStudents: -1 }
        });

        res.json({ success: true, message: "Enrollment cancelled successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate("course")
            .populate("user", "-password")
            .sort({ createdAt: -1 });

        res.json({ success: true, count: enrollments.length, enrollments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
