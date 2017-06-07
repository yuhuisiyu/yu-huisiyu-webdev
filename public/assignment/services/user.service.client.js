(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            var url = "/api/user";
            return $http
                .post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            $http.delete(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }
    }
})();