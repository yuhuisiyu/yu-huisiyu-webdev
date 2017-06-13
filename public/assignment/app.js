module.exports = function(app) {
    var mongoose = require("mongoose");
    mongoose.Promise = require('q').Promise;


    // mongoose.connect("mongodb://127.0.0.1/yuhuisiyu-webdev");

    // Used temporarily for accessing MLab MongoDB.
    var username = "admin";
    var password = "admin";

    var connectionString = 'mongodb://'+ username + ':' + password + '@ds143221.mlab.com:43221/heroku_dgt90mmz';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }
    mongoose.connect(connectionString);


    require("./services/user.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};

