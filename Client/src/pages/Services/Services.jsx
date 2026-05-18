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
            title: "Enterprise Upskilling Solutions",
            desc: "Customized technical curriculum for corporate enterprises, business workgroups, and technology departments."
        },
        {
            icon: <FiUsers />,
            title: "Advisory & Mentorship Portals",
            desc: "Weekly personalized check-ins and academic advising with distinguished technical leads and directors."
        },
        {
            icon: <FiBookOpen />,
            title: "Executive Seminars & Tech Bootcamps",
            desc: "Intensive deep-dive seminars, hackathons, and short-duration specialized technical bootcamps."
        },
        {
            icon: <FiAward />,
            title: "Alumni Placement & Recruitment",
            desc: "Dedicated institutional placement corridor supplying vetted engineering candidates directly to global alliances."
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
                    <h1 className="page-hero-title">Academic Programs & Services</h1>
                    <p className="page-hero-subtitle">Elite technology training tracks, corporate professional pipelines, and career advancement portals.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Core Syllabi Domains</span>
                        <h2 className="section-title">Institutional Departments</h2>
                        <p className="section-subtitle">Rigorous, certified technology curricula across all high-demand modern fields</p>
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
                                    View Syllabi Catalog <FiArrowRight />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section additional-services">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Enterprise & Alumni Services</span>
                        <h2 className="section-title">Beyond Classroom Instruction</h2>
                        <p className="section-subtitle">We manage holistic technological ecosystems to guarantee candidates excel immediately upon placement</p>
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
                        <span className="section-label">Matriculation Methodology</span>
                        <h2 className="section-title">The Engineering Candidate Pathway</h2>
                    </div>
                    <div className="process-grid">
                        {[
                            { step: "01", title: "Domain Selection", desc: "Select a core technological department that aligns directly with your long-term career aspirations." },
                            { step: "02", title: "Rigorous Faculty Mentoring", desc: "Participate in intensive practical seminars, supervised labs, and 1:1 faculty instruction." },
                            { step: "03", title: "Capstone Lab Refinement", desc: "Formulate advanced software architectures, assembling a verified, production-grade technical profile." },
                            { step: "04", title: "Accredited Career Boarding", desc: "Leverage EVIT's corporate corridor to complete interviews and secure high-value placements." }
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
