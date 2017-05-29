(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService() {

        var widgets = [
                { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
                { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
                { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
                    url: "http://lorempixel.com/400/200/"},
                { _id: "456", widgetType: "HTML", pageId: "321", "text": "<p>Lorem ipsum</p>"},
                { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
                { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
                    url: "https://youtu.be/AM2Ivdi9c4E" },
                { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
            ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(type,pageid) {
            if (type === "HEADING") {
                var newwidget = {
                    _id: (new Date()).getTime() + "",
                    widgetType: type,
                    pageId: pageid,
                    size: "",
                    text: "",
                }
            }
                if (type === "IMAGE") {
                    var newwidget = {
                        _id: (new Date()).getTime() + "",
                        widgetType: type,
                        pageId: pageid,
                        width: "",
                        url: ""
                    };
                }
                if (type === "YOUTUBE") {
                    var newwidget = {
                        _id: (new Date()).getTime() + "",
                        widgetType: type,
                        pageId: pageid,
                        width: "",
                        url: ""
                    };
                }
                widgets.push(newwidget);
            return newwidget;
            }


        function updateWidget(widgetId, widget) {
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
        }

        function deleteWidget(widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    resultSet.push(widgets[w]);
                }
            }
            return resultSet;
        }
    }
})();