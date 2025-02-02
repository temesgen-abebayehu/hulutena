import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["video", "audio", "written"],
        },
        description: {
            type: String,
            required: true,
        },
        src: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            default: "/audioicon.jpg",
        },
    },
    { timestamps: true, }
);

const Resource = mongoose.model("Resource", ResourceSchema);

export default Resource;