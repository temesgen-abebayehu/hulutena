import Resource from "../models/Resource.model.js";

export const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        if (!resources) {
            return res.status(404).json({ message: "No resources found." });
        }
        res.status(200).json(resources);
    } catch (error) {
        console.log(`Error in getResources: ${error}`);
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
        console.log(`Error in getResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const createResource = async (req, res) => {
    const { title, type, description, src, img } = req.body;
    try {
        const resource = new Resource({ title, type, description, src, img });
        await resource.save();

        res.status(201).json(resource);
    } catch (error) {
        console.log(`Error in createResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const editResource = async (req, res) => {
    const { title, type, description, src, img } = req.body;
    try {
        const resource = await Resource.findByIdAndUpdate(
            req.params.id, 
            { 
                title,
                type, 
                description, 
                src, 
                img 
            }, { new: true }
        );
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        
        res.status(200).json(resource);
    } catch (error) {
        console.log(`Error in editResource: ${error}`);
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
        console.log(`Error in deleteResource: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};