(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

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
                    if(found !== "") {
                        model.error = "Username is not available";
                    } else {
                        var user = {
                            _id: (new Date()).getTime() + "",
                            username:username,
                            password:password,
                            firstName:"",
                            lastName:""
                        }
                        userService.createUser(user);
                        $location.url('/user/' + user._id);
                    }
                }
            )
        }
    }
})();