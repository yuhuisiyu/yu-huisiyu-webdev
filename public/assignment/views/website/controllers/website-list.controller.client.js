(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['uid'];

        function init() {
            websiteService.findWebsitesByUser(model.userId).then(
                function(data) {
                    model.websites = data;
                }
            );
        }
        init();
    }
})();