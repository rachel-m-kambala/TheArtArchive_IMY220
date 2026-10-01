//Rachel Kambala u23559129
const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

//ALL ALBUMS
async function getAllAlbums() {
    const db = getDB();

    return await db
        .collection("albums")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
}

//ONE ALBUM
async function getAlbumById(id) {
    const db = getDB();

    return await db.collection("albums").findOne({
        _id: new ObjectId(id)
    });
}

//CREATE ALBUM
async function createAlbum(albumData) {
    const db = getDB();

    const newAlbum = {
        userId: albumData.userId,
        name: albumData.name,
        description: albumData.description,
        hashtags: albumData.hashtags || [],
        posts: [],
        createdAt: new Date()
    };

    const result = await db
        .collection("albums")
        .insertOne(newAlbum);

    return {
        ...newAlbum,
        _id: result.insertedId
    };
}

//UPDATE ALBUM
async function updateAlbum(id, updateData) {
    const db = getDB();

    return await db
        .collection("albums")
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

//DELETE ALBUM
async function deleteAlbum(id) {
    const db = getDB();

    return await db.collection("albums").deleteOne({
        _id: new ObjectId(id)
    });
}

//ADD POST TO ALBUM
async function addPostToAlbum(albumId, postId) {
    const db = getDB();

    return await db
        .collection("albums")
        .findOneAndUpdate(
            {
                _id: new ObjectId(albumId)
            },
            {
                $addToSet: {
                    posts: postId
                }
            },
            {
                returnDocument: "after"
            }
        );
}

async function addPostToAlbum(albumId, postId) {
    return await getAlbumsCollection().findOneAndUpdate(
        {
            _id: new ObjectId(albumId)
        },
        {
            $addToSet: {
                posts: new ObjectId(postId)
            }
        },
        {
            returnDocument: "after"
        }
    );
}

//REMOVE POST FROM ALBUM
async function removePostFromAlbum(albumId, postId) {
    const db = getDB();

    return await db
        .collection("albums")
        .findOneAndUpdate(
            {
                _id: new ObjectId(albumId)
            },
            {
                $pull: {
                    posts: postId
                }
            },
            {
                returnDocument: "after"
            }
        );
}

module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    addPostToAlbum,
    removePostFromAlbum
};