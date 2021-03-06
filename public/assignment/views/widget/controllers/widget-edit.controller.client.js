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
            widgetService.findWidgetsByPageId(model.pageId).then(
                function(data) {
                    model.widgets = data;
                }
            );
        }
        init();

        function getEditor(widgetType) {
            if (widgetType === "HEADING") {
                var html = 'views/widget/editors/widget-heading-edit.view.client.html';
            }
            if (widgetType === "IMAGE") {
                var html = 'views/widget/editors/widget-image-edit.view.client.html';
            }
            if (widgetType === "YOUTUBE") {
                var html = 'views/widget/editors/widget-youtube-edit.view.client.html';
            }
            if (widgetType === "TEXT") {
                var html = 'views/widget/editors/widget-text-edit.view.client.html';
            }
            if (widgetType === "HTML") {
                var html = 'views/widget/editors/widget-html-edit.view.client.html';
            }
            return html;
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function updateWidget() {
            if(model.widget.name === "" || model.widget.name === undefined) {
                model.message = "Please enter the name.";
                return;
            }
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }
    }
})();