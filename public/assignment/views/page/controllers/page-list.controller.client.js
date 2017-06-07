(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['uid']
        model.websiteId = $routeParams['wid'];

        function init() {
             pageService.findPagesByWebsiteId(model.websiteId).then(
                function(data) {
                    model.pages = data;
                }
            );
        }
        init();
    }
})();
