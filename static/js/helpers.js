define([
    'underscore',
    'handlebars'
], function(_, Handlebars) {

    Handlebars.registerHelper(
        'mana_colors',
        function(mana_cost) {
            var mana = mana_cost.split('');
            mana = _.intersection(mana, ['W', 'G', 'B', 'U', 'R', 'C']);
            mana = _.uniq(mana);
            mana = _.sortBy(mana);
            return mana.join('');
        });
});