//Rachel Kambala u23559129
const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");


function getCommentsCollection() {
    return getDB().collection("comments");
}

//GET COMMENTS FOR POST
async function getCommentsByPostId(postId) {

    return await getCommentsCollection()
        .find({
            postId
        })
        .sort({
            createdAt: -1
        })
        .toArray();
}

//GET ONE COMMENT
async function getCommentById(id) {

    return await getCommentsCollection()
        .findOne({
            _id: new ObjectId(id)
        });
}

//CREATE COMMENT
async function createComment(commentData) {

    const newComment = {
        postId:
            commentData.postId,

        userId:
            commentData.userId,

        username:
            commentData.username,

        text:
            commentData.text,

        createdAt:
            new Date()
    };


    const result =
        await getCommentsCollection()
            .insertOne(newComment);


    return {
        ...newComment,
        _id: result.insertedId
    };
}

//UPDATE COMMENT
async function updateComment(
    id,
    text
) {

    return await getCommentsCollection()
        .findOneAndUpdate(
            {
                _id: new ObjectId(id)
            },

            {
                $set: {
                    text
                }
            },

            {
                returnDocument: "after"
            }
        );
}

//DELETE COMMENT
async function deleteComment(id) {

    return await getCommentsCollection()
        .deleteOne({
            _id: new ObjectId(id)
        });
}


module.exports = {
    getCommentsByPostId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};