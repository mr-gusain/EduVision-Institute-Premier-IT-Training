import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        default: ""
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
        trim: true
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        minlength: [10, "Message must be at least 10 characters"]
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
