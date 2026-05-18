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
        { icon: <FiUsers />, number: "5000+", label: "Alumni Graduated" },
        { icon: <FiBookOpen />, number: "50+", label: "Academic Curricula" },
        { icon: <FiAward />, number: "95%", label: "Placement Rate" },
        { icon: <FiTrendingUp />, number: "200+", label: "Corporate Alliances" }
    ];

    const features = [
        { icon: <FiCode />, title: "Distinguished Faculty", desc: "Acquire knowledge directly from leading corporate technologists and certified software engineers with decades of production experience." },
        { icon: <FiDatabase />, title: "Advanced Lab Practicums", desc: "Construct a robust portfolio of real-world capstone engineering models, mimicking true production environments." },
        { icon: <FiCloud />, title: "Executive Placement Office", desc: "Benefit from continuous career advancement clinics, comprehensive CV refinement, and direct placements to key corporate partners." },
        { icon: <FiShield />, title: "Hybrid Delivery Formats", desc: "Align professional schedules seamlessly using flexible campus formats, hybrid classes, and virtual executive sessions." },
        { icon: <FiLayout />, title: "Accredited Credentials", desc: "Receive globally recognized technical certifications upon completion, verified and respected by global IT enterprises." },
        { icon: <FiBarChart />, title: "Academic Advising", desc: "Access personalized career development coaching, roadmap pathing, and strategic mentorship roadmaps." }
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
                        <span className="hero-badge">🎓 Accredited Graduate IT Programs</span>
                        <h1 className="hero-title">
                            Empowering Future
                            <span className="hero-gradient"> Tech Leaders </span>
                            Through Advanced
                            <span className="hero-gradient"> IT Certifications</span>
                        </h1>
                        <p className="hero-subtitle">
                            Advance your academic and career trajectory with the country's leading technology training academy.
                            Benefit from industry-approved curriculum, certified professional tracks, and elite corporate placement pipelines.
                        </p>
                        <div className="hero-actions">
                            <Link to="/courses" className="btn btn-primary btn-lg">
                                View Academic Catalog <FiArrowRight />
                            </Link>
                            <Link to="/about" className="btn btn-secondary btn-lg">
                                Institutional Profile
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
                                <span>Top Rated Tech Institution (4.8/5 from alumni)</span>
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
                        <span className="section-label">Institutional Excellence</span>
                        <h2 className="section-title">Why EduVision Institute of Technology?</h2>
                        <p className="section-subtitle">We bridge academic learning with enterprise technical execution through strategic methodologies</p>
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
                        <span className="section-label">Academic Program Catalog</span>
                        <h2 className="section-title">Core Syllabi & Study Tracks</h2>
                        <p className="section-subtitle">Select a structured study track engineered to prepare you for senior technology roles</p>
                    </div>
                    <div className="courses-grid">
                        {courses.map((course, index) => (
                            <div key={course._id} className="course-card glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="course-card-header">
                                    <div className="course-icon">{getCategoryIcon(course.category)}</div>
                                    <div className="course-card-badges">
                                        <span className="badge badge-primary">{course.level}</span>
                                        <div className="course-rating">
                                            <FiStar className="star-filled" />
                                            <span>{course.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="course-card-title">{course.title}</h3>
                                <p className="course-card-desc">{course.shortDescription}</p>
                                <div className="course-card-meta">
                                    <span className="course-duration">⏱ {course.duration}</span>
                                    <span className="course-students">👥 {course.totalStudents} enrolled</span>
                                </div>
                                <div className="course-card-footer">
                                    <div className="course-price">
                                        {course.discountPrice > 0 && (
                                            <span className="price-original">₹{course.price?.toLocaleString()}</span>
                                        )}
                                        <span className="price-current">₹{(course.discountPrice || course.price)?.toLocaleString()}</span>
                                    </div>
                                    <Link to="/courses" className="btn btn-primary btn-sm">View Curriculum</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="section-cta">
                        <Link to="/courses" className="btn btn-secondary btn-lg">
                            View All Study Tracks <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {testimonials.length > 0 && (
                <section className="section testimonials-preview">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-label">Alumni Endorsements</span>
                            <h2 className="section-title">Alumni Success Stories</h2>
                            <p className="section-subtitle">Verified feedback from students who successfully launched enterprise careers</p>
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
                                Read All Alumni Endorsements <FiArrowRight />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="cta-section">
                <div className="container">
                    <div className="cta-content glass-card">
                        <div className="cta-bg-orb"></div>
                        <h2 className="cta-title">Apply for the Next Academic Cohort</h2>
                        <p className="cta-subtitle">
                            Take the next step in your professional development. Applications are open for upcoming academic and certification cohorts.
                        </p>
                        <div className="cta-actions">
                            <Link to="/register" className="btn btn-accent btn-lg">
                                Matriculate / Apply Now <FiArrowRight />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary btn-lg">
                                Contact Admissions Office
                            </Link>
                        </div>
                        <div className="cta-features">
                            <span><FiCheck /> Institutional Trial Classes</span>
                            <span><FiCheck /> Flexible Tuition Financing</span>
                            <span><FiCheck /> Verified Placement Support</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
