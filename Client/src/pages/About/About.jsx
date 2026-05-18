import { Link } from "react-router-dom";
import { FiTarget, FiUsers, FiAward, FiHeart, FiCheck, FiTrendingUp } from "react-icons/fi";
import "./About.css";

const About = () => {
    const values = [
        { icon: <FiTarget />, title: "Educational Mission", desc: "We are committed to democratizing access to high-tier technological resources, ensuring all ambitious learners can achieve their potential." },
        { icon: <FiUsers />, title: "Collaborative Ecosystem", desc: "We foster an collaborative learning model where students, advisors, and faculty build advanced systems together." },
        { icon: <FiAward />, title: "Academic Rigor", desc: "We maintain rigorous educational curricula designed alongside corporate advisory boards to match actual enterprise standards." },
        { icon: <FiHeart />, title: "Career Success Orientation", desc: "Every strategic direction, lab build, and research track is engineered around a single objective: the career success of our graduates." }
    ];

    const milestones = [
        { year: "2018", title: "Academy Founded", desc: "The EduVision Institute of Technology was chartered to bridge the widening gap in advanced software instruction." },
        { year: "2019", title: "500+ Registered Scholars", desc: "Admitted and trained 500+ active engineering candidates during our introductory year." },
        { year: "2020", title: "Digital Campus Launch", desc: "Deployed a comprehensive hybrid and virtual learning platform, extending access globally." },
        { year: "2021", title: "50+ Academic Pathways", desc: "Aggregated an extensive catalog of courses encompassing all core modern engineering and IT domains." },
        { year: "2022", title: "100+ Corporate Partner Networks", desc: "Established critical recruitment corridors with leading global technology firms." },
        { year: "2023", title: "5000+ Alumni Cohort", desc: "Graduated an elite network of tech professionals now leading departments inside major multinational firms." }
    ];

    const team = [
        { name: "Dr. Arun Kapoor", role: "Founder & Director", desc: "20+ years of tech industry leadership. Former Vice President at Microsoft India." },
        { name: "Prof. Rajesh Kumar", role: "Dean of Academic Affairs", desc: "15+ years of software instruction experience. Leading developer and enterprise architect." },
        { name: "Dr. Meera Joshi", role: "Chair of Machine Learning Research", desc: "PhD in Machine Learning from IIT. Published researcher with 50+ international papers." },
        { name: "Suresh Nair", role: "Director of Cloud Infrastructure", desc: "Enterprise AWS Certified Solutions Architect. 12+ years managing high-availability networks." }
    ];

    return (
        <div className="about-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">About EduVision Institute of Technology</h1>
                    <p className="page-hero-subtitle">Pioneering technological excellence and empowering professional careers since 2018</p>
                </div>
            </section>

            <section className="section about-intro">
                <div className="container">
                    <div className="about-intro-grid">
                        <div className="about-intro-text animate-slideInLeft">
                            <span className="section-label">Institutional History</span>
                            <h2 className="about-intro-title">Fostering Innovation in <span className="text-gradient">Advanced Technical Education</span></h2>
                            <p className="about-intro-desc">
                                The EduVision Institute of Technology (EVIT) was chartered in 2018 to resolve the critical
                                disparity between traditional computer science curricula and active enterprise demands. We observed
                                that legacy education was failing to keep pace with rapid infrastructure developments, leaving
                                graduates unqualified for senior technology roles.
                            </p>
                            <p className="about-intro-desc">
                                Today, EVIT has successfully matriculated over 5,000 alumni who are currently leading technical teams
                                at global enterprises including Google, Microsoft, Amazon, TCS, and Infosys. Our unique instructional
                                methodology blends distinguished faculty mentoring, extensive capstone project builds, and elite career service assistance.
                            </p>
                            <div className="about-highlights">
                                <div className="highlight-item">
                                    <FiCheck className="highlight-icon" />
                                    <span>Enterprise-certified curricula updated quarterly by corporate advisors</span>
                                </div>
                                <div className="highlight-item">
                                    <FiCheck className="highlight-icon" />
                                    <span>95% career placement rate across top-tier technical firms</span>
                                </div>
                                <div className="highlight-item">
                                    <FiCheck className="highlight-icon" />
                                    <span>1:1 advising and mentorship clinics from active technology leaders</span>
                                </div>
                                <div className="highlight-item">
                                    <FiCheck className="highlight-icon" />
                                    <span>Flexible delivery models: virtual, residential, and executive hybrid schedules</span>
                                </div>
                            </div>
                        </div>
                        <div className="about-intro-stats animate-slideInRight">
                            <div className="intro-stat-card glass-card">
                                <h3>5000+</h3>
                                <p>Alumni Graduated</p>
                            </div>
                            <div className="intro-stat-card glass-card">
                                <h3>95%</h3>
                                <p>Placement Rate</p>
                            </div>
                            <div className="intro-stat-card glass-card">
                                <h3>200+</h3>
                                <p>Corporate Alliances</p>
                            </div>
                            <div className="intro-stat-card glass-card">
                                <h3>50+</h3>
                                <p>Academic Pathways</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section values-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Core Values</span>
                        <h2 className="section-title">Institutional Core Principles</h2>
                        <p className="section-subtitle">Our values serve as the structural framework for all research and instruction at EVIT</p>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card glass-card">
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-desc">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section timeline-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Journey</span>
                        <h2 className="section-title">Milestones We've Achieved</h2>
                    </div>
                    <div className="timeline">
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
                                <div className="timeline-content glass-card">
                                    <span className="timeline-year">{milestone.year}</span>
                                    <h4 className="timeline-title">{milestone.title}</h4>
                                    <p className="timeline-desc">{milestone.desc}</p>
                                </div>
                                <div className="timeline-dot"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section team-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Institutional Leadership</span>
                        <h2 className="section-title">Meet Our Distinguished Faculty</h2>
                        <p className="section-subtitle">Corporate technology veterans and academic researchers dedicated to your engineering success</p>
                    </div>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card glass-card">
                                <div className="team-avatar">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p className="team-desc">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section cta-about">
                <div className="container">
                    <div className="cta-about-content glass-card">
                        <FiTrendingUp className="cta-icon" />
                        <h2>Join 5000+ Alumni Leading Tech Globally</h2>
                        <p>Begin your strategic technological instruction today at EVIT and unlock senior technical roles.</p>
                        <Link to="/courses" className="btn btn-primary btn-lg">View Academic Catalog</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
