import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        catagory: {
            type: String,
            required: true,
            enum: ["general", "doctor", "patient", "pharmacy", "physcal health", "mental health"],
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        replies: [
            {
                comment: {
                    type: String,
                    required: true,
                },
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                likes: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                ],
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }        
);

const Discussion = mongoose.model("Discussion", discussionSchema);

export default Discussion;