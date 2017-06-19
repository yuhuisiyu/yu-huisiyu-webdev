module.exports = function(app) {
    var userModel = require("../model/user/user.model.server");
    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    //assignment6
    app.post  ('/api/login', passport.authenticate("local"), login);
    app.get ('/api/checkLoggedIn', checkLoggedIn);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
        }));

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    function facebookStrategy(token, refreshToken, profile, done) {
        return userModel.findUserByFacebookId(profile.id).then(
            function (user) {
                if (!user) {
                    var newUser = {
                        username: profile.displayName,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newUser).then(
                        function (response) {
                            return done(null, newUser);
                        }
                    )
                }
                return done(null, user);
            }
        )
    }


    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
    .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }


    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function checkLoggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }



///////////////////////////////

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