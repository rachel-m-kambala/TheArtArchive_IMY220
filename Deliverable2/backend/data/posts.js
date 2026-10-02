//Rachel Kambala u23559129
const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

function getPostsCollection(){
    return getDB().collection("posts");
}

//Get All Posts/Global Feed
async function getAllPosts(){
    const db = getDB();
    return await db.collection("posts")
        .find({})
        .sort({ createdAt: -1})
        .toArray();
}

//One Post
async function getPostById(id){
    const db = getDB();

    return await db.collection("posts").findOne({
        _id: new ObjectId(id)
    });
}

//Create Post
async function createPost(postData) {
    const newPost = {
        userId: postData.userId,

        artist: postData.artist,
        artistName: postData.artistName,

        title: postData.title,
        description: postData.description,
        image: postData.image,

        hashtags:
            postData.hashtags || [],

        reports: [],

        createdAt: new Date()
    };

    const result =
        await getPostsCollection()
            .insertOne(newPost);

    return {
        ...newPost,
        _id: result.insertedId
    };
}

//Update Post
async function updatePost(id, updateData) {
    return await getPostsCollection()
        .findOneAndUpdate(
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
}

//Delete Post
async function deletePost(id) {
   return await getPostsCollection()
        .deleteOne({
            _id: new ObjectId(id)
        });
}

//LOCAL FEED
async function getLocalPosts(userId) {

    const db = getDB();

    const user =
        await db
            .collection("users")
            .findOne({
                _id: new ObjectId(userId)
            });


    if (!user) {
        return null;
    }


    const allowedUserIds = [
        String(user._id),

        ...(user.friends || []).map(
            (friendId) =>
                String(friendId)
        )
    ];


    return await getPostsCollection()
        .find({
            userId: {
                $in: allowedUserIds
            }
        })
        .sort({
            createdAt: -1
        })
        .toArray();
}

//Report Post
async function reportPost(
    postId,
    userId,
    reason
) {

    const post =
        await getPostsCollection()
            .findOne({
                _id: new ObjectId(postId)
            });


    if (!post) {
        return null;
    }


    const alreadyReported =
        (post.reports || []).some(
            (report) =>
                String(report.userId) ===
                String(userId)
        );


    if (alreadyReported) {
        return "already-reported";
    }


    const report = {
        userId,
        reason,
        createdAt: new Date()
    };


    return await getPostsCollection()
        .findOneAndUpdate(
            {
                _id: new ObjectId(postId)
            },

            {
                $push: {
                    reports: report
                }
            },

            {
                returnDocument: "after"
            }
        );
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getLocalPosts,
    reportPost
};