//Rachel Kambala u23559129
const express = require("express");
const { getDB } = require("../database.js");
const router = express.Router();

function levenshtein(a, b) {
    const previous = Array.from(
        { length: b.length + 1 },
        (_, index) => index
    );
    for (let i = 1; i <= a.length; i++) {
        const current = [i];
        for (let j = 1; j <= b.length; j++) {
            const substitutionCost =
                a[i - 1] === b[j - 1] ? 0 : 1;

            current[j] = Math.min(
                current[j - 1] + 1,
                previous[j] + 1,
                previous[j - 1] + substitutionCost
            );
        }
        previous.splice(0, previous.length, ...current);
    }
    return previous[b.length];
}

function matchesQuery(value, query) {
    if (!value) return false;

    const text = String(value).toLowerCase();
    const words = text.split(/[^a-z0-9@._-]+/).filter(Boolean);

    if (text.includes(query)) return true;

    const queryWords = query.split(/\s+/).filter(Boolean);

    return queryWords.every(queryWord => {
        if (text.includes(queryWord)) return true;

        return words.some(word => {
            if (word.includes(queryWord)) return true;

            // Avoid fuzzy matches for very short terms.
            if (queryWord.length < 4 || word.length < 4) {
                return false;
            }

            const distance = levenshtein(queryWord, word);
            const allowedDistance =
                queryWord.length >= 8 ? 2 : 1;

            return distance <= allowedDistance;
        });
    });
}

function matchesFields(fields, query) {
    return fields.some(field => {
        if (Array.isArray(field)) {
            return field.some(value => matchesQuery(value, query));
        }

        return matchesQuery(field, query);
    });
}

function publicUser(user) {
    return {
        _id: user._id,
        username: user.username,
        name: user.name,
        profileImage: user.profileImage
    };
}

router.get("/", async (req, res) => {
    try {
        const rawQuery = String(req.query.q || "").trim();

        if (!rawQuery) {
            return res.json({
                users: [],
                posts: [],
                albums: []
            });
        }

        if (rawQuery.length > 100) {
            return res.status(400).json({
                message: "Search terms must be 100 characters or fewer."
            });
        }

        const query = rawQuery
            .replace(/^#+/, "")
            .toLowerCase()
            .trim();

        if (!query) {
            return res.json({
                users: [],
                posts: [],
                albums: []
            });
        }

        const db = getDB();

        const [users, posts, albums] = await Promise.all([
            db.collection("users").find({}).toArray(),
            db.collection("posts").find({}).toArray(),
            db.collection("albums").find({}).toArray()
        ]);

        const matchingUsers = users
            .filter(user => matchesFields([
                user.name,
                user.username,
                user.email
            ], query))
            .slice(0, 10)
            .map(publicUser);

        const matchingPosts = posts
            .filter(post => (post.reports || []).length <= 2)
            .filter(post => matchesFields([
                post.title,
                post.description,
                post.artistName,
                post.hashtags
            ], query))
            .sort((a, b) =>
                new Date(b.createdAt || 0) -
                new Date(a.createdAt || 0)
            )
            .slice(0, 10);

        const matchingAlbums = albums
            .filter(album => matchesFields([
                album.name,
                album.description,
                album.hashtags
            ], query))
            .sort((a, b) =>
                new Date(b.createdAt || 0) -
                new Date(a.createdAt || 0)
            )
            .slice(0, 10);

        res.json({
            users: matchingUsers,
            posts: matchingPosts,
            albums: matchingAlbums
        });
    } catch (error) {
        console.error("Search error:", error);

        res.status(500).json({
            message: "Unable to search The Art Archive."
        });
    }
});
module.exports = router;