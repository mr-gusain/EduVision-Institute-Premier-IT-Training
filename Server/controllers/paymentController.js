import Stripe from "stripe";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import dotenv from "dotenv";

dotenv.config();

export const createCheckoutSession = async (req, res) => {
    try {
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        const { enrollmentId } = req.body;

        if (!enrollmentId) {
            return res.status(400).json({ success: false, message: "Enrollment ID is required" });
        }

        const enrollment = await Enrollment.findById(enrollmentId).populate("course");
        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }

        // Graceful mock payment bypass if Stripe Key is not set in .env
        if (!stripeKey) {
            console.warn("STRIPE_SECRET_KEY is missing from Server/.env. Initializing EVIT Mock Payment Checkout Gateway.");
            const mockUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/courses?payment=success&session_id=mock_session_id_${Date.now()}&enrollment_id=${enrollmentId}`;
            
            enrollment.orderId = `mock_session_id_${Date.now()}`;
            await enrollment.save();
            
            return res.status(200).json({ success: true, url: mockUrl });
        }

        const stripe = new Stripe(stripeKey);

        // Determine price
        const amount = enrollment.course.discountPrice > 0 ? enrollment.course.discountPrice : enrollment.course.price;
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: enrollment.course.title,
                            description: `Enrollment ID: ${enrollmentId}`,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/courses?payment=success&session_id={CHECKOUT_SESSION_ID}&enrollment_id=${enrollmentId}`,
            cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/courses?payment=cancelled`,
            metadata: {
                enrollmentId: enrollmentId.toString()
            }
        });

        // Update enrollment with checkout session id
        enrollment.orderId = session.id;
        await enrollment.save();

        res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        const { session_id, enrollmentId } = req.body;

        if (!session_id || !enrollmentId) {
            return res.status(400).json({ success: false, message: "Missing session ID or enrollment ID" });
        }

        // Handle mock checkout session completion
        if (session_id.startsWith("mock_session_id_")) {
            const enrollment = await Enrollment.findById(enrollmentId).populate("course");
            if (enrollment) {
                enrollment.paymentId = `mock_pay_intent_${Date.now()}`;
                enrollment.paymentStatus = "Completed";
                enrollment.status = "active";
                enrollment.amountPaid = enrollment.course.discountPrice > 0 ? enrollment.course.discountPrice : enrollment.course.price;
                await enrollment.save();

                return res.status(200).json({
                    success: true,
                    message: "Mock Payment verified successfully (Stripe Secret Key not set)",
                    enrollment
                });
            }
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }

        if (!stripeKey) {
            return res.status(400).json({ success: false, message: "Stripe key not configured on server" });
        }

        const stripe = new Stripe(stripeKey);
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === "paid") {
            const enrollment = await Enrollment.findById(enrollmentId).populate("course");
            if (enrollment) {
                enrollment.paymentId = session.payment_intent;
                enrollment.paymentStatus = "Completed";
                enrollment.status = "active";
                enrollment.amountPaid = enrollment.course.discountPrice > 0 ? enrollment.course.discountPrice : enrollment.course.price;
                await enrollment.save();

                return res.status(200).json({
                    success: true,
                    message: "Payment verified successfully",
                    enrollment
                });
            }
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        } else {
            return res.status(400).json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
