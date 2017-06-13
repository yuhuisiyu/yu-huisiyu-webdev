(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce,widgetService,$routeParams) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];


        //event handlers
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;

        function init() {
           widgetService.findWidgetsByPageId(model.pageId).then(
                function (data) {
                    model.widgets = data;
                }
            );
        }
        init();

        //implementations
        function getWidgetUrlForType(widgetType) {
            if (widgetType === "HEADING") {
                var html = 'views/widget/templates/widget-heading.view.client.html';
            }
            if (widgetType === "IMAGE") {
                var html = 'views/widget/templates/widget-image.view.client.html';
            }
            if (widgetType === "YOUTUBE") {
                var html = 'views/widget/templates/widget-youtube.view.client.html';
            }
            if (widgetType === "TEXT") {
                var html = 'views/widget/templates/widget-text.view.client.html';
            }
            if (widgetType === "HTML") {
                var html = 'views/widget/templates/widget-html.view.client.html';
            }
            return html;
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trustThisContent(widget) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(widget.text);
        }
    }
})();