(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  pageService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        // event handlers
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();

        // implementation
        function createPage(page) {
            pageService.createPage(model.websiteId,page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();