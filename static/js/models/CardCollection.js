define([
    'backbone',
    'models/CardModel'
], function (Backbone, CardModel) {

    var CardCollection = Backbone.Collection.extend({
        model: CardModel,

        _baseUrl: '/api/card',
        _query: null,

        url: function () {
            return [this._baseUrl, this._query].join('?')
        },

        query: function (query) {
            this._query = query;
            return this;
        }

    });

    return CardCollection;

});