import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eduvision-institute";

export const connectDB = async () => {
    // If already connected, reuse the active connection
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // If connection is in progress, await its completion
    if (mongoose.connection.readyState === 2) {
        console.log("⏳ MongoDB connection in progress... awaiting completion...");
        return new Promise((resolve, reject) => {
            const handleConnect = () => {
                cleanup();
                resolve(mongoose.connection);
            };
            const handleDisconnect = (err) => {
                cleanup();
                reject(err || new Error("Failed to connect to MongoDB"));
            };
            const cleanup = () => {
                mongoose.connection.off("connected", handleConnect);
                mongoose.connection.off("error", handleDisconnect);
            };
            mongoose.connection.on("connected", handleConnect);
            mongoose.connection.on("error", handleDisconnect);
        });
    }

    console.log("🔄 Initiating new MongoDB connection...");
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Failure: ${error.message}`);
        throw error;
    }
};

export const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("❌ MongoDB Connection Middleware Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: err.message
        });
    }
};

export default connectDB;
