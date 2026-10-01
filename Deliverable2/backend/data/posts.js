//Rachel Kambala u23559129
const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

function getPostsCollection(){
    return getDB().collection("posts");
}

async function getAllPosts(){
    const db = getDB();
    return await db.collection("posts")
        .find({})
        .sort({ createdAT: -1})
        .toArray();
}

async function getPostById(id){
    const db = getDB();

    return await db.collection("posts").findOne({
        _id: new ObjectId(id)
    });
}

async function createPost(postData) {
    const db = getDB();

    const newPost = {
        ...postData,
        hashtags: postData.hashtags || [],
        comments: [],
        appreciates: [],
        reported: false,
        createdAt: new Date()
    };

    const result = await db
        .collection("posts")
        .insertOne(newPost);

    return {
        ...newPost,
        _id: result.insertedId
    };
}

async function updatePost(id, updateData) {
    const db = getDB();

    const result = await db.collection("posts").findOneAndUpdate(
        {
            _id: new ObjectId(id)
        },
        {
            $set: updateData
        },
        {
            returnDocument: "after"
        }
    );

    return result;
}

async function deletePost(id) {
    const db = getDB();

    return await db.collection("posts").deleteOne({
        _id: new ObjectId(id)
    });
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};