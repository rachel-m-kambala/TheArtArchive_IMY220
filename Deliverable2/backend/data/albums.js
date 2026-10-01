const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

function getAlbumsCollection() {
    return getDB().collection("albums");
}

async function getAllAlbums() {
    return await getAlbumsCollection()
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
}

async function getAlbumById(id) {
    return await getAlbumsCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function getAlbumsByUserId(userId) {
    return await getAlbumsCollection()
        .find({
            ownerId: new ObjectId(userId)
        })
        .sort({ createdAt: -1 })
        .toArray();
}

async function createAlbum(albumData) {
    const newAlbum = {
        ownerId: new ObjectId(albumData.ownerId),
        name: albumData.name,
        description: albumData.description || "",
        hashtags: albumData.hashtags || [],
        posts: [],
        createdAt: new Date()
    };

    const result = await getAlbumsCollection().insertOne(
        newAlbum
    );

    return {
        _id: result.insertedId,
        ...newAlbum
    };
}

async function updateAlbum(id, albumData) {
    return await getAlbumsCollection().findOneAndUpdate(
        {
            _id: new ObjectId(id)
        },
        {
            $set: albumData
        },
        {
            returnDocument: "after"
        }
    );
}

async function deleteAlbum(id) {
    return await getAlbumsCollection().deleteOne({
        _id: new ObjectId(id)
    });
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

async function removePostFromAlbum(albumId, postId) {
    return await getAlbumsCollection().findOneAndUpdate(
        {
            _id: new ObjectId(albumId)
        },
        {
            $pull: {
                posts: new ObjectId(postId)
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
    getAlbumsByUserId,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    addPostToAlbum,
    removePostFromAlbum
};