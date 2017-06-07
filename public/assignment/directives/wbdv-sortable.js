(function() {
    angular.module("WebAppMaker")
           .directive('wdDraggable', wdDraggable);

    function wdDraggable(widgetService) {
        function linkFunction(scope, element) {
            var initial = 0;
            $(element).sortable(

                {
                    start: function(event, ui) {
                        initial = ui.item.index();
                    }
                },
                {
                    stop: function(event, ui) {
                        var final = ui.item.index();
                        widgetService.sortWidget(initial, final);
                    }

                }
            );
        }
        return {
            link: linkFunction
        }
    }
})();