import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiArrowUpRight } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-glow"></div>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-icon">🎓</span>
                            <span className="logo-text">Edu<span className="logo-highlight">Vision</span> Institute</span>
                        </Link>
                        <p className="footer-description">
                            Empowering the next generation of tech professionals with industry-relevant courses,
                            expert mentors, and hands-on project experience. Your journey to a tech career starts here.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link" aria-label="GitHub"><FiGithub /></a>
                            <a href="#" className="social-link" aria-label="LinkedIn"><FiLinkedin /></a>
                            <a href="#" className="social-link" aria-label="Twitter"><FiTwitter /></a>
                            <a href="#" className="social-link" aria-label="Instagram"><FiInstagram /></a>
                        </div>
                    </div>

                    <div className="footer-links-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <div className="footer-links">
                            <Link to="/about" className="footer-link"><FiArrowUpRight /> About Us</Link>
                            <Link to="/courses" className="footer-link"><FiArrowUpRight /> Courses</Link>
                            <Link to="/services" className="footer-link"><FiArrowUpRight /> Services</Link>
                            <Link to="/testimonials" className="footer-link"><FiArrowUpRight /> Student Stories</Link>
                            <Link to="/contact" className="footer-link"><FiArrowUpRight /> Contact Us</Link>
                        </div>
                    </div>

                    <div className="footer-links-section">
                        <h4 className="footer-heading">Top Courses</h4>
                        <div className="footer-links">
                            <Link to="/courses" className="footer-link"><FiArrowUpRight /> MERN Stack</Link>
                            <Link to="/courses" className="footer-link"><FiArrowUpRight /> Data Science</Link>
                            <Link to="/courses" className="footer-link"><FiArrowUpRight /> Cloud Computing</Link>
                            <Link to="/courses" className="footer-link"><FiArrowUpRight /> Cyber Security</Link>
                            <Link to="/courses" className="footer-link"><FiArrowUpRight /> UI/UX Design</Link>
                        </div>
                    </div>

                    <div className="footer-links-section">
                        <h4 className="footer-heading">Contact Info</h4>
                        <div className="footer-contact">
                            <div className="contact-item">
                                <FiMapPin className="contact-icon" />
                                <span>123 Tech Park, Innovation Street, Bangalore 560001</span>
                            </div>
                            <div className="contact-item">
                                <FiPhone className="contact-icon" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="contact-item">
                                <FiMail className="contact-icon" />
                                <span>info@eduvisioninstitute.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 EduVision Institute. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
