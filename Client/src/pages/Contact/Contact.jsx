import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../utils/api";
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiUser, FiMessageCircle } from "react-icons/fi";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", subject: "", message: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error("Please fill all required fields");
            return;
        }
        setLoading(true);
        try {
            const res = await API.post("/contact", formData);
            toast.success(res.data.message || "Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { icon: <FiMapPin />, title: "Visit Us", lines: ["123 Tech Park, Innovation Street", "Bangalore, Karnataka 560001"] },
        { icon: <FiPhone />, title: "Call Us", lines: ["+91 98765 43210", "+91 98765 43211"] },
        { icon: <FiMail />, title: "Email Us", lines: ["info@eduvisioninstitute.com", "admissions@eduvisioninstitute.com"] },
        { icon: <FiClock />, title: "Working Hours", lines: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"] }
    ];

    return (
        <div className="contact-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">Contact Us</h1>
                    <p className="page-hero-subtitle">Have questions? We'd love to hear from you. Get in touch with us!</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info-section">
                            <h2 className="contact-info-title">Get In Touch</h2>
                            <p className="contact-info-desc">
                                Whether you have a question about our courses, pricing, need a demo, or anything else,
                                our team is ready to answer all your questions.
                            </p>
                            <div className="contact-info-cards">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="contact-info-card">
                                        <div className="contact-info-icon">{info.icon}</div>
                                        <div>
                                            <h4 className="contact-info-label">{info.title}</h4>
                                            {info.lines.map((line, i) => (
                                                <p key={i} className="contact-info-text">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="contact-form-section glass-card">
                            <h3 className="contact-form-title">Send a Message</h3>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Full Name *</label>
                                        <div className="input-wrapper">
                                            <FiUser className="input-icon" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className="form-input input-with-icon"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email *</label>
                                        <div className="input-wrapper">
                                            <FiMail className="input-icon" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Your email"
                                                className="form-input input-with-icon"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Phone</label>
                                        <div className="input-wrapper">
                                            <FiPhone className="input-icon" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Your phone"
                                                className="form-input input-with-icon"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Subject *</label>
                                        <div className="input-wrapper">
                                            <FiMessageCircle className="input-icon" />
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Subject"
                                                className="form-input input-with-icon"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us what you need..."
                                        className="form-input form-textarea"
                                        required
                                        minLength={10}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary contact-submit" disabled={loading}>
                                    <FiSend /> {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
