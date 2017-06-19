(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login (username, password) {
            if(username === "") {
                model.message = "Please enter username.";
                return;
            }
            if(password === undefined) {
                model.message = "Please enter password.";
                return;
            }
            var user = {
                username:username,
                password:password
            };
            userService
                //.findUserByCredentials(username, password)
                //change for assignment6
                .login(user)
                .then(
                    function (response) {
                        $location.url('/profile');
                    },
                    model.message = "Username:" + username + " not found, please try again"
                )

            // function login(found){
            //     if(found !== null) {
            //         $location.url('/profile');
            //     } else {
            //         model.message = "Username:" + username + " not found, please try again";
            //     }
            // }
        }
    }
})();