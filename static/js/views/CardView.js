define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/card.html'
], function ($, Backbone, hb, card_template) {

    var CardView = Backbone.View.extend({

        template: null,
        model: null,

        initialize: function () {
            this._template = hb.compile(card_template);
            this.render();
        },

        render: function () {
            $(this.el).html(this._template(this.model.toJSON()));
        }

    });

    return CardView;
});