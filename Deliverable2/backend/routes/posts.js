const express = require("express");

const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require("../data/posts.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const posts = await getAllPosts();

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve posts."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        res.json(post);
    } catch (error) {
        res.status(400).json({
            message: "Invalid post ID."
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            userId,
            title,
            description,
            image,
            hashtags,
            category
        } = req.body;

        if (!userId || !title || !description || !image) {
            return res.status(400).json({
                message: "Required post information is missing."
            });
        }

        const post = await createPost({
            userId,
            title,
            description,
            image,
            hashtags: hashtags || [],
            category: category || [],
            likes: []
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Unable to create post."
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { description, hashtags, category } = req.body;

        const post = await updatePost(
            req.params.id,
            {
                description,
                hashtags,
                category
            }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        res.json(post);
    } catch (error) {
        res.status(400).json({
            message: "Unable to update post."
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await deletePost(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        res.json({
            message: "Post deleted successfully."
        });
    } catch (error) {
        res.status(400).json({
            message: "Unable to delete post."
        });
    }
});

module.exports = router;