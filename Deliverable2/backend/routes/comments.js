const express = require("express");

const {
    getAllComments,
    getCommentById,
    getCommentsByPostId,
    createComment,
    updateComment,
    deleteComment
} = require("../data/comments.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const comments = await getAllComments();

        res.json(comments);

    } catch (error) {
        console.error("Get comments error:", error);

        res.status(500).json({
            message: "Unable to retrieve comments."
        });
    }
});

router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await getCommentsByPostId(
            req.params.postId
        );

        res.json(comments);

    } catch (error) {
        console.error("Get post comments error:", error);

        res.status(400).json({
            message: "Unable to retrieve post comments."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const comment = await getCommentById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found."
            });
        }

        res.json(comment);

    } catch (error) {
        console.error("Get comment error:", error);

        res.status(400).json({
            message: "Invalid comment ID."
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            postId,
            userId,
            text
        } = req.body;

        if (!postId || !userId || !text) {
            return res.status(400).json({
                message:
                    "Post ID, user ID and comment text are required."
            });
        }

        const comment = await createComment({
            postId: new ObjectId(postId),
            userId: new ObjectId(userId),
            text
        });

        res.status(201).json(comment);

    } catch (error) {
        console.error("Create comment error:", error);

        res.status(500).json({
            message: "Unable to create comment."
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Comment text is required."
            });
        }

        const comment = await updateComment(
            req.params.id,
            { text }
        );

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found."
            });
        }

        res.json(comment);

    } catch (error) {
        console.error("Update comment error:", error);

        res.status(400).json({
            message: "Unable to update comment."
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteComment(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Comment not found."
            });
        }

        res.json({
            message: "Comment deleted successfully."
        });

    } catch (error) {
        console.error("Delete comment error:", error);

        res.status(400).json({
            message: "Unable to delete comment."
        });
    }
});

module.exports = router;