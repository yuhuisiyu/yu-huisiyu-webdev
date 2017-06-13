var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');

var pageModel = mongoose.model('pageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.updateWidgetList = updateWidgetList;
pageModel.deleteWidgetList = deleteWidgetList;
module.exports = pageModel;

function createPage(page) {
    return pageModel
        .create(page)
        .then(function () {
            websiteModel.updatePageList(page._website, page._id);
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});

}

function findPageById(pageId) {
    return pageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel.update(
        {_id: pageId},
        {$set: page});
}

function deletePage(pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function () {
            var page = pageModel.findPageById(pageId);
            websiteModel.deletePageList(page._website, pageId);
        })
}

function updateWidgetList(pageId, widgetId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            page._widgets.push(widgetId);
            return page.save();
        });
}

function deleteWidgetList(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page._widgets.indexOf(widgetId);
            page._widgets.splice(index, 1);
            return page.save();
        })
}