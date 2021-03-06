(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        // event handlers
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findWebsitesByUser(model.userId).then(
                function(data) {
                    model.websites = data;
                }
            );

            websiteService.findWebsiteById(model.websiteId).then(
                function(data) {
                    model.website = data;
                }
            );
        }
        init();

        // implementation
        function updateWebsite(website) {
            if(website === undefined || website.name === "" || website.name === undefined){
                model.message = "Please write website name.";
                return;
            }
            websiteService.updateWebsite(model.websiteId,website);
            console.log("website");
            $location.url('/user/'+model.userId+'/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();
