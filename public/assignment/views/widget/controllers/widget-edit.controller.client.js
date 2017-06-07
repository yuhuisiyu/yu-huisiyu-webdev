(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                widgetService,
                                $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        //event handlers
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.getEditor = getEditor;

        function init() {
           widgetService.findWidgetById(model.widgetId).then(
                function(data) {
                    model.widget = data;
                }
            );
        }
        init();

        function getEditor() {
            return 'views/widget/editors/widget-' + model.widget.widgetType.toLowerCase() + '-edit.view.client.html';
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function updateWidget() {
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }
    }
})();