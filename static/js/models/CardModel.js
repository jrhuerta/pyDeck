define([
    'backbone'
], function (Backbone) {

    var CardModel = Backbone.Model.extend({

        defaults: {
            community_rating    : 0,
            converted_mana_cost : 0,
            mana_cost           : null,
            name                : null,
            rules_text          : null,
            types               : []
        }

    });

    return CardModel

});