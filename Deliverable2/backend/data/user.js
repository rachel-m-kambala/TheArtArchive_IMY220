//{} ""
const { ObjectId } = require("mongodb");
const { getDB } = require("../database.js");

function getUsersCollection(){
    return getDB().collection("users");
}

async function getAllUsers(){
    return await getUsersCollection()
        .find({})
        .toArray();
}

async function getUserById(id){
    const database = getDB();

    return await database
        .collection("users")
        .findOne({
            _id: new ObjectId(id)
        });
}

async function getUserByEmail(email) {
    const database = getDB();

    return await database
        .collection("users")
        .findOne({
            email: email.toLowerCase()
        });
}

async function getUserByUsername(username) {
    const database = getDB();

    return await database
        .collection("users")
        .findOne({
            username: username
        });
}

async function createUser(user) {
    const database = getDB();

    const result = await database
        .collection("users")
        .insertOne(user);

    return {
        _id: result.insertedId,
        ...user
    };
}

async function updateUser(id, changes) {
    const database = getDB();

    const result = await database
        .collection("users")
        .findOneAndUpdate(
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

async function deleteUser(id) {
    const database = getDB();

    return await database
        .collection("users")
        .deleteOne({
            _id: new ObjectId(id)
        });
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};