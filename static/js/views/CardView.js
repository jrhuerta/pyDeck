define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/card.html'
], function ($, Backbone, hb, card_template) {

    var CardView = Backbone.View.extend({
        el: null,
        template: null,
        model: null,

        initialize: function () {
            this._template = hb.compile(card_template);
            this.render();
        },

        render: function (el) {
            this.el = el || this.el;
            if (!this.el) {
                return;
            }
            $(this.el).html(this._template(this.model.toJSON()));
        }

    });

    return CardView;
});