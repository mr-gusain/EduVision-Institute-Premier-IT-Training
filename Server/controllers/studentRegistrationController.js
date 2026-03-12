import StudentRegistration from "../models/StudentRegistration.js";
import Enrollment from "../models/Enrollment.js";

export const submitRegistration = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
            enrollmentId,
            courseId,
            fullName,
            email,
            phone,
            dateOfBirth,
            gender,
            address,
            qualification,
            collegeName,
            experience,
            guardianName,
            guardianPhone,
            preferredBatch,
            howDidYouHear,
            additionalNotes
        } = req.body;

        const enrollment = await Enrollment.findOne({ _id: enrollmentId, user: userId });
        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }

        const existingReg = await StudentRegistration.findOne({ user: userId, enrollment: enrollmentId });
        if (existingReg) {
            return res.status(400).json({ success: false, message: "Registration already submitted for this enrollment" });
        }

        const registration = await StudentRegistration.create({
            user: userId,
            enrollment: enrollmentId,
            course: courseId,
            fullName,
            email,
            phone,
            dateOfBirth,
            gender,
            address,
            qualification,
            collegeName,
            experience,
            guardianName,
            guardianPhone,
            preferredBatch,
            howDidYouHear,
            additionalNotes
        });

        const populatedReg = await StudentRegistration.findById(registration._id)
            .populate("course", "title category")
            .populate("user", "-password");

        res.status(201).json({
            success: true,
            message: "Registration submitted successfully!",
            registration: populatedReg
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ success: false, message: messages.join(", ") });
        }
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await StudentRegistration.find({ user: req.user._id })
            .populate("course", "title category duration level price instructor")
            .populate("enrollment")
            .populate("user", "-password")
            .sort({ createdAt: -1 });

        res.json({ success: true, count: registrations.length, registrations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getRegistrationByEnrollment = async (req, res) => {
    try {
        const registration = await StudentRegistration.findOne({
            user: req.user._id,
            enrollment: req.params.enrollmentId
        })
            .populate("course", "title category")
            .populate("enrollment");

        if (!registration) {
            return res.status(404).json({ success: false, message: "Registration not found" });
        }

        res.json({ success: true, registration });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await StudentRegistration.find()
            .populate("course", "title category duration level price instructor")
            .populate("user", "-password")
            .populate("enrollment")
            .sort({ createdAt: -1 });

        res.json({ success: true, count: registrations.length, registrations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateRegistrationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const registration = await StudentRegistration.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
            .populate("course", "title category")
            .populate("user", "-password");

        if (!registration) {
            return res.status(404).json({ success: false, message: "Registration not found" });
        }

        res.json({ success: true, message: `Registration ${status}`, registration });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
