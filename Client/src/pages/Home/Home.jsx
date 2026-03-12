import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiArrowRight, FiUsers, FiBookOpen, FiAward, FiTrendingUp, FiStar, FiCheck, FiCode, FiDatabase, FiCloud, FiShield, FiLayout, FiBarChart } from "react-icons/fi";
import API from "../../utils/api";
import "./Home.css";

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseRes, testimonialRes] = await Promise.all([
                    API.get("/courses?sort=popular"),
                    API.get("/testimonials")
                ]);
                setCourses(courseRes.data.courses?.slice(0, 4) || []);
                setTestimonials(testimonialRes.data.testimonials?.slice(0, 3) || []);
            } catch (_error) {
                // data will be empty on error, that's fine for homepage
            }
        };

        fetchData();
    }, []);

    const stats = [
        { icon: <FiUsers />, number: "5000+", label: "Students Trained" },
        { icon: <FiBookOpen />, number: "50+", label: "Expert Courses" },
        { icon: <FiAward />, number: "95%", label: "Placement Rate" },
        { icon: <FiTrendingUp />, number: "200+", label: "Hiring Partners" }
    ];

    const features = [
        { icon: <FiCode />, title: "Industry Experts", desc: "Learn from professionals with 10+ years of real-world experience in top tech companies." },
        { icon: <FiDatabase />, title: "Hands-on Projects", desc: "Build 15+ real projects that you can showcase in your portfolio and impress recruiters." },
        { icon: <FiCloud />, title: "Placement Support", desc: "Dedicated placement cell with mock interviews, resume building, and direct company referrals." },
        { icon: <FiShield />, title: "Flexible Learning", desc: "Choose between online, offline, and hybrid modes. Learn at your own pace with lifetime access." },
        { icon: <FiLayout />, title: "Certified Programs", desc: "Get industry-recognized certifications upon completion. Boost your resume with verified credentials." },
        { icon: <FiBarChart />, title: "Career Guidance", desc: "1:1 mentoring sessions, career roadmaps, and personalized learning paths for every student." }
    ];

    const getCategoryIcon = (category) => {
        const icons = {
            "Web Development": <FiCode />,
            "Mobile Development": <FiLayout />,
            "Data Science": <FiDatabase />,
            "Cloud Computing": <FiCloud />,
            "Cyber Security": <FiShield />,
            "UI/UX Design": <FiLayout />,
            "Digital Marketing": <FiBarChart />,
            "DevOps": <FiCloud />
        };
        return icons[category] || <FiCode />;
    };

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                    <div className="hero-orb hero-orb-3"></div>
                    <div className="hero-grid"></div>
                </div>

                <div className="container hero-content">
                    <div className="hero-text animate-fadeInUp">
                        <span className="hero-badge">🚀 #1 IT Training Institute</span>
                        <h1 className="hero-title">
                            Transform Your
                            <span className="hero-gradient"> Career </span>
                            With Industry-Ready
                            <span className="hero-gradient"> Tech Skills</span>
                        </h1>
                        <p className="hero-subtitle">
                            Join 5000+ students who've launched successful tech careers with EduVision Institute.
                            Expert-led courses, real projects, and guaranteed placement support.
                        </p>
                        <div className="hero-actions">
                            <Link to="/courses" className="btn btn-primary btn-lg">
                                Explore Courses <FiArrowRight />
                            </Link>
                            <Link to="/about" className="btn btn-secondary btn-lg">
                                Learn More
                            </Link>
                        </div>
                        <div className="hero-trust">
                            <div className="trust-avatars">
                                {["R", "P", "A", "S"].map((initial, i) => (
                                    <div key={i} className="trust-avatar" style={{ animationDelay: `${i * 0.1}s` }}>
                                        {initial}
                                    </div>
                                ))}
                            </div>
                            <div className="trust-text">
                                <div className="trust-stars">
                                    {[1, 2, 3, 4, 5].map(i => <FiStar key={i} className="star-filled" />)}
                                </div>
                                <span>4.8/5 from 2000+ reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="stat-icon">{stat.icon}</div>
                                <h3 className="stat-number">{stat.number}</h3>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section features-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Why Choose Us</span>
                        <h2 className="section-title">What Makes EduVision Institute Different</h2>
                        <p className="section-subtitle">We don't just teach, we transform careers with our unique approach to IT education</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-desc">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section courses-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Popular Courses</span>
                        <h2 className="section-title">Start Learning Today</h2>
                        <p className="section-subtitle">Choose from our most popular courses and kickstart your tech career</p>
                    </div>
                    <div className="courses-grid">
                        {courses.map((course, index) => (
                            <div key={course._id} className="course-card glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="course-card-header">
                                    <div className="course-icon">{getCategoryIcon(course.category)}</div>
                                    <span className="badge badge-primary">{course.level}</span>
                                </div>
                                <h3 className="course-card-title">{course.title}</h3>
                                <p className="course-card-desc">{course.shortDescription}</p>
                                <div className="course-card-meta">
                                    <span className="course-duration">⏱ {course.duration}</span>
                                    <span className="course-students">👥 {course.totalStudents} students</span>
                                </div>
                                <div className="course-card-footer">
                                    <div className="course-price">
                                        {course.discountPrice > 0 && (
                                            <span className="price-original">₹{course.price?.toLocaleString()}</span>
                                        )}
                                        <span className="price-current">₹{(course.discountPrice || course.price)?.toLocaleString()}</span>
                                    </div>
                                    <Link to="/courses" className="btn btn-primary btn-sm">View Details</Link>
                                </div>
                                <div className="course-rating">
                                    <FiStar className="star-filled" />
                                    <span>{course.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="section-cta">
                        <Link to="/courses" className="btn btn-secondary btn-lg">
                            View All Courses <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {testimonials.length > 0 && (
                <section className="section testimonials-preview">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-label">Student Stories</span>
                            <h2 className="section-title">What Our Students Say</h2>
                            <p className="section-subtitle">Real stories from real students who transformed their careers with us</p>
                        </div>
                        <div className="testimonials-grid">
                            {testimonials.map((t, index) => (
                                <div key={t._id} className="testimonial-card glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="testimonial-stars">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <FiStar key={i} className="star-filled" />
                                        ))}
                                    </div>
                                    <p className="testimonial-message">"{t.message}"</p>
                                    <div className="testimonial-author">
                                        <div className="testimonial-avatar">
                                            {t.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="testimonial-name">{t.name}</h4>
                                            <p className="testimonial-designation">{t.designation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="section-cta">
                            <Link to="/testimonials" className="btn btn-secondary btn-lg">
                                Read More Stories <FiArrowRight />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="cta-section">
                <div className="container">
                    <div className="cta-content glass-card">
                        <div className="cta-bg-orb"></div>
                        <h2 className="cta-title">Ready to Start Your Tech Journey?</h2>
                        <p className="cta-subtitle">
                            Join EduVision Institute today and get access to world-class training, mentorship, and placement opportunities.
                        </p>
                        <div className="cta-actions">
                            <Link to="/register" className="btn btn-accent btn-lg">
                                Get Started Free <FiArrowRight />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary btn-lg">
                                Talk to Counselor
                            </Link>
                        </div>
                        <div className="cta-features">
                            <span><FiCheck /> Free Demo Classes</span>
                            <span><FiCheck /> EMI Available</span>
                            <span><FiCheck /> 100% Placement Assist</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
