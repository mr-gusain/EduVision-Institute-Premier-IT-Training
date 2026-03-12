import { Link } from "react-router-dom";
import { FiCode, FiSmartphone, FiDatabase, FiCloud, FiShield, FiLayout, FiBarChart, FiServer, FiUsers, FiBookOpen, FiAward, FiBriefcase, FiCheck, FiArrowRight } from "react-icons/fi";
import "./Services.css";

const Services = () => {
    const services = [
        {
            icon: <FiCode />,
            title: "Web Development Training",
            desc: "Master full-stack web development with MERN, MEAN, Django, and more. Build production-ready web applications with industry best practices.",
            features: ["Frontend & Backend", "Database Design", "API Development", "Deployment"]
        },
        {
            icon: <FiSmartphone />,
            title: "Mobile App Development",
            desc: "Learn to build cross-platform mobile apps with React Native, Flutter, or native iOS/Android development. Publish real apps.",
            features: ["React Native", "Flutter", "App Store Publishing", "Push Notifications"]
        },
        {
            icon: <FiDatabase />,
            title: "Data Science & AI",
            desc: "Dive deep into data analysis, machine learning, deep learning, and AI. Work with real datasets and build AI-powered solutions.",
            features: ["Python & R", "Machine Learning", "Deep Learning", "NLP & Computer Vision"]
        },
        {
            icon: <FiCloud />,
            title: "Cloud Computing",
            desc: "Get certified in AWS, Azure, or GCP. Learn cloud architecture, serverless computing, and modern infrastructure management.",
            features: ["AWS/Azure/GCP", "Serverless", "Cloud Architecture", "Certification Prep"]
        },
        {
            icon: <FiShield />,
            title: "Cyber Security",
            desc: "Learn ethical hacking, penetration testing, network security, and security compliance. Prepare for industry certifications.",
            features: ["Ethical Hacking", "Network Security", "Pen Testing", "CEH Certification"]
        },
        {
            icon: <FiLayout />,
            title: "UI/UX Design",
            desc: "Master design thinking, Figma, prototyping, and user research. Build a stunning portfolio that lands you design roles.",
            features: ["Figma & Sketch", "Prototyping", "User Research", "Design Systems"]
        },
        {
            icon: <FiBarChart />,
            title: "Digital Marketing",
            desc: "Complete digital marketing training covering SEO, SEM, social media, content marketing, email marketing, and analytics.",
            features: ["SEO & SEM", "Social Media", "Google Analytics", "Content Strategy"]
        },
        {
            icon: <FiServer />,
            title: "DevOps Engineering",
            desc: "Master CI/CD pipelines, Docker, Kubernetes, Infrastructure as Code, and automate the entire software delivery lifecycle.",
            features: ["Docker & K8s", "CI/CD Pipelines", "Terraform", "Jenkins & GitHub Actions"]
        }
    ];

    const additionalServices = [
        {
            icon: <FiBriefcase />,
            title: "Corporate Training",
            desc: "Customized training programs for organizations. Upskill your team with tailored courses and hands-on workshops."
        },
        {
            icon: <FiUsers />,
            title: "1:1 Mentoring",
            desc: "Get personalized guidance from industry experts. Career roadmaps, code reviews, and interview preparation."
        },
        {
            icon: <FiBookOpen />,
            title: "Workshop & Bootcamps",
            desc: "Intensive weekend workshops and 2-week bootcamps on trending technologies. Fast-track your learning."
        },
        {
            icon: <FiAward />,
            title: "Placement Assistance",
            desc: "Dedicated placement cell with resume building, mock interviews, and direct referrals to 200+ hiring partners."
        }
    ];

    return (
        <div className="services-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">Our Services</h1>
                    <p className="page-hero-subtitle">Comprehensive IT training services designed to launch your tech career</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Training Programs</span>
                        <h2 className="section-title">What We Offer</h2>
                        <p className="section-subtitle">Industry-relevant training programs across all major IT domains</p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card glass-card">
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-desc">{service.desc}</p>
                                <div className="service-features">
                                    {service.features.map((f, i) => (
                                        <span key={i} className="service-feature"><FiCheck /> {f}</span>
                                    ))}
                                </div>
                                <Link to="/courses" className="service-link">
                                    View Courses <FiArrowRight />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section additional-services">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Beyond Training</span>
                        <h2 className="section-title">Additional Services</h2>
                        <p className="section-subtitle">We go beyond just training to ensure your complete career success</p>
                    </div>
                    <div className="additional-grid">
                        {additionalServices.map((service, index) => (
                            <div key={index} className="additional-card glass-card">
                                <div className="additional-icon">{service.icon}</div>
                                <h3 className="additional-title">{service.title}</h3>
                                <p className="additional-desc">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section process-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">How It Works</span>
                        <h2 className="section-title">Your Learning Journey</h2>
                    </div>
                    <div className="process-grid">
                        {[
                            { step: "01", title: "Choose Your Course", desc: "Browse our courses and pick the one that aligns with your career goals." },
                            { step: "02", title: "Learn from Experts", desc: "Attend live classes, work on projects, and get mentored by industry professionals." },
                            { step: "03", title: "Build Your Portfolio", desc: "Complete 10+ real-world projects that showcase your skills to employers." },
                            { step: "04", title: "Get Placed", desc: "Our placement cell helps you with interviews, resume building, and company referrals." }
                        ].map((item, index) => (
                            <div key={index} className="process-card">
                                <span className="process-step">{item.step}</span>
                                <h3 className="process-title">{item.title}</h3>
                                <p className="process-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
