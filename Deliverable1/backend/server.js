const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "The Art Archive API is running."
    });
});

app.post("/api/auth/signup", (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    console.log("Sign-up request received:");

    console.log({
        username,
        email,
        password
    });

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message:
                "Username, email and password are required."
        });
    }


    res.status(201).json({
        success: true,

        message:
            "Account created successfully.",

        user: {
            id: 12345,
            username: username,
            email: email
        }
    });
});

app.post("/api/auth/signin", (req, res) => {

    const {
        email,
        password
    } = req.body;

    console.log("Sign-in request received:");

    console.log({
        email,
        password
    });

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message:
                "Email and password are required."
        });
    }

    res.status(200).json({
        success: true,

        message:
            "Login successful.",

        user: {
            id: 12345,
            username: "archiveArtist",
            email: email
        }
    });
});

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `The Art Archive API is running on port ${PORT}`
    );

});