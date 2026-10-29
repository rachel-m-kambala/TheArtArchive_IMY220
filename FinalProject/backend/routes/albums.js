//Rachel Kambala u23559129
const express = require("express");

const {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    addPostToAlbum,
    removePostFromAlbum
} = require("../data/albums.js");

const router = express.Router();

//Get All Albums
router.get("/", async (req, res) => {
    try {
        const albums = await getAllAlbums();

        res.status(200).json(albums);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Unable to retrieve albums."
        });
    }
});

//Get One Album
router.get("/:id", async (req, res) => {
    try {
        const album = await getAlbumById(req.params.id);

        if (!album) {
            return res.status(404).json({
                message: "Album not found."
            });
        }

        res.status(200).json(album);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Invalid album ID."
        });
    }
});

//Create Album
router.post("/", async (req, res) => {
    try {
        const {
            userId,
            name,
            description,
            hashtags
        } = req.body;

        if (!userId || !name || !description) {
            return res.status(400).json({
                message:
                    "User, album name and description are required."
            });
        }

        const album = await createAlbum({
            userId,
            name,
            description,
            hashtags: hashtags || []
        });

        res.status(201).json(album);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Unable to create album."
        });
    }
});

//Update Album
router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            description,
            hashtags
        } = req.body;

        const album = await updateAlbum(
            req.params.id,
            {
                name,
                description,
                hashtags
            }
        );

        if (!album) {
            return res.status(404).json({
                message: "Album not found."
            });
        }

        res.status(200).json(album);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Unable to update album."
        });
    }
});

//Add Post To Album
router.put("/:id/posts", async (req, res) => {
    try {
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({
                message: "Post ID is required."
            });
        }

        const album = await addPostToAlbum(
            req.params.id,
            postId
        );

        if (!album) {
            return res.status(404).json({
                message: "Album not found."
            });
        }

        res.status(200).json(album);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Unable to add post to album."
        });
    }
});

//Remove Post From Album
router.delete("/:id/posts/:postId", async (req, res) => {
    try {
        const album = await removePostFromAlbum(
            req.params.id,
            req.params.postId
        );

        if (!album) {
            return res.status(404).json({
                message: "Album not found."
            });
        }

        res.status(200).json(album);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Unable to remove post from album."
        });
    }
});

//Delete Album
router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteAlbum(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Album not found."
            });
        }

        res.status(200).json({
            message: "Album deleted successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Unable to delete album."
        });
    }
});

module.exports = router;