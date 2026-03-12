import mongoose from "mongoose";

const studentRegistrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    enrollment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other", "Prefer not to say"],
        required: [true, "Gender is required"]
    },
    address: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        pincode: { type: String, required: true, trim: true }
    },
    qualification: {
        type: String,
        required: [true, "Qualification is required"],
        enum: ["10th Pass", "12th Pass", "Diploma", "Graduate", "Post Graduate", "Other"]
    },
    collegeName: {
        type: String,
        trim: true,
        default: ""
    },
    experience: {
        type: String,
        enum: ["Fresher", "0-1 Years", "1-3 Years", "3-5 Years", "5+ Years"],
        default: "Fresher"
    },
    guardianName: {
        type: String,
        trim: true,
        default: ""
    },
    guardianPhone: {
        type: String,
        trim: true,
        default: ""
    },
    preferredBatch: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening", "Weekend"],
        required: [true, "Preferred batch is required"]
    },
    howDidYouHear: {
        type: String,
        enum: ["Social Media", "Google Search", "Friend/Family", "Advertisement", "YouTube", "Other"],
        default: "Other"
    },
    additionalNotes: {
        type: String,
        trim: true,
        default: ""
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true
});

studentRegistrationSchema.index({ user: 1, enrollment: 1 }, { unique: true });

const StudentRegistration = mongoose.model("StudentRegistration", studentRegistrationSchema);
export default StudentRegistration;
