(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService($http, $routeParams) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidget: sortWidget
        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            widget.pageId = pageId;
            return $http.post(url, widget).then(
                function (response) {
                    return response.data;
                }
            )
        }


        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            $http.delete(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function sortWidget(initial, final) {
            var url = "/page/" + $routeParams['pid'] + "/widget?initial=" + initial + "&final=" + final;
            $http.put(url);
        }
    }
})();