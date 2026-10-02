//Rachel Kambala u23559129
const express = require("express");
const bcrypt = require("bcrypt");

const {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
} = require("../data/user.js");

const router = express.Router();

//SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message:
                    "Username, email and password are required."
            });
        }

        const existingEmail =
            await getUserByEmail(email);

        if (existingEmail) {
            return res.status(409).json({
                message:
                    "An account with this email already exists."
            });
        }

        const existingUsername =
            await getUserByUsername(username);

        if (existingUsername) {
            return res.status(409).json({
                message:
                    "This username is already taken."
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const newUser = await createUser({
            username: username.trim(),
            email: email.trim().toLowerCase(),

            password: hashedPassword,

            name: username.trim(),
            bio: "",
            role: "Artist",
            pronouns: "",
            profileImage: "",

            friends: [],
            sentFriendRequests: [],
            receivedFriendRequests: [],

            createdAt: new Date()
        });

        res.status(201).json({
            message:
                "Account created successfully.",

            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                name: newUser.name
            }
        });

    } catch (error) {
        console.error(
            "Signup error:",
            error
        );

        res.status(500).json({
            message:
                "Unable to create account."
        });
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required."
            });
        }

        const user =
            await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message:
                    "Incorrect email or password."
            });
        }

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatches) {
            return res.status(401).json({
                message:
                    "Incorrect email or password."
            });
        }

        res.status(200).json({
            message:
                "Login successful.",

            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.error(
            "Login error:",
            error
        );

        res.status(500).json({
            message:
                "Unable to log in."
        });
    }
});

//ALL USERS
router.get("/", async (req, res) => {
    try {
        const users =
            await getAllUsers();

        const safeUsers = users.map(
            ({ password, ...user }) => user
        );

        res.json(safeUsers);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                "Unable to retrieve users."
        });
    }
});

//ONE USER
router.get("/:id", async (req, res) => {
    try {
        const user =
            await getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message:
                    "User not found."
            });
        }

        const {
            password,
            ...safeUser
        } = user;

        res.json(safeUser);

    } catch (error) {
        res.status(400).json({
            message:
                "Invalid user ID."
        });
    }
});

//UPDATE USER
router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            bio,
            role,
            pronouns,
            profileImage
        } = req.body;

        const updatedUser =
            await updateUser(
                req.params.id,
                {
                    name,
                    bio,
                    role,
                    pronouns,
                    profileImage
                }
            );

        if (!updatedUser) {
            return res.status(404).json({
                message:
                    "User not found."
            });
        }

        const {
            password,
            ...safeUser
        } = updatedUser;

        res.json(safeUser);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message:
                "Unable to update user."
        });
    }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        const result =
            await deleteUser(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message:
                    "User not found."
            });
        }

        res.json({
            message:
                "User deleted successfully."
        });

    } catch (error) {
        res.status(400).json({
            message:
                "Unable to delete user."
        });
    }
});

/*router.put("/:id/friends/:friendId", async (req, res) => {
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
});*/

module.exports = router;