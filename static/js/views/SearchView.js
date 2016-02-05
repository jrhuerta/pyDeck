define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/search.html',
    'models/CardCollection',
    'views/CardView'
], function ($, _, Backbone, hb, search_template, CardCollection, CardView) {

    var SearchView = Backbone.View.extend({
        el: null,
        template: null,
        results: null,
        containerTag: '<div>',

        initialize: function () {
            this.template = hb.compile(search_template);
            this.results = new CardCollection();
            this.listenTo(this.results, 'reset', this.renderSearchResults);
            this.render();
        },

        render: function () {
            $(this.el).html(this.template());
        },

        events: {
            'click input[type="button"]': 'doSearch'
        },

        doSearch: function() {
            var filters = $('form', this.el).serialize();
            this.results
                .query(filters)
                .fetch({reset: true});
        },

        renderSearchResults: function () {
            var self = this;
            var list = $('[role="results"]', self.el);
            list.empty();
            self.results.each(function (item) {
                var el = $(self.containerTag),
                    c = new CardView({
                        el: el,
                        model: item
                });
                list.append(el);
            });
        }

    });

    return SearchView;
});

