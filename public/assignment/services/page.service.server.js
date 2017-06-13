module.exports = function(app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    var pageModel = require("../model/page/page.model.server");


    function createPage(req,res) {
        var page = req.body;
        pageModel.createPage(page).then(
            function (response) {
                res.send(response);
            }
        );
    }

    function updatePage(req, res) {
        var pageId = req.params["pageId"];
        var page = req.body;
        pageModel.updatePage(pageId, page).then(
            function(response) {
                res.json(response);
            }
        );
    }

    function deletePage(req,res) {
        var pageId = req.params["pageId"];
        pageModel.deletePage(pageId).then(
            function(response) {
                res.json(response);
            }
        );
    }

    function findPageById(req,res) {
        var pageId = req.params["pageId"];
        pageModel.findPageById(pageId).then(
            function(page) {
                res.json(page);
            }
        );
    }

    function findPagesByWebsiteId(req,res) {
        var websiteId = req.params["websiteId"];
        pageModel.findAllPagesForWebsite(websiteId).then(
            function (websites) {
                res.json(websites);
            }
        )
    }
};