const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

function getCommentsCollection(){
    return getDB().collection("comments");
}

async function getAllComments(){
    return await getCommentsCollection()
        .find()
        .sort({ createdAt: -1 })
        .toArray();
}

async function getCommentById(id){
    return await getCommentsCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function createComment(commentData){
    const newComment = {
        ...commentData,
        createdAt: new Date()
    };

    const result = await getCommentsCollection().insertOne(newComment);

    return{
        _id: result.insertId,
        ...newComment
    };
}

async function updateComment(id, commentData){
    const result = await getCommentsCollection().findOneAndUpdate(
        {
            _id: new ObjectId(id)
        },
        {
            $set: commentData
        },
        {
            returnDocument: "after"
        }
    );

    return result;
}

async function deleteComment(id){
    return await getCommentsCollection().deleteOne({
        _id: new ObjectId(id)
    });
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};