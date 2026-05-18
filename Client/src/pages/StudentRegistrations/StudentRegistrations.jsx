import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../utils/api";
import {
    FiUser, FiMail, FiPhone, FiCalendar, FiMapPin,
    FiAward, FiBriefcase, FiClock, FiBookOpen,
    FiChevronDown, FiChevronUp, FiCheckCircle,
    FiXCircle, FiAlertCircle, FiSearch, FiFilter,
    FiFileText
} from "react-icons/fi";
import "./StudentRegistrations.css";

const StudentRegistrations = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchRegistrations = useCallback(async () => {
        try {
            const endpoint = isAdmin ? "/student-registrations/all" : "/student-registrations/my";
            const res = await API.get(endpoint);
            setRegistrations(res.data.registrations || []);
        } catch (_error) {
            toast.error("Failed to load registrations");
        } finally {
            setLoading(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations]);

    const handleStatusUpdate = async (id, status) => {
        setUpdatingId(id);
        try {
            await API.patch(`/student-registrations/${id}/status`, { status });
            toast.success(`Registration ${status} successfully!`);
            fetchRegistrations();
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setUpdatingId(null);
        }
    };

    const handlePayment = async (enrollmentId) => {
        try {
            const { data } = await API.post("/payments/create-checkout-session", {
                enrollmentId
            });

            if (!data.success) {
                toast.error("Failed to create checkout session");
                return;
            }

            window.location.href = data.url;
        } catch (error) {
            toast.error(error.response?.data?.message || "Payment initialization failed");
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

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

    const filteredRegistrations = registrations.filter((reg) => {
        const matchesSearch = search === "" ||
            reg.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            reg.email?.toLowerCase().includes(search.toLowerCase()) ||
            reg.course?.title?.toLowerCase().includes(search.toLowerCase()) ||
            reg.phone?.includes(search);

        const matchesStatus = statusFilter === "" || reg.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="sr-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">
                        {isAdmin ? "All Student Registrations" : "My Registrations"}
                    </h1>
                    <p className="page-hero-subtitle">
                        {isAdmin
                            ? "View and manage all student registration details"
                            : "View your course registration details and status"
                        }
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Filters */}
                    <div className="srp-filters glass-card">
                        <div className="srp-search-wrap">
                            <FiSearch className="srp-search-icon" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={isAdmin ? "Search by name, email, phone, or course..." : "Search your registrations..."}
                                className="srp-search-input"
                            />
                        </div>
                        <div className="srp-filter-group">
                            <FiFilter />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="srp-filter-select"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="srp-count">
                            <FiFileText />
                            <span>{filteredRegistrations.length} Registration{filteredRegistrations.length !== 1 ? "s" : ""}</span>
                        </div>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="loading-spinner"><div className="spinner"></div></div>
                    ) : filteredRegistrations.length === 0 ? (
                        <div className="srp-empty glass-card">
                            <FiFileText className="srp-empty-icon" />
                            <h3>No registrations found</h3>
                            <p>{registrations.length === 0
                                ? "No student registrations have been submitted yet."
                                : "Try adjusting your search or filter."
                            }</p>
                        </div>
                    ) : (
                        <div className="srp-list">
                            {filteredRegistrations.map((reg) => (
                                <div key={reg._id} className={`srp-card glass-card ${expandedId === reg._id ? "expanded" : ""}`}>
                                    {/* Card Header - Always Visible */}
                                    <div className="srp-card-header" onClick={() => toggleExpand(reg._id)}>
                                        <div className="srp-card-avatar">
                                            <FiUser />
                                        </div>
                                        <div className="srp-card-summary">
                                            <div className="srp-card-top">
                                                <h3 className="srp-card-name">{reg.fullName}</h3>
                                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                    <span className={`badge ${getStatusClass(reg.status)}`}>
                                                        {getStatusIcon(reg.status)} Reg: {reg.status}
                                                    </span>
                                                    {reg.enrollment && (
                                                        <span className={`badge ${
                                                            reg.enrollment.paymentStatus === "Completed" ? "badge-success" : 
                                                            reg.enrollment.paymentStatus === "Failed" ? "badge-accent" : "badge-warning"
                                                        }`}>
                                                            {reg.enrollment.paymentStatus === "Completed" ? <FiCheckCircle /> : 
                                                             reg.enrollment.paymentStatus === "Failed" ? <FiXCircle /> : <FiAlertCircle />}
                                                            Pay: {reg.enrollment.paymentStatus || "Pending"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="srp-card-quick-info">
                                                <span><FiBookOpen /> {reg.course?.title || "—"}</span>
                                                <span><FiMail /> {reg.email}</span>
                                                <span><FiPhone /> {reg.phone}</span>
                                                <span><FiClock /> {reg.preferredBatch} Batch</span>
                                            </div>
                                        </div>
                                        <button className="srp-toggle-btn">
                                            {expandedId === reg._id ? <FiChevronUp /> : <FiChevronDown />}
                                        </button>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedId === reg._id && (
                                        <div className="srp-card-details">
                                            <div className="srp-details-grid">
                                                {/* Personal Information */}
                                                <div className="srp-detail-section">
                                                    <h4 className="srp-detail-title">
                                                        <FiUser /> Personal Information
                                                    </h4>
                                                    <div className="srp-detail-rows">
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Full Name</span>
                                                            <span className="srp-detail-value">{reg.fullName}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Email</span>
                                                            <span className="srp-detail-value">{reg.email}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Phone</span>
                                                            <span className="srp-detail-value">{reg.phone}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Date of Birth</span>
                                                            <span className="srp-detail-value">
                                                                {reg.dateOfBirth
                                                                    ? new Date(reg.dateOfBirth).toLocaleDateString("en-IN", {
                                                                        day: "2-digit", month: "long", year: "numeric"
                                                                    })
                                                                    : "—"
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Gender</span>
                                                            <span className="srp-detail-value">{reg.gender || "—"}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Address */}
                                                <div className="srp-detail-section">
                                                    <h4 className="srp-detail-title">
                                                        <FiMapPin /> Address
                                                    </h4>
                                                    <div className="srp-detail-rows">
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Street</span>
                                                            <span className="srp-detail-value">{reg.address?.street || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">City</span>
                                                            <span className="srp-detail-value">{reg.address?.city || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">State</span>
                                                            <span className="srp-detail-value">{reg.address?.state || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Pincode</span>
                                                            <span className="srp-detail-value">{reg.address?.pincode || "—"}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Course & Academic */}
                                                <div className="srp-detail-section">
                                                    <h4 className="srp-detail-title">
                                                        <FiBookOpen /> Course & Academic
                                                    </h4>
                                                    <div className="srp-detail-rows">
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Course</span>
                                                            <span className="srp-detail-value srp-highlight">{reg.course?.title || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Category</span>
                                                            <span className="srp-detail-value">{reg.course?.category || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Qualification</span>
                                                            <span className="srp-detail-value">{reg.qualification || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">College/School</span>
                                                            <span className="srp-detail-value">{reg.collegeName || "—"}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Preferences */}
                                                <div className="srp-detail-section">
                                                    <h4 className="srp-detail-title">
                                                        <FiClock /> Preferences & Other
                                                    </h4>
                                                    <div className="srp-detail-rows">
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Experience</span>
                                                            <span className="srp-detail-value">{reg.experience || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Preferred Batch</span>
                                                            <span className="srp-detail-value srp-highlight">{reg.preferredBatch || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Payment Option</span>
                                                            <span className="srp-detail-value srp-highlight">{reg.paymentOption || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">How Heard</span>
                                                            <span className="srp-detail-value">{reg.howDidYouHear || "—"}</span>
                                                        </div>
                                                        <div className="srp-detail-row">
                                                            <span className="srp-detail-label">Registered On</span>
                                                            <span className="srp-detail-value">
                                                                {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                                                                    day: "2-digit", month: "short", year: "numeric"
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Guardian */}
                                                {(reg.guardianName || reg.guardianPhone) && (
                                                    <div className="srp-detail-section">
                                                        <h4 className="srp-detail-title">
                                                            <FiUser /> Guardian Details
                                                        </h4>
                                                        <div className="srp-detail-rows">
                                                            <div className="srp-detail-row">
                                                                <span className="srp-detail-label">Guardian Name</span>
                                                                <span className="srp-detail-value">{reg.guardianName || "—"}</span>
                                                            </div>
                                                            <div className="srp-detail-row">
                                                                <span className="srp-detail-label">Guardian Phone</span>
                                                                <span className="srp-detail-value">{reg.guardianPhone || "—"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Additional Notes */}
                                                {reg.additionalNotes && (
                                                    <div className="srp-detail-section srp-notes-section">
                                                        <h4 className="srp-detail-title">
                                                            <FiFileText /> Additional Notes
                                                        </h4>
                                                        <p className="srp-notes-text">{reg.additionalNotes}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Admin Actions */}
                                            {isAdmin && reg.status === "pending" && (
                                                <div className="srp-admin-actions">
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleStatusUpdate(reg._id, "approved")}
                                                        disabled={updatingId === reg._id}
                                                    >
                                                        <FiCheckCircle /> {updatingId === reg._id ? "Updating..." : "Approve"}
                                                    </button>
                                                    <button
                                                        className="btn btn-sm srp-reject-btn"
                                                        onClick={() => handleStatusUpdate(reg._id, "rejected")}
                                                        disabled={updatingId === reg._id}
                                                    >
                                                        <FiXCircle /> Reject
                                                    </button>
                                                </div>
                                            )}

                                            {/* Student Actions */}
                                            {!isAdmin && reg.status === "pending" && (!reg.enrollment || reg.enrollment.paymentStatus === "Pending") && (
                                                <div className="srp-student-actions" style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
                                                    <button 
                                                        className="btn btn-primary"
                                                        onClick={() => handlePayment(reg.enrollment?._id || reg.enrollment)}
                                                    >
                                                        Proceed to Payment
                                                    </button>
                                                </div>
                                            )}

                                            {/* Admin Info - who submitted */}
                                            {isAdmin && reg.user && (
                                                <div className="srp-user-info">
                                                    <span className="srp-user-label">Submitted by Account:</span>
                                                    <span className="srp-user-value">{reg.user.name} ({reg.user.email})</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default StudentRegistrations;
