import Discussion from "../models/Discussion.model.js";

// get one discussion
export const getDiscussion = async (req, res) =>{
    try {
        const discussion = await Discussion.findById(req.params.id);
        res.status(200).json(discussion);
    } catch (error) {
    console.error(`Error in getDiscussions: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
    }
}

// Get all discussions
export const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.status(200).json(discussions);
  } catch (error) {
    console.error(`Error in getDiscussions: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new discussion
export const createDiscussion = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const authorId = req.user.id;
    const authorName = req.user.fullName;

    const newDiscussion = new Discussion({
      title,
      category,
      content,
      author: { _id: authorId, name: authorName },
    });

    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (error) {
    console.error(`Error in createDiscussion: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Edit a discussion
export const editDiscussion = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      { title, category, content },
      { new: true, runValidators: true }
    );
    if (!updatedDiscussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.status(200).json(updatedDiscussion);
  } catch (error) {
    console.error(`Error in editDiscussion: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a discussion
export const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.status(200).json({ message: "Discussion deleted successfully" });
  } catch (error) {
    console.error(`Error in deleteDiscussion: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Like or unlike a discussion
export const likeDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    discussion.toggleLike(req.user.id);
    await discussion.save();
    res.status(200).json(discussion);
  } catch (error) {
    console.error(`Error in likeDiscussion: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    discussion.addComment(req.body.comment, req.user.id, req.user.fullName);
    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    console.error(`Error in addComment: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Edit a comment
export const editComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    const comment = discussion.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.comment = req.body.comment;
    await discussion.save();
    res.status(200).json(discussion);
  } catch (error) {
    console.error(`Error in editComment: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    const comment = discussion.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.deleteOne();
    await discussion.save();
    res.status(200).json(discussion);
  } catch (error) {
    console.error(`Error in deleteComment: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Like or unlike a comment
export const likeComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    const comment = discussion.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const userId = req.user.id;
    const index = comment.likes.indexOf(userId);

    if (index === -1) {
      comment.likes.push(userId);
    } else {
      comment.likes.splice(index, 1);
    }

    await discussion.save();
    res.status(200).json(discussion);
  } catch (error) {
    console.error(`Error in likeComment: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};