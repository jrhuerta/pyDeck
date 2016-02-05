define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'interact',
    'text!templates/search.html',
    'models/CardCollection',
    'views/CardView'
], function ($, _, Backbone, hb, interact, search_template, CardCollection,
             CardView) {

    var SearchView = Backbone.View.extend({
        el: null,
        template: null,
        results: null,
        containerTag: '<div>',

        initialize: function () {
            this.template = hb.compile(search_template);
            this.results = new CardCollection();
            this.render();
            this.listenTo(this.results, 'reset', this.renderSearchResults);
        },

        render: function () {
            $(this.el).html(this.template());
        },

        events: {
            'click input[type="button"]': 'doSearch'
        },

        doSearch: function () {
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
            //this.attachInteract();
            this.trigger('updated');
        },

        attachInteract: function () {
            var self = this;
            interact('[role="card"]', {
                context: document.querySelector('[role="results"]')
            }).draggable({
                inertia: true,
                autoScroll: true,
                onmove: self.onMoveListener,
                onend: function (event) {
                    console.log(event)
                }
            });
        },

        onMoveListener: function (event) {
            var target = event.target,

            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

    });

    return SearchView;
});

