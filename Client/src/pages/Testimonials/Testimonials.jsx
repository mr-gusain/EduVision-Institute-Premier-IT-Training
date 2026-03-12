import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../utils/api";
import { FiStar, FiSend, FiMessageCircle } from "react-icons/fi";
import "./Testimonials.css";

const Testimonials = () => {
    const { isAuthenticated, user } = useAuth();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        message: "", rating: 5, course: "", designation: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await API.get("/testimonials");
                setTestimonials(res.data.testimonials || []);
            } catch {
                toast.error("Failed to load testimonials");
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.message || formData.message.length < 10) {
            toast.error("Message must be at least 10 characters");
            return;
        }
        setSubmitting(true);
        try {
            const res = await API.post("/testimonials", {
                ...formData,
                name: user?.name
            });
            toast.success(res.data.message || "Testimonial submitted!");
            setShowForm(false);
            setFormData({ message: "", rating: 5, course: "", designation: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="testimonials-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">Student Stories</h1>
                    <p className="page-hero-subtitle">Real stories from real students who transformed their careers with EduVision Institute</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {isAuthenticated && (
                        <div className="share-story-cta">
                            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                                <FiMessageCircle /> {showForm ? "Close Form" : "Share Your Story"}
                            </button>
                        </div>
                    )}

                    {showForm && (
                        <div className="testimonial-form-wrapper glass-card animate-fadeInUp">
                            <h3 className="form-heading">Share Your Experience</h3>
                            <form onSubmit={handleSubmit} className="testimonial-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Course Completed</label>
                                        <input
                                            type="text"
                                            value={formData.course}
                                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                            placeholder="e.g., Full Stack Web Development"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Current Designation</label>
                                        <input
                                            type="text"
                                            value={formData.designation}
                                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                            placeholder="e.g., Software Developer at TCS"
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Rating</label>
                                    <div className="rating-select">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <button
                                                key={n}
                                                type="button"
                                                className={`rating-star ${formData.rating >= n ? "active" : ""}`}
                                                onClick={() => setFormData({ ...formData, rating: n })}
                                            >
                                                <FiStar />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Your Story *</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us about your experience at EduVision Institute..."
                                        className="form-input form-textarea"
                                        required
                                        minLength={10}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    <FiSend /> {submitting ? "Submitting..." : "Submit Story"}
                                </button>
                            </form>
                        </div>
                    )}

                    {loading ? (
                        <div className="loading-spinner"><div className="spinner"></div></div>
                    ) : testimonials.length === 0 ? (
                        <div className="no-results">
                            <FiMessageCircle className="no-results-icon" />
                            <h3>No stories yet</h3>
                            <p>Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <div className="testimonials-page-grid">
                            {testimonials.map((t, index) => (
                                <div key={t._id} className="testimonial-page-card glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="testimonial-quote">"</div>
                                    <div className="testimonial-stars">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <FiStar key={i} className="star-filled" />
                                        ))}
                                        {[...Array(5 - t.rating)].map((_, i) => (
                                            <FiStar key={i} className="star-empty" />
                                        ))}
                                    </div>
                                    <p className="testimonial-text">{t.message}</p>
                                    {t.course && <p className="testimonial-course">Course: {t.course}</p>}
                                    <div className="testimonial-footer">
                                        <div className="testimonial-avatar">{t.name?.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <h4 className="testimonial-name">{t.name}</h4>
                                            <p className="testimonial-designation">{t.designation || "Student"}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
