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
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                text: {
                    type: String,
                    required: true,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                userName: {
                    type: String,
                    required: true,
                },
                likes: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                ],
                dislikes: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                ],
            },
        ],
    },
    { timestamps: true }
);

// Method to toggle like on a resource
ResourceSchema.methods.toggleLike = function (userId) {
    const index = this.likes.indexOf(userId);
    if (index === -1) {
        this.likes.push(userId);
        // Remove user from dislikes if they are present
        const dislikeIndex = this.dislikes.indexOf(userId);
        if (dislikeIndex !== -1) {
            this.dislikes.splice(dislikeIndex, 1);
        }
    } else {
        this.likes.splice(index, 1);
    }
};

// Method to toggle dislike on a resource
ResourceSchema.methods.toggleDislike = function (userId) {
    const index = this.dislikes.indexOf(userId);
    if (index === -1) {
        this.dislikes.push(userId);
        // Remove user from likes if they are present
        const likeIndex = this.likes.indexOf(userId);
        if (likeIndex !== -1) {
            this.likes.splice(likeIndex, 1);
        }
    } else {
        this.dislikes.splice(index, 1);
    }
};

// Method to add a comment
ResourceSchema.methods.addComment = function (text, userId, userName) {
    this.comments.push({ text, user: userId, userName });
};

// Method to delete a comment
ResourceSchema.methods.deleteComment = function (commentId, userId) {
    const comment = this.comments.id(commentId);
    if (comment && comment.user.toString() === userId.toString()) {
        comment.deleteOne();
        return true;
    }
    return false;
};

const Resource = mongoose.model("Resource", ResourceSchema);

export default Resource;