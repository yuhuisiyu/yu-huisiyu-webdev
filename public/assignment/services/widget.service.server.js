module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    // app.put("/page/:pageId/widget/", sortWidget);

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

    var api = {
        createWidget: createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;

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
};