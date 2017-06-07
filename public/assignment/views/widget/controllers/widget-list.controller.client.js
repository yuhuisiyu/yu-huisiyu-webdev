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
        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }
    }
})();