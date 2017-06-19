(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService,$rootScope) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            if(password !== password2) {
                model.error = "Passwords must match.";
                return;
            }

            userService.findUserByUsername(username).then (
                function(data) {
                    var found = data;
                    if(found !== null) {
                        model.error = "Username is not available";
                    } else {
                        var user = {
                            username:username,
                            password:password
                        };
                        userService.register(user).then(
                            function(response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url('/profile');
                            }
                        );
                    }
                }
            )
        }
    }
})();