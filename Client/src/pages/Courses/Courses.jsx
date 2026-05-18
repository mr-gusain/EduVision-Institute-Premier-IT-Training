import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../utils/api";
import { FiSearch, FiFilter, FiStar, FiClock, FiUsers, FiChevronDown, FiChevronUp, FiCheck, FiBookOpen } from "react-icons/fi";
import StudentRegistration from "../StudentRegistration/StudentRegistration";
import "./Courses.css";

const Courses = () => {
    const { isAuthenticated } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [sort, setSort] = useState("");
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [enrolling, setEnrolling] = useState(null);
    const [showRegistration, setShowRegistration] = useState(false);
    const [currentEnrollment, setCurrentEnrollment] = useState(null);

    const fetchCourses = useCallback(async () => {
        try {
            let query = "?";
            if (category) query += `category=${encodeURIComponent(category)}&`;
            if (level) query += `level=${level}&`;
            if (sort) query += `sort=${sort}&`;
            if (search) query += `search=${encodeURIComponent(search)}&`;

            const res = await API.get(`/courses${query}`);
            setCourses(res.data.courses || []);
        } catch (_error) {
            toast.error("Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    }, [category, level, sort, search]);

    useEffect(() => {
        setLoading(true);
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("payment") === "success") {
            const sessionId = query.get("session_id");
            const enrollmentId = query.get("enrollment_id");
            if (sessionId && enrollmentId) {
                API.post("/payments/verify", { session_id: sessionId, enrollmentId })
                    .then(() => {
                        toast.success("Payment successful! You are now fully enrolled.");
                        // Clean up URL
                        window.history.replaceState({}, document.title, window.location.pathname);
                    })
                    .catch(() => toast.error("Error verifying payment"));
            }
        } else if (query.get("payment") === "cancelled") {
            toast.info("Payment was cancelled.");
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        fetchCourses();
    };

    const handleEnroll = async (courseId) => {
        if (!isAuthenticated) {
            toast.info("Please login to enroll in a course");
            return;
        }
        setEnrolling(courseId);
        try {
            const res = await API.post("/enrollments", { courseId });
            toast.success(res.data.message || "Enrolled successfully!");
            setCurrentEnrollment(res.data.enrollment);
            setShowRegistration(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Enrollment failed");
        } finally {
            setEnrolling(null);
        }
    };

    const handleRegistrationClose = () => {
        setShowRegistration(false);
        setCurrentEnrollment(null);
    };

    const handleRegistrationSuccess = () => {
        setShowRegistration(false);
        setCurrentEnrollment(null);
    };

    const categories = ["Web Development", "Mobile Development", "Data Science", "Cloud Computing", "Cyber Security", "UI/UX Design", "Digital Marketing", "DevOps"];
    const levels = ["Beginner", "Intermediate", "Advanced"];
    const sortOptions = [
        { value: "", label: "Latest" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
        { value: "rating", label: "Top Rated" },
        { value: "popular", label: "Most Popular" }
    ];

    return (
        <div className="courses-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">Our Courses</h1>
                    <p className="page-hero-subtitle">Industry-relevant courses designed to transform your career. Learn from experts and build real-world projects.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="courses-filters glass-card">
                        <form className="search-form" onSubmit={handleSearch}>
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses..."
                                className="search-input"
                            />
                            <button type="submit" className="btn btn-primary btn-sm">Search</button>
                        </form>
                        <div className="filter-row">
                            <div className="filter-group">
                                <FiFilter className="filter-icon" />
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
                                    <option value="">All Categories</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="filter-group">
                                <select value={level} onChange={(e) => setLevel(e.target.value)} className="filter-select">
                                    <option value="">All Levels</option>
                                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                            <div className="filter-group">
                                <select value={sort} onChange={(e) => setSort(e.target.value)} className="filter-select">
                                    {sortOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-spinner"><div className="spinner"></div></div>
                    ) : courses.length === 0 ? (
                        <div className="no-results">
                            <FiBookOpen className="no-results-icon" />
                            <h3>No courses found</h3>
                            <p>Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <div className="courses-list">
                            {courses.map((course) => (
                                <div key={course._id} className="course-detail-card glass-card">
                                    <div className="course-detail-main">
                                        <div className="course-detail-info">
                                            <div className="course-detail-badges">
                                                <span className="badge badge-primary">{course.category}</span>
                                                <span className="badge badge-success">{course.level}</span>
                                            </div>
                                            <h3 className="course-detail-title">{course.title}</h3>
                                            <p className="course-detail-desc">{course.description}</p>
                                            <div className="course-detail-meta">
                                                <span><FiClock /> {course.duration}</span>
                                                <span><FiUsers /> {course.totalStudents} enrolled</span>
                                                <span><FiStar className="star-filled" /> {course.rating}/5</span>
                                                <span>👨‍🏫 {course.instructor}</span>
                                            </div>
                                            {course.features && course.features.length > 0 && (
                                                <div className="course-features-list">
                                                    {course.features.map((f, i) => (
                                                        <span key={i} className="course-feature-tag"><FiCheck /> {f}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="course-detail-action">
                                            <div className="course-detail-price">
                                                {course.discountPrice > 0 && (
                                                    <span className="price-original">₹{course.price?.toLocaleString()}</span>
                                                )}
                                                <span className="price-current">₹{(course.discountPrice || course.price)?.toLocaleString()}</span>
                                                {course.discountPrice > 0 && (
                                                    <span className="price-save">Save ₹{(course.price - course.discountPrice)?.toLocaleString()}</span>
                                                )}
                                            </div>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleEnroll(course._id)}
                                                disabled={enrolling === course._id}
                                            >
                                                {enrolling === course._id ? "Enrolling..." : "Enroll Now"}
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => setExpandedCourse(expandedCourse === course._id ? null : course._id)}
                                            >
                                                {expandedCourse === course._id ? "Hide Syllabus" : "View Syllabus"}
                                                {expandedCourse === course._id ? <FiChevronUp /> : <FiChevronDown />}
                                            </button>
                                        </div>
                                    </div>

                                    {expandedCourse === course._id && course.syllabus && (
                                        <div className="course-syllabus">
                                            <h4 className="syllabus-title">Course Syllabus</h4>
                                            <div className="syllabus-modules">
                                                {course.syllabus.map((mod, i) => (
                                                    <div key={i} className="syllabus-module">
                                                        <h5 className="module-title">
                                                            <span className="module-number">{String(i + 1).padStart(2, "0")}</span>
                                                            {mod.module}
                                                        </h5>
                                                        <div className="module-topics">
                                                            {mod.topics.map((topic, j) => (
                                                                <span key={j} className="module-topic"><FiCheck /> {topic}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {showRegistration && currentEnrollment && (
                <StudentRegistration
                    enrollment={currentEnrollment}
                    onClose={handleRegistrationClose}
                    onSuccess={handleRegistrationSuccess}
                />
            )}
        </div>
    );
};

export default Courses;
