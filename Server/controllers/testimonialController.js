import Testimonial from "../models/Testimonial.js";

export const createTestimonial = async (req, res) => {
    try {
        const { name, message, rating, course, designation } = req.body;

        const testimonial = await Testimonial.create({
            user: req.user ? req.user._id : null,
            name: name || (req.user ? req.user.name : "Anonymous"),
            email: req.user ? req.user.email : req.body.email,
            message,
            rating,
            course,
            designation,
            avatar: req.user ? req.user.avatar : ""
        });

        res.status(201).json({
            success: true,
            message: "Thank you for your testimonial! It will be reviewed shortly.",
            testimonial
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getApprovedTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isApproved: true })
            .sort({ createdAt: -1 })
            .limit(20);

        res.json({ success: true, count: testimonials.length, testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find()
            .sort({ createdAt: -1 });

        res.json({ success: true, count: testimonials.length, testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const approveTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );

        if (!testimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }

        res.json({ success: true, message: "Testimonial approved", testimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.json({ success: true, message: "Testimonial deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
