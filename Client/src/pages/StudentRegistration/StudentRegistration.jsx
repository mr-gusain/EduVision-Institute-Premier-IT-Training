import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../utils/api";
import {
    FiX, FiUser, FiMail, FiPhone, FiCalendar, FiMapPin,
    FiBook, FiAward, FiBriefcase, FiUsers, FiClock,
    FiMessageSquare, FiCheckCircle, FiChevronRight, FiChevronLeft, FiCreditCard
} from "react-icons/fi";
import "./StudentRegistration.css";

const StudentRegistration = ({ enrollment, onClose, onSuccess }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [formData, setFormData] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        dateOfBirth: "",
        gender: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        qualification: "",
        collegeName: "",
        experience: "Fresher",
        guardianName: "",
        guardianPhone: "",
        preferredBatch: "",
        howDidYouHear: "Other",
        additionalNotes: "",
        paymentOption: "Full Payment",
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        emiTenure: "3 Months"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateStep = (stepNum) => {
        switch (stepNum) {
            case 1:
                if (!formData.fullName || !formData.email || !formData.phone || !formData.dateOfBirth || !formData.gender) {
                    toast.error("Please fill all personal details");
                    return false;
                }
                return true;
            case 2:
                if (!formData.street || !formData.city || !formData.state || !formData.pincode) {
                    toast.error("Please fill your complete address");
                    return false;
                }
                return true;
            case 3:
                if (!formData.qualification || !formData.preferredBatch) {
                    toast.error("Please fill qualification and batch preference");
                    return false;
                }
                return true;
            case 4:
                if (!formData.paymentOption) {
                    toast.error("Please select a payment option");
                    return false;
                }
                if (formData.paymentOption === "Credit/Debit Card" || formData.paymentOption === "EMI") {
                    if (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
                        toast.error("Please fill all card details");
                        return false;
                    }
                }
                return true;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step !== 4) return; // Strict guard to prevent early submissions
        if (!validateStep(4)) return;

        setSubmitting(true);
        try {
            const payload = {
                enrollmentId: enrollment._id,
                courseId: enrollment.course?._id || enrollment.course,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },
                qualification: formData.qualification,
                collegeName: formData.collegeName,
                experience: formData.experience,
                guardianName: formData.guardianName,
                guardianPhone: formData.guardianPhone,
                preferredBatch: formData.preferredBatch,
                howDidYouHear: formData.howDidYouHear,
                additionalNotes: formData.additionalNotes,
                paymentOption: formData.paymentOption
            };

            const res = await API.post("/student-registrations", payload);
            toast.success(res.data.message || "Registration submitted!");
            setSubmitted(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePayment = async () => {
        setPaymentProcessing(true);
        try {
            const { data } = await API.post("/payments/create-checkout-session", {
                enrollmentId: enrollment._id
            });

            if (!data.success) {
                toast.error("Failed to create checkout session");
                setPaymentProcessing(false);
                return;
            }

            // Redirect to Stripe Checkout
            window.location.href = data.url;

        } catch (error) {
            toast.error(error.response?.data?.message || "Payment initialization failed");
            setPaymentProcessing(false);
        }
    };

    if (submitted) {
        return (
            <div className="sr-modal-overlay" onClick={onClose}>
                <div className="sr-modal sr-success-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="sr-success-content">
                        <div className="sr-success-icon-wrap">
                            <FiCheckCircle className="sr-success-icon" />
                        </div>
                        <h2 className="sr-success-title">
                            {paymentSuccess ? "Payment Successful!" : "Registration Successful!"}
                        </h2>
                        <p className="sr-success-text">
                            {paymentSuccess ? (
                                <>Your payment for <strong>{enrollment.course?.title}</strong> has been processed successfully. You can now access your course.</>
                            ) : (
                                <>Your registration for <strong>{enrollment.course?.title}</strong> has been submitted. Please complete the payment to secure your seat and get instant access.</>
                            )}
                        </p>
                        <div className="sr-success-info glass-card">
                            <div className="sr-success-row">
                                <span>Course</span>
                                <strong>{enrollment.course?.title}</strong>
                            </div>
                            <div className="sr-success-row">
                                <span>Preferred Batch</span>
                                <strong>{formData.preferredBatch}</strong>
                            </div>
                            <div className="sr-success-row">
                                <span>Status</span>
                                {paymentSuccess ? (
                                    <span className="badge badge-success">Enrolled</span>
                                ) : (
                                    <span className="badge badge-warning">Pending Payment</span>
                                )}
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
                            {!paymentSuccess ? (
                                <>
                                    <button className="btn btn-secondary" onClick={onClose} disabled={paymentProcessing}>
                                        Pay Later
                                    </button>
                                    <button className="btn btn-primary" onClick={handlePayment} disabled={paymentProcessing}>
                                        {paymentProcessing ? "Processing..." : "Proceed to Payment"}
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-primary" onClick={onClose}>
                                    Go to Dashboard
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="sr-modal-overlay" onClick={onClose}>
            <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
                <div className="sr-modal-header">
                    <div>
                        <h2 className="sr-modal-title">Student Registration</h2>
                        <p className="sr-modal-subtitle">
                            Complete your registration for <strong>{enrollment.course?.title}</strong>
                        </p>
                    </div>
                    <button className="sr-close-btn" onClick={onClose}>
                        <FiX />
                    </button>
                </div>

                <div className="sr-progress">
                    <div className="sr-progress-bar">
                        <div className="sr-progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
                    </div>
                    <div className="sr-steps">
                        <div className={`sr-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
                            <div className="sr-step-num">{step > 1 ? <FiCheckCircle /> : "1"}</div>
                            <span>Personal</span>
                        </div>
                        <div className={`sr-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
                            <div className="sr-step-num">{step > 2 ? <FiCheckCircle /> : "2"}</div>
                            <span>Address</span>
                        </div>
                        <div className={`sr-step ${step >= 3 ? "active" : ""} ${step > 3 ? "completed" : ""}`}>
                            <div className="sr-step-num">{step > 3 ? <FiCheckCircle /> : "3"}</div>
                            <span>Academic</span>
                        </div>
                        <div className={`sr-step ${step >= 4 ? "active" : ""}`}>
                            <div className="sr-step-num">4</div>
                            <span>Payment</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} className="sr-form">
                    {step === 1 && (
                        <div className="sr-form-section animate-fadeIn">
                            <h3 className="sr-section-title">
                                <FiUser className="sr-section-icon" /> Personal Information
                            </h3>
                            <div className="sr-form-grid">
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiUser /> Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiMail /> Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiPhone /> Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiCalendar /> Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group sr-full-width">
                                    <label className="form-label">Gender *</label>
                                    <div className="sr-radio-group">
                                        {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                                            <label key={g} className={`sr-radio-label ${formData.gender === g ? "selected" : ""}`}>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={g}
                                                    checked={formData.gender === g}
                                                    onChange={handleChange}
                                                />
                                                <span className="sr-radio-custom"></span>
                                                {g}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="sr-form-section animate-fadeIn">
                            <h3 className="sr-section-title">
                                <FiMapPin className="sr-section-icon" /> Address Details
                            </h3>
                            <div className="sr-form-grid">
                                <div className="form-group sr-full-width">
                                    <label className="form-label">
                                        <FiMapPin /> Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="House No., Street, Locality"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter city"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter state"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Pincode *</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter pincode"
                                        required
                                    />
                                </div>
                            </div>

                            <h3 className="sr-section-title" style={{ marginTop: "24px" }}>
                                <FiUsers className="sr-section-icon" /> Guardian Details (Optional)
                            </h3>
                            <div className="sr-form-grid">
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiUser /> Guardian Name
                                    </label>
                                    <input
                                        type="text"
                                        name="guardianName"
                                        value={formData.guardianName}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Father/Mother/Guardian name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiPhone /> Guardian Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="guardianPhone"
                                        value={formData.guardianPhone}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Guardian phone number"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="sr-form-section animate-fadeIn">
                            <h3 className="sr-section-title">
                                <FiAward className="sr-section-icon" /> Academic & Preferences
                            </h3>
                            <div className="sr-form-grid">
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiAward /> Qualification *
                                    </label>
                                    <select
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Select Qualification</option>
                                        <option value="10th Pass">10th Pass</option>
                                        <option value="12th Pass">12th Pass</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Post Graduate">Post Graduate</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiBook /> College/School Name
                                    </label>
                                    <input
                                        type="text"
                                        name="collegeName"
                                        value={formData.collegeName}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter institution name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiBriefcase /> Experience
                                    </label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="form-input"
                                    >
                                        <option value="Fresher">Fresher</option>
                                        <option value="0-1 Years">0-1 Years</option>
                                        <option value="1-3 Years">1-3 Years</option>
                                        <option value="3-5 Years">3-5 Years</option>
                                        <option value="5+ Years">5+ Years</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        <FiClock /> Preferred Batch *
                                    </label>
                                    <select
                                        name="preferredBatch"
                                        value={formData.preferredBatch}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Select Batch</option>
                                        <option value="Morning">Morning (9 AM - 12 PM)</option>
                                        <option value="Afternoon">Afternoon (1 PM - 4 PM)</option>
                                        <option value="Evening">Evening (5 PM - 8 PM)</option>
                                        <option value="Weekend">Weekend (Sat & Sun)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">How did you hear about us?</label>
                                    <select
                                        name="howDidYouHear"
                                        value={formData.howDidYouHear}
                                        onChange={handleChange}
                                        className="form-input"
                                    >
                                        <option value="Social Media">Social Media</option>
                                        <option value="Google Search">Google Search</option>
                                        <option value="Friend/Family">Friend/Family</option>
                                        <option value="Advertisement">Advertisement</option>
                                        <option value="YouTube">YouTube</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group sr-full-width">
                                    <label className="form-label">
                                        <FiMessageSquare /> Additional Notes
                                    </label>
                                    <textarea
                                        name="additionalNotes"
                                        value={formData.additionalNotes}
                                        onChange={handleChange}
                                        className="form-input form-textarea"
                                        placeholder="Any additional information you'd like to share..."
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="sr-form-section animate-fadeIn">
                            <h3 className="sr-section-title">
                                <FiCreditCard className="sr-section-icon" /> Payment Options
                            </h3>
                            <div className="sr-form-grid">
                                <div className="form-group sr-full-width">
                                    <label className="form-label">Select Payment Method *</label>
                                    <div className="sr-payment-methods">
                                        {["Full Payment", "Installments", "Credit/Debit Card", "EMI", "UPI", "Bank Transfer"].map(method => (
                                            <div 
                                                key={method}
                                                className={`sr-payment-method-card ${formData.paymentOption === method ? 'selected' : ''}`}
                                                onClick={() => setFormData({...formData, paymentOption: method})}
                                            >
                                                <div className="sr-pm-radio">
                                                    <div className="sr-pm-radio-inner"></div>
                                                </div>
                                                <span>{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p style={{ marginTop: "16px", fontSize: "14px", color: "var(--text-secondary)" }}>
                                        Course: <strong>{enrollment.course?.title}</strong>
                                    </p>
                                </div>
                            </div>
                            
                            {(formData.paymentOption === "Credit/Debit Card" || formData.paymentOption === "EMI") && (
                                <div className="sr-card-details animate-fadeIn" style={{ marginTop: "24px", padding: "24px", background: "linear-gradient(145deg, var(--bg-card) 0%, var(--bg-secondary) 100%)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                        <h4 style={{ margin: 0, fontSize: "16px", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "var(--text-primary)" }}>
                                            <FiCreditCard style={{ color: "var(--primary-light)" }} /> Payment Details
                                        </h4>
                                        <div style={{ display: "flex", gap: "8px", opacity: 0.7 }}>
                                            {/* Dummy payment logos placeholders */}
                                            <div style={{ width: "36px", height: "24px", background: "#f1f5f9", borderRadius: "4px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#64748b", fontWeight: "bold" }}>VISA</div>
                                            <div style={{ width: "36px", height: "24px", background: "#f1f5f9", borderRadius: "4px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#64748b", fontWeight: "bold" }}>MC</div>
                                        </div>
                                    </div>
                                    <div className="sr-form-grid" style={{ gap: "20px" }}>
                                        <div className="form-group sr-full-width">
                                            <label className="form-label" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Name on Card *</label>
                                            <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} className="form-input" style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", padding: "12px 16px" }} placeholder="e.g. John Doe" />
                                        </div>
                                        <div className="form-group sr-full-width">
                                            <label className="form-label" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Card Number *</label>
                                            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={(e) => {
                                                let val = e.target.value.replace(/\s/g, "");
                                                if (val.length > 0) {
                                                    val = val.match(/.{1,4}/g).join(" ");
                                                }
                                                handleChange({ target: { name: 'cardNumber', value: val }});
                                            }} className="form-input" style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", padding: "12px 16px", letterSpacing: "2px", fontFamily: "monospace", fontSize: "1rem" }} placeholder="0000 0000 0000 0000" maxLength="19" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Expiry Date *</label>
                                            <input type="text" name="expiryDate" value={formData.expiryDate} onChange={(e) => {
                                                let val = e.target.value.replace(/\D/g, "");
                                                if (val.length >= 3) {
                                                    val = val.substring(0, 2) + "/" + val.substring(2, 4);
                                                }
                                                handleChange({ target: { name: 'expiryDate', value: val }});
                                            }} className="form-input" style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", padding: "12px 16px" }} placeholder="MM/YY" maxLength="5" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>CVV *</label>
                                            <input type="password" name="cvv" value={formData.cvv} onChange={handleChange} className="form-input" style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", padding: "12px 16px", letterSpacing: "4px" }} placeholder="•••" maxLength="4" />
                                        </div>
                                        {formData.paymentOption === "EMI" && (
                                            <div className="form-group sr-full-width" style={{ marginTop: "4px" }}>
                                                <label className="form-label" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Select EMI Tenure *</label>
                                                <select name="emiTenure" value={formData.emiTenure} onChange={handleChange} className="form-input" style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", padding: "12px 16px" }}>
                                                    <option value="3 Months">3 Months</option>
                                                    <option value="6 Months">6 Months</option>
                                                    <option value="9 Months">9 Months</option>
                                                    <option value="12 Months">12 Months</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                        <FiCheckCircle style={{ color: "var(--success)", fontSize: "14px" }} />
                                        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Payments are 256-bit encrypted and secure.</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="sr-form-actions">
                        {step > 1 && (
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                <FiChevronLeft /> Previous
                            </button>
                        )}
                        <div className="sr-actions-right">
                            {step < 4 ? (
                                <button type="button" className="btn btn-primary" onClick={nextStep}>
                                    Next <FiChevronRight />
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-success" disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <span className="sr-btn-spinner"></span> Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <FiCheckCircle /> Submit Registration
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentRegistration;
