import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Course title is required"],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "Course description is required"]
    },
    shortDescription: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true,
        enum: ["Web Development", "Mobile Development", "Data Science", "Cloud Computing", "Cyber Security", "UI/UX Design", "Digital Marketing", "DevOps"]
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ""
    },
    syllabus: [{
        module: String,
        topics: [String]
    }],
    instructor: {
        type: String,
        default: "EduVision Institute"
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },
    totalStudents: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5
    },
    isActive: {
        type: Boolean,
        default: true
    },
    features: [String]
}, {
    timestamps: true
});

courseSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    next();
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
