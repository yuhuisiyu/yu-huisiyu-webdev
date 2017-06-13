module.exports = function(app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    var websiteModel = require('../model/website/website.model.server');

    function createWebsite(req,res) {
        var website = req.body;
        website._user = req.params['userId'];
        websiteModel.createWebsiteForUser(website).then(
            function(response) {
                res.send(response);
            }
        );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteWebsite(req,res) {
        var websiteId = req.params["websiteId"];
        websiteModel.deleteWebsite(websiteId).then(
            function(response) {
                res.send(response);
            }
        );
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params["websiteId"];
        websiteModel.findWebsiteById(websiteId).then(
            function(website) {
                res.json(website);
            }
        );
    }

    function findWebsitesByUser(req,res) {
        var userId = req.params["userId"];
        websiteModel.findAllWebsitesForUser(userId).then(
            function(websites) {
                res.json(websites);
            }
        );
    }
};