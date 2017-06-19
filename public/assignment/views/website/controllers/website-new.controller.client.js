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
            websiteService.findWebsitesByUser(model.userId).then(
                function(data) {
                    model.websites = data;
                }
            );
        }
        init();

        // implementation
        function createWebsite(website) {
            if(website === undefined || website.name === undefined){
                model.message = "Please write website name.";
                return;
            }
            websiteService.createWebsite(model.userId,website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();