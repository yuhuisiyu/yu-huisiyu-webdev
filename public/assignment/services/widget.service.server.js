module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget/", sortWidget);


    var widgets = [
        { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
        { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
        { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
            url: "http://lorempixel.com/400/200/"},
        //{ _id: "456", widgetType: "HTML", pageId: "321", "text": "<p>Lorem ipsum</p>"},
        { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
        { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E" }
       // { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
    ];

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../../public/assignment/uploads'});
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widget = widgets.find(function (wi) {
            return wi._id === widgetId;
        });

        widget.url = '/assignment/uploads/' + filename;

        var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";

        res.redirect(callbackUrl);

    }


    function createWidget(req,res) {
        var widget = req.body;
        widgets.push(widget);
        res.json(widgets);
    }


    function updateWidget(req,res) {
        var widgetId = req.params["widgetId"];
        var widget = req.body;
        var w = widgets.find(function (wi) {
            return wi._id === widgetId;
        });
        if(w.widgetType === "HEADING") {
            w.size = widget.size;
            w.text = widget.text;
        }
        if(w.widgetType === "IMAGE") {
            w.width = widget.width;
            w.url = widget.url;
        }
        if(w.widgetType === "YOUTUBE") {
            w.width = widget.width;
            w.url = widget.url;
        }
        res.json(widgets);
    }

    function deleteWidget(req,res) {
        var widgetId = req.params["widgetId"];
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
        res.json(widgets);
    }

    function findWidgetById(req,res) {
        var widgetId = req.params["widgetId"];
        var w =  widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        if(typeof w === 'undefined'){
            res.send(null);
            return;
        }
        return res.json(w);
    }

    function findWidgetsByPageId(req,res) {
        var pageId = req.params["pageId"];
        var resultSet = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                resultSet.push(widgets[w]);
            }
        }
        res.send(resultSet);
    }

    function sortWidget(req, res) {
        var middle = [];
        var initial = req.query["initial"];
        var final = req.query["final"];
        var pageId = req.params["pageId"];

        for (var w = widgets.length - 1; w >= 0; w--) {
            if (widgets[w].pageId === pageId) {
                middle.unshift(widgets[w]);
                widgets.splice(w, 1);
            }
        }
        var widget = middle[initial];
        middle.splice(initial, 1);
        middle.splice(final, 0, widget);
        widgets = widgets.concat(middle);
        res.sendStatus(200);
    }
};