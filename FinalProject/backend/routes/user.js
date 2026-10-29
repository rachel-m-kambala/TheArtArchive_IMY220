//Rachel Kambala u23559129
const express = require("express");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

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


/* FRIENDSHIP ROUTES */

// SEND A FRIEND REQUEST
router.post("/:id/friend-requests", async (req, res) => {
    try {
        const targetId = req.params.id;
        const { requesterId } = req.body;

        if (
            !ObjectId.isValid(targetId) ||
            !ObjectId.isValid(requesterId)
        ) {
            return res.status(400).json({
                message: "Invalid user ID."
            });
        }

        if (targetId === requesterId) {
            return res.status(400).json({
                message: "You cannot send yourself a friend request."
            });
        }

        const target = await getUserById(targetId);
        const requester = await getUserById(requesterId);

        if (!target || !requester) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const targetFriends = (target.friends || []).map(
            friend => String(friend._id || friend)
        );

        if (targetFriends.includes(requesterId)) {
            return res.status(409).json({
                message: "You are already friends."
            });
        }

        const targetReceived = (target.receivedFriendRequests || []).map(
            String
        );

        const requesterSent = (requester.sentFriendRequests || []).map(
            String
        );

        if (
            targetReceived.includes(requesterId) ||
            requesterSent.includes(targetId)
        ) {
            return res.status(409).json({
                message: "A friend request is already pending."
            });
        }

        const requesterReceived = (
            requester.receivedFriendRequests || []
        ).map(String);

        const targetSent = (target.sentFriendRequests || []).map(
            String
        );

        if (
            requesterReceived.includes(targetId) ||
            targetSent.includes(requesterId)
        ) {
            return res.status(409).json({
                message: "This user has already sent you a friend request. Accept it instead."
            });
        }

        await updateUser(targetId, {
            receivedFriendRequests: [
                ...(target.receivedFriendRequests || []),
                requesterId
            ]
        });

        await updateUser(requesterId, {
            sentFriendRequests: [
                ...(requester.sentFriendRequests || []),
                targetId
            ]
        });

        res.status(200).json({
            message: "Friend request sent successfully."
        });
    } catch (error) {
        console.error("Send friend request error:", error);

        res.status(500).json({
            message: "Unable to send friend request."
        });
    }
});


// ACCEPT A FRIEND REQUEST
router.post(
    "/:id/friend-requests/:requesterId/accept",
    async (req, res) => {
        try {
            const { id, requesterId } = req.params;

            if (
                !ObjectId.isValid(id) ||
                !ObjectId.isValid(requesterId)
            ) {
                return res.status(400).json({
                    message: "Invalid user ID."
                });
            }

            const user = await getUserById(id);
            const requester = await getUserById(requesterId);

            if (!user || !requester) {
                return res.status(404).json({
                    message: "User not found."
                });
            }

            const received = (
                user.receivedFriendRequests || []
            ).map(String);

            if (!received.includes(requesterId)) {
                return res.status(400).json({
                    message: "No pending friend request from this user."
                });
            }

            await updateUser(id, {
                friends: [
                    ...new Set([
                        ...(user.friends || []).map(String),
                        requesterId
                    ])
                ],
                receivedFriendRequests: received.filter(
                    friendId => friendId !== requesterId
                ),
                sentFriendRequests: (
                    user.sentFriendRequests || []
                ).filter(friendId => String(friendId) !== requesterId)
            });

            await updateUser(requesterId, {
                friends: [
                    ...new Set([
                        ...(requester.friends || []).map(String),
                        id
                    ])
                ],
                sentFriendRequests: (
                    requester.sentFriendRequests || []
                ).filter(friendId => String(friendId) !== id),
                receivedFriendRequests: (
                    requester.receivedFriendRequests || []
                ).filter(friendId => String(friendId) !== id)
            });

            res.json({
                message: "Friend request accepted."
            });
        } catch (error) {
            console.error("Accept friend request error:", error);

            res.status(500).json({
                message: "Unable to accept friend request."
            });
        }
    }
);


// DECLINE A FRIEND REQUEST OR CANCEL A SENT REQUEST
router.delete(
    "/:id/friend-requests/:requesterId",
    async (req, res) => {
        try {
            const { id, requesterId } = req.params;

            if (
                !ObjectId.isValid(id) ||
                !ObjectId.isValid(requesterId)
            ) {
                return res.status(400).json({
                    message: "Invalid user ID."
                });
            }

            const user = await getUserById(id);
            const requester = await getUserById(requesterId);

            if (!user || !requester) {
                return res.status(404).json({
                    message: "User not found."
                });
            }

            await updateUser(id, {
                receivedFriendRequests: (
                    user.receivedFriendRequests || []
                ).filter(friendId => String(friendId) !== requesterId),
                sentFriendRequests: (
                    user.sentFriendRequests || []
                ).filter(friendId => String(friendId) !== requesterId)
            });

            await updateUser(requesterId, {
                sentFriendRequests: (
                    requester.sentFriendRequests || []
                ).filter(friendId => String(friendId) !== id),
                receivedFriendRequests: (
                    requester.receivedFriendRequests || []
                ).filter(friendId => String(friendId) !== id)
            });

            res.json({
                message: "Friend request removed."
            });
        } catch (error) {
            console.error("Remove friend request error:", error);

            res.status(500).json({
                message: "Unable to remove friend request."
            });
        }
    }
);


// REMOVE A FRIEND
router.delete("/:id/friends/:friendId", async (req, res) => {
    try {
        const { id, friendId } = req.params;

        if (
            !ObjectId.isValid(id) ||
            !ObjectId.isValid(friendId)
        ) {
            return res.status(400).json({
                message: "Invalid user ID."
            });
        }

        const user = await getUserById(id);
        const friend = await getUserById(friendId);

        if (!user || !friend) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        await updateUser(id, {
            friends: (user.friends || []).filter(
                value => String(value._id || value) !== friendId
            )
        });

        await updateUser(friendId, {
            friends: (friend.friends || []).filter(
                value => String(value._id || value) !== id
            )
        });

        res.json({
            message: "Friend removed successfully."
        });
    } catch (error) {
        console.error("Remove friend error:", error);

        res.status(500).json({
            message: "Unable to remove friend."
        });
    }
});

module.exports = router;