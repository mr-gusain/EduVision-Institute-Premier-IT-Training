import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    course: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5
    },
    message: {
        type: String,
        required: [true, "Testimonial message is required"],
        minlength: [10, "Message must be at least 10 characters"]
    },
    avatar: {
        type: String,
        default: ""
    },
    designation: {
        type: String,
        default: "Student"
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
