//{} ""
const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

function getUsersCollection(){
    return getDB().collection("users");
}

async function getAllUsers(){
    return await getUsersCollection()
        .find()
        .toArray();
}

async function getUserById(id){
    return await getUsersCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function createUser(userData){
    const newUser = {
        ...userData,
        createdAt: new Date()
    };

    const result = await getUsersCollection().insertOne(newUser);

    return{
        _id: result.insertId,
        ...newUser
    };
}

async function updateUser(id, userData){
    const result = await getUsersCollection().findOneAndUpdate(
        {
            _id: new ObjectId(id)
        },
        {
            $set: userData
        },
        {
            returnDocument: "after"
        }
    );
}

async function deleteUser(id){
    return await getUsersCollection().deleteOne({
        _id: new ObjectId(id)
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};