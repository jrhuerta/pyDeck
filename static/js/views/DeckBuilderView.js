define([
    'jquery',
    'backbone',
    'handlebars',
    'views/SearchView',
    'views/DeckView',
    'text!templates/deck_builder.html'
], function ($, Backbone, hb, SearchView, DeckView,
             deck_build_template) {

    var DeckBuilderView = Backbone.View.extend({
        el: null,
        template: null,

        initialize: function () {
            this.template = hb.compile(deck_build_template);
            this.render();
        },

        render: function () {
            this.el = $(this.el);
            this.el.empty();
            this.el.html(this.template());

            this.search_view = new SearchView({
                el: $('[role="search"]', this.el)
            });

            this.deck_view = new DeckView({
                el: $('[role="deck"]', this.el)
            });

            this.listenTo(this.search_view, 'updated', this.updateDragContainer);
        },

        updateDragContainer: function () {
        }

    });

    return DeckBuilderView;
});
