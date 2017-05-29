(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetChooseController', widgetChooseController);

    function widgetChooseController(widgetService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.navigateWidget = navigateWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function navigateWidget(widgetType) {
            var newwidget = widgetService.createWidget(widgetType,model.pageId);
            console.log(newwidget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newwidget._id);
        }
    }
})();