//Rachel Kambala u23559129
const express = require("express");

const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getLocalPosts,
    reportPost
} = require("../data/posts.js");

const router = express.Router();

//Local Feed
router.get(
    "/feed/local/:userId",
    async (req, res) => {

        try {

            const posts =
                await getLocalPosts(
                    req.params.userId
                );


            if (posts === null) {

                return res
                    .status(404)
                    .json({
                        message:
                            "User not found."
                    });

            }


            res.status(200).json(posts);


        } catch (error) {

            console.error(
                "Local feed error:",
                error
            );


            res.status(400).json({
                message:
                    "Unable to retrieve local feed."
            });

        }
    }
);

//ALL POSTS
router.get("/", async (req, res) => {
    try {
        const posts = await getAllPosts();

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Unable to retrieve posts."
        });
    }
});

//ONE POST
router.get("/:id", async (req, res) => {
    try {
        const post = await getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        res.status(200).json(post);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Invalid post ID."
        });
    }
});

//CREATE POST
router.post("/", async (req, res) => {
    try {
        const {
            userId,
            artist,
            artistName,
            title,
            description,
            image,
            hashtags
        } = req.body;

        if (
            !userId ||
            !title ||
            !description ||
            !image
        ) {
            return res.status(400).json({
                message:
                    "User, title, description and image are required."
            });
        }

        const post = await createPost({
            userId,
            artist,
            artistName,
            title,
            description,
            image,
            hashtags: hashtags || []
        });

        res.status(201).json(post);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Unable to create post."
        });
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const {
            description,
            hashtags
        } = req.body;

        const post = await updatePost(
            req.params.id,
            {
                description,
                hashtags
            }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        res.status(200).json(post);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Unable to update post."
        });
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const result = await deletePost(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        res.status(200).json({
            message: "Post deleted successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Unable to delete post."
        });
    }
});

//REPORT POST
router.post(
    "/:id/report",
    async (req, res) => {

        try {

            const {
                userId,
                reason
            } = req.body;


            if (!userId || !reason) {

                return res
                    .status(400)
                    .json({
                        message:
                            "User and report reason are required."
                    });

            }


            const post =
                await reportPost(
                    req.params.id,
                    userId,
                    reason
                );


            if (post === "already-reported") {

                return res.status(409).json({
                    message:
                        "You have already reported this post."
                });

            }


            res.status(200).json({
                message:
                    "Post reported successfully."
            });


        } catch (error) {

            console.error(
                "Report error:",
                error
            );


            res.status(400).json({
                message:
                    "Unable to report post."
            });

        }
    }
);

module.exports = router;