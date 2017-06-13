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
            var widget = {
                name: "",
                widgetType: type,
                pageId: model.pageId
            };
            widgetService.createWidget(model.pageId, widget).then(
                function (response) {
                    var createdId = response.insertedIds[0];
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + createdId);
                }
            );
        }


    }
})();