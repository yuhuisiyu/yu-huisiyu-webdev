var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.updateWebsiteList = updateWebsiteList;
userModel.deleteWebsiteList = deleteWebsiteList;



function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({
        username: username
    });
}

function findUserByCredentials(username, password) {
    return userModel.findOne({
        username: username,
        password: password
    });
}

function updateUser(userId, user) {
    return userModel.update({
        _id: userId,
        $set : {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({
        _id: userId
    });
}

function updateWebsiteList(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user._websites.push(websiteId);
            return user.save();
        });
}

function deleteWebsiteList(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user._websites.indexOf(websiteId);
            user._websites.splice(index, 1);
            return user.save();
        })
}
