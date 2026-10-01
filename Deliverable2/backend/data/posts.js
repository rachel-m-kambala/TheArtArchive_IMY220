//{} ""
const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

function getPostsCollection(){
    return getDB().collection("posts");
}

async function getAllPosts(){
    return await getPostsCollection()
        .find()
        .sort({ createdAT: -1})
        .toArray();
}

async function getPostById(id){
    return await getPostsCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function createPost(post){
    const newPost = {
        ...post,
        createdAt: new Date()
    };

    const result = await getPostsCollection().insertOne(newPost);

    return{
        _id: result.insertId,
        ...newPost
    };
}

async function updatePost(id, changes){
    const result = await getPostsCollection().findOneAndUpdate(
        {
            _id: new ObjectId(id)
        },
        {
            $set: changes
        },
        {
            returnDocument: "after"
        }
    );

    return result;
}

async function deletePost(id){
    return await getPostsCollection().deleteOne({
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