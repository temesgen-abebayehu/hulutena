import Discussion from "../models/Discussion.model.js";

export const getDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            res.status(404).json({ message: "Discussion not found" });
        }

        res.status(200).json(discussion);
    } catch (error) {
        console.error(`Erron in getDiscussion: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        if (!discussions) {
            res.status(404).json({ message: "Discussions not found" });
        }

        res.status(200).json(discussions);
    } catch (error) {
        console.error(`Error in getDiscussions: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const createDiscussion = async (req, res) => {
    try {
        const author = req.user.id;
        const { title, catagory, content } = req.body;

        const newDiscussion = new Discussion({
            title,
            catagory,
            content,
            author
        });

        await newDiscussion.save();
        res.status(201).json(newDiscussion);
    } catch (error) {
        console.error(`Error in createDiscussion: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const editDiscussion = async (req, res) => {
    const id = req.params.id;
    try {
        const { title, catagory, content } = req.body;

        const updatedDiscussion = await Discussion.findByIdAndUpdate(
            id,
            { title, catagory, content },
            { new: true, runValidators: true }
        );
        if (!updatedDiscussion) {
            res.status(404).json({ message: "Discussion not found" });
        }
        
        res.status(200).json(updatedDiscussion);
    } catch (error) {
        console.error(`Error in editDiscussion: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(req.params.id);
        if (!discussion) {
            res.status(404).json({ message: "Discussion not found" });
        }

        res.status(200).json({ message: "Discussion deleted successfully" });
    } catch (error) {
        console.error(`Error in deleteDiscussion: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};