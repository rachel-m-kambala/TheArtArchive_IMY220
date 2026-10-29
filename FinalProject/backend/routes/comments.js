//Rachel Kambala u23559129
const express = require("express");

const {
    getCommentsByPostId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} = require("../data/comments.js");

const router = express.Router();

//All Comments
router.get(
    "/post/:postId",
    async (req, res) => {
        try {
            const comments =
                await getCommentsByPostId(
                    req.params.postId
                );
            res.status(200).json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message:
                    "Unable to retrieve comments."
            });
        }
    }
);

//One Comment
router.get("/:id", async (req, res) => {
    try {
        const comment =
            await getCommentById(
                req.params.id
            );
        if (!comment) {
            return res
                .status(404)
                .json({
                    message:
                        "Comment not found."
                });

        }
        res.status(200).json(comment);
    } catch (error) {

        res.status(400).json({
            message:
                "Invalid comment ID."
        });

    }
});

//Create Comment
router.post("/", async (req, res) => {
    try {
        const {
            postId,
            userId,
            username,
            text
        } = req.body;

        if (
            !postId ||
            !userId ||
            !username ||
            !text?.trim()
        ) {
            return res
                .status(400)
                .json({
                    message:
                        "Comment information is incomplete."
                });

        }

        const comment =
            await createComment({
                postId,
                userId,
                username,
                text: text.trim()
            });

        res.status(201).json(comment);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                "Unable to create comment."
        });

    }
});

//Update Comment
router.put("/:id", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text?.trim()) {

            return res
                .status(400)
                .json({
                    message:
                        "Comment cannot be empty."
                });

        }

        const comment =
            await updateComment(
                req.params.id,
                text.trim()
            );

        if (!comment) {

            return res
                .status(404)
                .json({
                    message:
                        "Comment not found."
                });

        }

        res.status(200).json(comment);

    } catch (error) {

        res.status(400).json({
            message:
                "Unable to update comment."
        });

    }
});

//Delete Comment
router.delete(
    "/:id",
    async (req, res) => {

        try {

            const result =
                await deleteComment(
                    req.params.id
                );


            if (
                result.deletedCount === 0
            ) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Comment not found."
                    });

            }


            res.status(200).json({
                message:
                    "Comment deleted successfully."
            });


        } catch (error) {

            res.status(400).json({
                message:
                    "Unable to delete comment."
            });

        }
    }
);


module.exports = router;