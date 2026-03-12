import { Link } from "react-router-dom";
import { FiTarget, FiUsers, FiAward, FiHeart, FiCheck, FiTrendingUp } from "react-icons/fi";
import "./About.css";

const About = () => {
    const values = [
        { icon: <FiTarget />, title: "Mission-Driven", desc: "We're on a mission to democratize tech education and make it accessible to everyone, regardless of their background." },
        { icon: <FiUsers />, title: "Community First", desc: "We believe in the power of community learning. Our students support and inspire each other throughout the journey." },
        { icon: <FiAward />, title: "Excellence", desc: "We maintain the highest standards of education with regularly updated curriculum aligned with industry requirements." },
        { icon: <FiHeart />, title: "Student-Centric", desc: "Every decision we make is guided by one question: Does this help our students succeed in their careers?" }
    ];

    const milestones = [
        { year: "2018", title: "Founded", desc: "EduVision Institute was born with a vision to transform IT education in India." },
        { year: "2019", title: "500+ Students", desc: "Crossed our first milestone of training 500 students in our first year." },
        { year: "2020", title: "Online Launch", desc: "Adapted to the digital world with our comprehensive online learning platform." },
        { year: "2021", title: "50+ Courses", desc: "Expanded our curriculum to cover all major domains of IT industry." },
        { year: "2022", title: "100+ Hiring Partners", desc: "Partnered with leading tech companies for direct placements." },
        { year: "2023", title: "5000+ Alumni", desc: "Our alumni network spans across top tech companies globally." }
    ];

    const team = [
        { name: "Dr. Arun Kapoor", role: "Founder & CEO", desc: "20+ years in tech industry. Former VP at Microsoft India." },
        { name: "Prof. Rajesh Kumar", role: "Head of Academics", desc: "15+ years of teaching experience. Full-stack development expert." },
        { name: "Dr. Meera Joshi", role: "Data Science Lead", desc: "PhD in ML from IIT. Published researcher with 50+ papers." },
        { name: "Suresh Nair", role: "Cloud & DevOps Head", desc: "AWS certified architect. 12+ years in cloud infrastructure." }
    ];

    return (
        <div className="about-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">About EduVision Institute</h1>
                    <p className="page-hero-subtitle">Transforming lives through world-class IT education since 2018</p>
                </div>
            </section>

            <section className="section about-intro">
                <div className="container">
                    <div className="about-intro-grid">
                        <div className="about-intro-text animate-slideInLeft">
                            <span className="section-label">Our Story</span>
                            <h2 className="about-intro-title">Building the Future of <span className="text-gradient">Tech Education</span></h2>
                            <p className="about-intro-desc">
                                EduVision Institute was founded in 2018 with a singular vision: to bridge the gap between
                                academic knowledge and industry requirements. We noticed that traditional education
                                wasn't keeping pace with the rapidly evolving tech industry, leaving graduates
                                unprepared for real-world challenges.
                            </p>
                            <p className="about-intro-desc">
                                Today, we've trained over 5,000 students who are now working at leading tech companies
                                like Google, Microsoft, Amazon, TCS, Infosys, and many more. Our unique approach combines
                                expert-led training, hands-on projects, and dedicated placement support to ensure every
                                student achieves their career goals.
                            </p>
                            <div className="about-highlights">
                                <div className="highlight-item">
                                    <FiCheck className="highlight-icon" />
                                    <span>Industry-aligned curriculum updated quarterly</span>
                                </div>
                                <div className="highlight-item">
                                    <FiCheck className="highlight-icon" />
                                    <span>95% placement rate with top companies</span>
                                </div>
                                <div className="highlight-item">
                                    <FiCheck className="highlight-icon" />
                                    <span>1:1 mentoring from industry experts</span>
                                </div>
                                <div className="highlight-item">
                                    <FiCheck className="highlight-icon" />
                                    <span>Flexible learning modes: online, offline & hybrid</span>
                                </div>
                            </div>
                        </div>
                        <div className="about-intro-stats animate-slideInRight">
                            <div className="intro-stat-card glass-card">
                                <h3>5000+</h3>
                                <p>Students Trained</p>
                            </div>
                            <div className="intro-stat-card glass-card">
                                <h3>95%</h3>
                                <p>Placement Rate</p>
                            </div>
                            <div className="intro-stat-card glass-card">
                                <h3>200+</h3>
                                <p>Hiring Partners</p>
                            </div>
                            <div className="intro-stat-card glass-card">
                                <h3>50+</h3>
                                <p>Expert Courses</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section values-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Values</span>
                        <h2 className="section-title">What Drives Us</h2>
                        <p className="section-subtitle">Our core values guide everything we do at EduVision Institute</p>
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
                        <span className="section-label">Our Team</span>
                        <h2 className="section-title">Meet Our Leadership</h2>
                        <p className="section-subtitle">Industry veterans committed to your success</p>
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
                        <h2>Join 5000+ Students Who Transformed Their Careers</h2>
                        <p>Start your journey with EduVision Institute today and unlock your potential in the tech industry.</p>
                        <Link to="/courses" className="btn btn-primary btn-lg">Explore Courses</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
