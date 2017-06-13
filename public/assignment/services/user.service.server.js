module.exports = function(app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var userModel = require("../model/user/user.model.server");

        function createUser(req, res) {
            var user = req.body;
            userModel.createUser(user).then(
                function(user) {
                    res.json(user);
                }
            )
        }

        function findUserByUsername(req,res) {
            var username = req.query["username"];
            userModel.findUserByUsername(username).then(
                function(user) {
                    res.json(user);
                }
            )
        }

        function updateUser(req,res) {
            var userId = req.params["userId"];
            var user = req.body;
            userModel.updateUser(userId, user).then(
                function(response) {
                    res.send(response);
                }
            )
        }

        function deleteUser(req,res) {
            var userId = req.params.userId;
            userModel.deleteUser(userId).then(
                function(response) {
                    res.send(response);
                }
            )
        }

        function findUserByCredentials(req,res) {
            var username = req.query["username"];
            var password = req.query["password"];
            userModel.findUserByCredentials(username, password).then(
                function(user) {
                    res.json(user);
                }
            );
        }

        function findUserById(req,res) {
            var userId = req.params.userId;
            userModel.findUserById(userId).then(
                function(user) {
                    res.json(user);
                }
            );
        }
};