var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server.js');

var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel = require('../user/user.model.server');
module.exports = websiteModel;

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updatePageList = updatePageList;
websiteModel.deletePageList = deletePageList;

function createWebsiteForUser(website) {
    return websiteModel
        .create(website)
        .then(function () {
            userModel.updateWebsiteList(website._user, website._id);
            console.log("model");
        })
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});

}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update(
        {_id: websiteId},
        {$set: website});
}

function deleteWebsite(websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function () {
            var website = websiteModel.findWebsiteById(websiteId);
            userModel.deleteWebsiteList(website._user, websiteId);
        })
}

function updatePageList(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website._pages.push(pageId);
            return website.save();
        });
}

function deletePageList(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var index = website._pages.indexOf(pageId);
            website._pages.splice(index, 1);
            return website.save();
        })
}

