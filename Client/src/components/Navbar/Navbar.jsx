import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMenu, FiX, FiUser, FiLogOut, FiBookOpen, FiChevronDown, FiFileText } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsDropdownOpen(false);
        setIsMobileOpen(false);
        navigate("/");
    };

    const closeMobile = () => setIsMobileOpen(false);

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/courses", label: "Courses" },
        { path: "/services", label: "Services" },
        { path: "/testimonials", label: "Stories" },
        { path: "/contact", label: "Contact" }
    ];

    return (
        <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobile}>
                    <span className="logo-icon">🎓</span>
                    <span className="logo-text">
                        Edu<span className="logo-highlight">Vision</span> Institute
                    </span>
                </Link>

                <div className={`navbar-links ${isMobileOpen ? "active" : ""}`}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}
                            onClick={closeMobile}
                            end={link.path === "/"}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {isAuthenticated ? (
                        <div className="nav-user-section">
                            <div className="nav-user-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <div className="nav-avatar">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="nav-username">{user?.name?.split(" ")[0]}</span>
                                <FiChevronDown className={`dropdown-arrow ${isDropdownOpen ? "rotated" : ""}`} />
                            </div>
                            {isDropdownOpen && (
                                <div className="nav-dropdown" onClick={() => setIsDropdownOpen(false)}>
                                    <Link to="/dashboard" className="dropdown-item" onClick={closeMobile}>
                                        <FiBookOpen /> Dashboard
                                    </Link>
                                    <Link to="/profile" className="dropdown-item" onClick={closeMobile}>
                                        <FiUser /> Profile
                                    </Link>
                                    <Link to="/student-registrations" className="dropdown-item" onClick={closeMobile}>
                                        <FiFileText /> Registrations
                                    </Link>
                                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="nav-auth-buttons">
                            <Link to="/login" className="btn btn-secondary btn-sm" onClick={closeMobile}>
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMobile}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                <button className="navbar-toggler" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    {isMobileOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
