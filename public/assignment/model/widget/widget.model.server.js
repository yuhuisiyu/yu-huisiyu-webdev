var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');
var pageModel = require('../page/page.model.server.js');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidgetOrder = updateWidgetOrder;
widgetModel.findWidgetByIds = findWidgetByIds;

function createWidget(widget) {
    return widgetModel.create(widget)
        .then(function () {
            pageModel.updateWidgetList(widget._page, widget._id);
            return widget;
        })
}

function findAllWidgetsForPage(pageId) {
    return pageModel.findPageById(pageId).then(
        function (page) {
            return page._widgets;
        }
    );
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update(
        {_id: widgetId}, {$set: widget}
    );
}


function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function () {
            var widget = widgetModel.findWidgetById(widgetId);
            websiteModel.deletePageList(widget._page, widgetId);
        })
}

function updateWidgetOrder(pageId, start, end) {
    return pageModel.findPageById(pageId).then(
        function (page) {
            var widgets = page._widgets;
            widgets.splice(end, 0, widgets.splice(start, 1)[0]);
            page._widgets = widgets;
            return pageModel.updatePage(pageId, page);
        }
    )
}

function findWidgetByIds(widgetIds) {
    return widgetModel.find(
        {_id: {$in: widgetIds}}
    )
}

