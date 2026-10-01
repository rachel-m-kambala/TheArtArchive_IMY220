//{} ""
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let database;

async function connectDB(){
    try{ 
        await client.connect();
        database = client.db("TheArtArchive");
        console.log("Connected to MongoDB Atlas");
    } catch (error){
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

function getDB(){
    if(!database){
        throw new Error("Database has not been connected.");
    }
    return database;
}

module.exports = {
    connectDB,
    getDB
};