(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   pageService,
                                   $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        // event handlers
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService.findPagesByWebsiteId(model.websiteId).then(
                function(data) {
                    model.pages = data;
                }
            );
           pageService.findPageById(model.pageId).then(
                function(data) {
                    model.page = data;
                }
            );
        }
        init();

        // implementation
        function updatePage(page) {
            pageService.updatePage(model.pageId,page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();