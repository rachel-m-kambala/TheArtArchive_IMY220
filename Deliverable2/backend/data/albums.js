const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

function getAlbumsCollection(){
    return getDB().collection("");
}

async function getAllAlbums(){
    return await getAlbumsCollection()
        .find()
        .toArray();
}

async function getAlbumById(id){
    return await getAlbumsCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function createAlbum(albumData){
    const newAlbum = {
        ...albumData,
        posts: [],
        createdAt: new Date()
    };

    const result = await getAlbumsCollection().insertOne(newAlbum);

    return{
        _id: result.insertId,
        ...newAlbum
    };
}

async function updateAlbum(id, albumData){
    const result = await getAlbumsCollection().findOneAndUpdate(
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

    return result;
}

async function deleteAlbum(id){
    return await getAlbumsCollection().deleteOne({
        _id: new ObjectId(id)
    });
}

module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
};