(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, $routeParams) {

        var model = this;
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.user = currentUser;
        model.logout = logout;

        function init() {
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

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    }
                );
        }

    }
})();