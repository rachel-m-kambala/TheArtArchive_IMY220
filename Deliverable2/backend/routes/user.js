//{} ""
const express = require("express");

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require("../data/user.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const users = await getAllUsers();

        res.json(users);
    } catch (error){
        console.error("Get users error:", error);
        res.status(400).json({
            message: "Unable to retrieve users."
        });
    }
});

router.get("/:id", async (req, res) => {
    try{
        const user = await getUserById(req.params.id);

        if(!user){
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.json(user);
    } catch (error){
        console.error("Get user error:", error);
        res.status(400).json({
            message: "Unable to retrieve user."
        });
    }
});

router.post("/", async (req, res) =>{
    try{
        const{
            username,
            email,
            name,
            bio,
            pronouns,
            profilePicture
        } = req.body;

        if(!username || !email || !name){
            return res.status(400).json({
                message: "Username, email and name are required."
            });
        }

        const user = await createUser({
            username,
            email,
            name,
            bio,
            pronouns,
            profilePicture
        });

        res.status(201).json(user);
    } catch (error){
        console.error("Create user error:", error);
        res.status(400).json({
            message: "Unable to create user."
        });
    }
});

router.put("/:id", async (req, res) =>{
    try{
        const{
            username,
            name,
            bio,
            pronouns,
            profilePicture
        } = req.body;

        const user = await updateUser(
            req.params.id,
            {
                username,
                name,
                bio,
                pronouns,
                profilePicture
            }
        );

        if(!user){
            return res.status(404).json({
                message: "User not found."
            });
        }
    } catch (error){
        console.error("Update user error:", error);
        res.status(400).json({
            message: "Unable to update user."
        });
    }
});

router.delete("/:id", async (req, res) =>{
    try{
        const result = await deleteUser(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.json({
            message: "User deleted successfully."
        });
    } catch (error){
        console.error("Delete user error:", error);
        res.status(400).json({
            message: "Unable to delete user."
        });
    }
});

router.put("/:id/friends/:friendId", async (req, res) => {
    try {
        const user = await addFriend(
            req.params.id,
            req.params.friendId
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.json(user);

    } catch (error) {
        console.error("Add friend error:", error);

        res.status(400).json({
            message: "Unable to add friend."
        });
    }
});

router.delete("/:id/friends/:friendId", async (req, res) => {
    try {
        const user = await removeFriend(
            req.params.id,
            req.params.friendId
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.json(user);

    } catch (error) {
        console.error("Remove friend error:", error);

        res.status(400).json({
            message: "Unable to remove friend."
        });
    }
});

module.exports = router;