(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['uid'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        // implementation
        function createWebsite(website) {
            websiteService.createWebsite(model.userId,website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();