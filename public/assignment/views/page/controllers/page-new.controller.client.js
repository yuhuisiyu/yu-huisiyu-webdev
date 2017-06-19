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
            pageService.findPagesByWebsiteId(model.websiteId).then(
                function(data) {
                    model.pages = data;
                }
            );
        }
        init();

        // implementation
        function createPage(page) {
            if(page === undefined || page.name === undefined){
                model.message = "Please write page name.";
                return;
            }
            pageService.createPage(model.websiteId,page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();