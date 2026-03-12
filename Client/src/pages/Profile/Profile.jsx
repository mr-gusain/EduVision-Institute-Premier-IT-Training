import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../utils/api";
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiLock, FiSave } from "react-icons/fi";
import "./Profile.css";

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || ""
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.put("/auth/profile", formData);
            if (res.data.success) {
                updateUser(res.data.user);
                toast.success("Profile updated successfully!");
                setEditing(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        try {
            const res = await API.put("/auth/change-password", {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.success(res.data.message);
            setChangingPassword(false);
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Password change failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                </div>
                <div className="container">
                    <h1 className="page-hero-title">My Profile</h1>
                    <p className="page-hero-subtitle">Manage your account settings</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="profile-grid">
                        <div className="profile-sidebar glass-card">
                            <div className="profile-avatar-lg">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="profile-name">{user?.name}</h2>
                            <p className="profile-email">{user?.email}</p>
                            <span className="badge badge-primary">{user?.role}</span>
                            <div className="profile-detail-list">
                                <div className="profile-detail">
                                    <FiPhone className="detail-icon" />
                                    <span>{user?.phone || "Not provided"}</span>
                                </div>
                                <div className="profile-detail">
                                    <FiCalendar className="detail-icon" />
                                    <span>Joined {new Date(user?.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-content">
                            <div className="profile-section glass-card">
                                <div className="profile-section-header">
                                    <h3><FiUser /> Personal Information</h3>
                                    {!editing && (
                                        <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                                            <FiEdit2 /> Edit
                                        </button>
                                    )}
                                </div>

                                {editing ? (
                                    <form onSubmit={handleUpdateProfile}>
                                        <div className="form-group">
                                            <label className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="profile-form-actions">
                                            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                                                <FiSave /> {loading ? "Saving..." : "Save Changes"}
                                            </button>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="profile-info-grid">
                                        <div className="info-item">
                                            <label>Full Name</label>
                                            <span>{user?.name}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Email</label>
                                            <span>{user?.email}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Phone</label>
                                            <span>{user?.phone || "Not provided"}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Role</label>
                                            <span className="capitalize">{user?.role}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="profile-section glass-card">
                                <div className="profile-section-header">
                                    <h3><FiLock /> Change Password</h3>
                                    {!changingPassword && (
                                        <button className="btn btn-secondary btn-sm" onClick={() => setChangingPassword(true)}>
                                            <FiEdit2 /> Change
                                        </button>
                                    )}
                                </div>

                                {changingPassword && (
                                    <form onSubmit={handleChangePassword}>
                                        <div className="form-group">
                                            <label className="form-label">Current Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">New Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="form-input"
                                                required
                                                minLength={6}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Confirm New Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="profile-form-actions">
                                            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                                                <FiSave /> {loading ? "Changing..." : "Change Password"}
                                            </button>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setChangingPassword(false)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
