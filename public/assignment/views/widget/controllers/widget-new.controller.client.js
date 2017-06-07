(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetChooseController', widgetChooseController);

    function widgetChooseController(widgetService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.createWidget = createWidget;

        function init() {
            widgetService.findWidgetsByPageId(model.pageId).then(
                function (data) {
                    model.widgets = data;
                }
            );
        }
        init();

        function createWidget(type) {
            if (type === "HEADING") {
                var newwidget = {
                    _id: (new Date()).getTime() + "",
                    widgetType: type,
                    pageId: model.pageId,
                    size: "",
                    text: "",
                }
            }
            if (type === "IMAGE") {
                var newwidget = {
                    _id: (new Date()).getTime() + "",
                    widgetType: type,
                    pageId: model.pageId,
                    width: "",
                    url: ""
                };
            }
            if (type === "YOUTUBE") {
                var newwidget = {
                    _id: (new Date()).getTime() + "",
                    widgetType: type,
                    pageId: model.pageId,
                    width: "",
                    url: ""
                };
            }
            widgetService.createWidget(newwidget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newwidget._id);
        }
    }
})();