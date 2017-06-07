(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(model.userId).then(
                function (data) {
                    model.user = data;
                }
            );
        }
        init();

        function updateUser() {
            userService.updateUser(model.userId, model.user);
            model.message = "Updated."
            $location.url('/user/' + model.userId);
        }

        function deleteUser() {
            userService.deleteUser(model.userId);
            $location.url("/");
        }

    }
})();