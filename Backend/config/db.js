import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const { MONGO_URI, MONGO_DB_NAME } = process.env;
        if (!MONGO_URI) {
            console.error("MongoDB connection failed: MONGO_URI is not defined");
            process.exit(1);
        }

        const connectOptions = {};
        if (MONGO_DB_NAME) connectOptions.dbName = MONGO_DB_NAME;

        await mongoose.connect(MONGO_URI, connectOptions);
        console.log(`MongoDB connected successfully`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;