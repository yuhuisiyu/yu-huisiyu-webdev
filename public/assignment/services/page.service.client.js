(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
                { _id: "321", name: "Post 1", WebsiteId: 456, description: "Lorem" },
                { _id: "432", name: "Post 2", WebsiteId: 456, description: "Lorem" },
                { _id: "543", name: "Post 3", WebsiteId: 456, description: "Lorem" }
            ]
        ;

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId,page) {
            page._id = (new Date()).getTime() + "";
            page.WebsiteId = websiteId;
            pages.push(page);
        }

        function updatePage(pageId, page) {
            var p = pages.find(function (p) {
                return p._id === pageId;
            });
            p.name = page.name;
            p.description = page.description;
        }

            function deletePage(pageId) {
                var page = pages.find(function (page) {
                    return page._id === pageId;
                });
                var index = pages.indexOf(page);
                pages.splice(index, 1);
            }

            function findPageById(pageId) {
                return pages.find(function (page) {
                    return page._id === pageId;
                });
            }

            function findPagesByWebsiteId(websiteId) {
                var resultSet = [];
                for (var p in pages) {
                    if (pages[p].WebsiteId === websiteId) {
                        resultSet.push(pages[p]);
                    }
                }
                return resultSet;
            }
    }
})();