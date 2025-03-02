import Resource from "../models/Resource.model.js";

export const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        console.error(`Error in getResources: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.status(200).json(resource);
    } catch (error) {
        console.error(`Error in getResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const createResource = async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        console.error(`Error in createResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const editResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.status(200).json(resource);
    } catch (error) {
        console.error(`Error in editResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.status(200).json({ message: "Resource deleted successfully." });
    } catch (error) {
        console.error(`Error in deleteResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const likeResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        resource.toggleLike(req.user._id);
        await resource.save();
        res.status(200).json(resource);
    } catch (error) {
        console.error(`Error in likeResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const dislikeResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        resource.toggleDislike(req.user._id);
        await resource.save();
        res.status(200).json(resource);
    } catch (error) {
        console.error(`Error in dislikeResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const addComment = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        resource.addComment(req.body.text, req.body.user, req.body.userName);
        await resource.save();
        res.status(200).json(resource);
    } catch (error) {
        console.error(`Error in addComment: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        const isDeleted = resource.deleteComment(req.params.commentId, req.user._id);
        if (!isDeleted) {
            return res.status(403).json({ message: "You are not authorized to delete this comment." });
        }
        await resource.save();
        res.status(200).json(resource);
    } catch (error) {
        console.error(`Error in deleteComment: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};