import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../utils/api";
import {
    FiBookOpen, FiClock, FiTrendingUp, FiCalendar, FiXCircle,
    FiUser, FiAward, FiFileText, FiMapPin, FiPhone,
    FiCheckCircle, FiAlertCircle, FiArrowRight
} from "react-icons/fi";
import "./Dashboard.css";

const Dashboard = () => {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [regLoading, setRegLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const res = await API.get("/enrollments/my");
                setEnrollments(res.data.enrollments || []);
            } catch {
                toast.error("Failed to load enrollments");
            } finally {
                setLoading(false);
            }
        };

        const fetchRegistrations = async () => {
            try {
                const endpoint = user?.role === "admin"
                    ? "/student-registrations/all"
                    : "/student-registrations/my";
                const res = await API.get(endpoint);
                setRegistrations(res.data.registrations || []);
            } catch {
                // silently handle
            } finally {
                setRegLoading(false);
            }
        };

        fetchEnrollments();
        fetchRegistrations();
    }, [refreshKey, user?.role]);

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this enrollment?")) return;
        try {
            const res = await API.patch(`/enrollments/${id}/cancel`);
            toast.success(res.data.message);
            setRefreshKey((k) => k + 1);
        } catch (error) {
            toast.error(error.response?.data?.message || "Cancel failed");
        }
    };

    const activeEnrollments = enrollments.filter(e => e.status === "active");
    const completedEnrollments = enrollments.filter(e => e.status === "completed");

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved": return <FiCheckCircle />;
            case "rejected": return <FiXCircle />;
            default: return <FiAlertCircle />;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "approved": return "badge-success";
            case "rejected": return "badge-accent";
            default: return "badge-warning";
        }
    };

    return (
        <div className="dashboard-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">My Dashboard</h1>
                    <p className="page-hero-subtitle">Welcome back, {user?.name}! Track your learning progress.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="dashboard-stats">
                        <div className="dash-stat glass-card">
                            <div className="dash-stat-icon"><FiBookOpen /></div>
                            <div>
                                <h3 className="dash-stat-number">{activeEnrollments.length}</h3>
                                <p className="dash-stat-label">Active Courses</p>
                            </div>
                        </div>
                        <div className="dash-stat glass-card">
                            <div className="dash-stat-icon completed"><FiAward /></div>
                            <div>
                                <h3 className="dash-stat-number">{completedEnrollments.length}</h3>
                                <p className="dash-stat-label">Completed</p>
                            </div>
                        </div>
                        <div className="dash-stat glass-card">
                            <div className="dash-stat-icon total"><FiTrendingUp /></div>
                            <div>
                                <h3 className="dash-stat-number">{enrollments.length}</h3>
                                <p className="dash-stat-label">Total Enrollments</p>
                            </div>
                        </div>
                        <div className="dash-stat glass-card">
                            <div className="dash-stat-icon reg"><FiFileText /></div>
                            <div>
                                <h3 className="dash-stat-number">{registrations.length}</h3>
                                <p className="dash-stat-label">Registrations</p>
                            </div>
                        </div>
                    </div>

                    {/* Enrollments Section */}
                    <div className="dashboard-section">
                        <h2 className="dashboard-heading">My Enrollments</h2>

                        {loading ? (
                            <div className="loading-spinner"><div className="spinner"></div></div>
                        ) : enrollments.length === 0 ? (
                            <div className="empty-state glass-card">
                                <FiBookOpen className="empty-icon" />
                                <h3>No enrollments yet</h3>
                                <p>Start your learning journey by enrolling in a course!</p>
                                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                            </div>
                        ) : (
                            <div className="enrollment-list">
                                {enrollments.map((enrollment) => (
                                    <div key={enrollment._id} className="enrollment-card glass-card">
                                        <div className="enrollment-info">
                                            <div className="enrollment-header">
                                                <h3 className="enrollment-title">{enrollment.course?.title || "Course"}</h3>
                                                <span className={`badge ${enrollment.status === "active" ? "badge-success" : enrollment.status === "completed" ? "badge-primary" : "badge-warning"}`}>
                                                    {enrollment.status}
                                                </span>
                                            </div>
                                            <p className="enrollment-desc">{enrollment.course?.shortDescription}</p>
                                            <div className="enrollment-meta">
                                                <span><FiClock /> {enrollment.course?.duration}</span>
                                                <span><FiCalendar /> Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                                                <span><FiUser /> {enrollment.course?.instructor}</span>
                                            </div>
                                            <div className="enrollment-progress">
                                                <div className="progress-header">
                                                    <span>Progress</span>
                                                    <span>{enrollment.progress}%</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${enrollment.progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        {enrollment.status === "active" && (
                                            <div className="enrollment-actions">
                                                <button className="btn btn-sm cancel-btn" onClick={() => handleCancel(enrollment._id)}>
                                                    <FiXCircle /> Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Student Registrations Section */}
                    <div className="dashboard-section" style={{ marginTop: "48px" }}>
                        <div className="dashboard-heading-row">
                            <h2 className="dashboard-heading">
                                <FiFileText /> Student Registrations
                            </h2>
                            {registrations.length > 0 && (
                                <Link to="/student-registrations" className="btn btn-secondary btn-sm">
                                    View All Details <FiArrowRight />
                                </Link>
                            )}
                        </div>

                        {regLoading ? (
                            <div className="loading-spinner" style={{ minHeight: "200px" }}><div className="spinner"></div></div>
                        ) : registrations.length === 0 ? (
                            <div className="empty-state glass-card">
                                <FiFileText className="empty-icon" />
                                <h3>No registrations yet</h3>
                                <p>Complete a registration form after enrolling in a course.</p>
                            </div>
                        ) : (
                            <div className="reg-preview-list">
                                {registrations.slice(0, 5).map((reg) => (
                                    <div key={reg._id} className="reg-preview-card glass-card">
                                        <div className="reg-preview-left">
                                            <div className="reg-preview-avatar">
                                                <FiUser />
                                            </div>
                                            <div className="reg-preview-info">
                                                <h4 className="reg-preview-name">{reg.fullName}</h4>
                                                <p className="reg-preview-course">
                                                    <FiBookOpen /> {reg.course?.title || "—"}
                                                </p>
                                                <div className="reg-preview-meta">
                                                    <span><FiPhone /> {reg.phone}</span>
                                                    <span><FiClock /> {reg.preferredBatch} Batch</span>
                                                    <span><FiMapPin /> {reg.address?.city}, {reg.address?.state}</span>
                                                    <span><FiAward /> {reg.qualification}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="reg-preview-right">
                                            <span className={`badge ${getStatusClass(reg.status)}`}>
                                                {getStatusIcon(reg.status)} {reg.status}
                                            </span>
                                            <span className="reg-preview-date">
                                                {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                                                    day: "2-digit", month: "short", year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {registrations.length > 5 && (
                                    <Link to="/student-registrations" className="reg-view-all-link">
                                        View all {registrations.length} registrations <FiArrowRight />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

