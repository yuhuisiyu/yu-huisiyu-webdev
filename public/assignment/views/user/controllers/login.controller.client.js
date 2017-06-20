(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login (user) {
            if(user.username === "" || user.username === undefined) {
                model.message = "Please enter username.";
                return;
            }
            if(user.password === undefined || user.username === "") {
                model.message = "Please enter password.";
                return;
            }
            // var user = {
            //     username:username,
            //     password:password
            // };
            userService
                //.findUserByCredentials(username, password)
                //change for assignment6
                .login(user)
                .then(
                    function (response) {
                        user = response.data;
                        $location.url('/profile');
                    },
                    function (err) {
                        model.message = "Username:" + user.username + " not found, please try again";
                    }
                    // model.message = "Username:" + username + " not found, please try again"
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