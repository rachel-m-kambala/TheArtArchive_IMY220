const express = require("express");

const {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbumsByUserId,
    addPostToAlbum,
    removePostFromAlbum
} = require("../data/albums.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const albums = await getAllAlbums();

        res.json(albums);

    } catch (error) {
        console.error("Get albums error:", error);

        res.status(500).json({
            message: "Unable to retrieve albums."
        });
    }
});

router.get("/user/:userId", async (req, res) => {
    try {
        const albums = await getAlbumsByUserId(
            req.params.userId
        );

        res.json(albums);

    } catch (error) {
        console.error("Get user albums error:", error);

        res.status(400).json({
            message: "Unable to retrieve user's albums."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const album = await getAlbumById(req.params.id);

        if (!album) {
            return res.status(404).json({
                message: "Album not found."
            });
        }

        res.json(album);

    } catch (error) {
        console.error("Get album error:", error);

        res.status(400).json({
            message: "Invalid album ID."
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            ownerId,
            name,
            description,
            hashtags
        } = req.body;

        if (!ownerId || !name) {
            return res.status(400).json({
                message:
                    "Album owner and name are required."
            });
        }

        const album = await createAlbum({
            ownerId,
            name,
            description: description || "",
            hashtags: hashtags || []
        });

        res.status(201).json(album);

    } catch (error) {
        console.error("Create album error:", error);

        res.status(500).json({
            message: "Unable to create album."
        });
    }
});

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

        res.json(album);

    } catch (error) {
        console.error("Update album error:", error);

        res.status(400).json({
            message: "Unable to update album."
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteAlbum(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Album not found."
            });
        }

        res.json({
            message: "Album deleted successfully."
        });

    } catch (error) {
        console.error("Delete album error:", error);

        res.status(400).json({
            message: "Unable to delete album."
        });
    }
});

router.put("/:id/posts/:postId", async (req, res) => {
    try {
        const album = await addPostToAlbum(
            req.params.id,
            req.params.postId
        );

        if (!album) {
            return res.status(404).json({
                message: "Album not found."
            });
        }

        res.json(album);

    } catch (error) {
        console.error("Add post to album error:", error);

        res.status(400).json({
            message: "Unable to add post to album."
        });
    }
});

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

        res.json(album);

    } catch (error) {
        console.error("Remove post from album error:", error);

        res.status(400).json({
            message: "Unable to remove post from album."
        });
    }
});

module.exports = router;