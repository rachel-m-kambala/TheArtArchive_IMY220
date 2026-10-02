//Rachel Kambala u23559129
console.log("### DELIVERABLE 2 DATABASE.JS LOADED ###");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("MONGO_URI is missing from .env");
}

const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();

        db = client.db("TheArtArticle");

        console.log("Connected to MongoDB Atlas");
        console.log("Using database:", db.databaseName);

        const collections = await db
            .listCollections()
            .toArray();

        console.log(
            "Collections found:",
            collections.map(
                (collection) => collection.name
            )
        );

        const userCount = await db
            .collection("users")
            .countDocuments();

        const postCount = await db
            .collection("posts")
            .countDocuments();

        const albumCount = await db
            .collection("albums")
            .countDocuments();

        const commentCount = await db
            .collection("comments")
            .countDocuments();

        console.log("Users found:", userCount);
        console.log("Posts found:", postCount);
        console.log("Albums found:", albumCount);
        console.log("Comments found:", commentCount);

        return db;
    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error
        );

        throw error;
    }
}

function getDB() {
    if (!db) {
        throw new Error(
            "Database has not been connected."
        );
    }

    return db;
}

module.exports = {
    connectDB,
    getDB
};