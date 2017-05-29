(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['uid'];

        model.user = userService.findUserById(userId);
    }
})();