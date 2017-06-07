module.exports = function(app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
            { _id: "321", name: "Post 1", WebsiteId: "456", description: "Lorem" },
            { _id: "432", name: "Post 2", WebsiteId: "456", description: "Lorem" },
            { _id: "543", name: "Post 3", WebsiteId: "456", description: "Lorem" }
        ];

    var api = {
        createPage: createPage,
        findPagesByWebsiteId: findPagesByWebsiteId,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(req,res) {
        var page = req.body;
        pages.push(page);
        res.json(pages);
    }

    function updatePage(req, res) {
        var pageId = req.params["pageId"];
        var p = pages.find(function (p) {
            return p._id === pageId;
        });
        var page = req.body;
        p.name = page.name;
        p.description = page.description;
        res.json(pages);
    }

    function deletePage(req,res) {
        var pageId = req.params["pageId"];
        var page = pages.find(function (page) {
            return page._id === pageId;
        });
        var index = pages.indexOf(page);
        pages.splice(index, 1);
        res.json(pages);
    }

    function findPageById(req,res) {
        var pageId = req.params["pageId"];
        var p = pages.find(function (page) {
            return page._id === pageId;
        });
        if(typeof p === 'undefined'){
            res.send(null);
            return;
        }
        return res.json(p);
    }

    function findPagesByWebsiteId(req,res) {
        var websiteId = req.params["websiteId"];
        var resultSet = [];
        for (var p in pages) {
            if (pages[p].WebsiteId === websiteId) {
                resultSet.push(pages[p]);
            }
        }
        res.send(resultSet);
    }
};