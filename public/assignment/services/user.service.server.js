module.exports = function(app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        function createUser(req, res) {
            var user = req.body;
            users.push(user);
            res.json(users);
        }

        function findUserByUsername(req,res) {
            var username = req.query["username"];
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined'){
                res.send(null);
                return;
            }
            return res.json(user);
        }

        function updateUser(req,res) {
            var userId = req.params["userId"];
            var u = users.find(function (user) {
                return user._id === userId;
            });
            var user = req.body;
            u.username = user.username;
            u.password = user.password;
            u.firstName = user.firstName;
            u.lastName = user.lastName;
            res.json(users);
        }

        function deleteUser(req,res) {
            var userId = req.params.userId;
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
            res.json(users);
        }

        function findUserByCredentials(req,res) {
            var username = req.query["username"];
            var password = req.query["password"];
            var user = users.find(function (user) {
                return user.username === username && user.password === password;
            });
            if(typeof user === 'undefined'){
                res.send(null);
                return;
            }
            return res.json(user);
        }

        function findUserById(req,res) {
            var userId = req.params.userId;
            var u = users.find(function (user) {
                return user._id === userId;
            });
            if(typeof u === 'undefined'){
                res.send(null);
                return;
            }
            return res.json(u);
        }

};