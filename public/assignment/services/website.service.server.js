module.exports = function(app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
        { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
        { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
        { _id: "890", name: "Go",          developerId: "123", description: "Lorem" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
        { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
        { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
    ];

    var api = {
        createWebsite: createWebsite,
        findWebsitesByUser: findWebsitesByUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsite(req,res) {
        var website = req.body;
        websites.push(website);
        res.json(websites);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        var w = websites.find(function (w) {
            return w._id === websiteId;
        });
        var website = req.body;
        w.name = website.name;
        w.description = website.description;
        res.json(websites);
    }

    function deleteWebsite(req,res) {
        var websiteId = req.params["websiteId"];
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });
        var index = websites.indexOf(website);
        websites.splice(index, 1);
        res.json(websites);
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params["websiteId"];
        var w = websites.find(function (website) {
            return website._id === websiteId;
        });
        if(typeof w === 'undefined'){
            res.send(null);
            return;
        }
        return res.json(w);
    }

    function findWebsitesByUser(req,res) {
        var userId = req.params["userId"];
        var resultSet = [];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                resultSet.push(websites[w]);
            }
        }
        res.send(resultSet);
    }
};