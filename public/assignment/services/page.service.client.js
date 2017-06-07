(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService($http) {

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId,page) {
            var url = "/api/website/" + websiteId + "/page";
            page._id = (new Date()).getTime() + "";
            page.WebsiteId = websiteId;
            $http.post(url, page);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            $http.put(url, page);
        }

        function deletePage(pageId) {
                var url = "/api/page/" + pageId;
                $http.delete(url);
        }

        function findPageById(pageId) {
                var url = "/api/page/" + pageId;
                return $http.get(url).then(
                    function(response) {
                        return response.data;
                    }
                );
        }

        function findPagesByWebsiteId(websiteId) {
                var url = "/api/website/" + websiteId + "/page";
                return $http.get(url).then(
                    function(response) {
                        return response.data;
                    }
                );
        }
    }
})();