define([
    'jquery',
    'underscore',
    'handlebars',
    'text!templates/mana_cost.html'
], function($, _, Handlebars, mana_cost_template) {

    Handlebars.registerHelper(
        'mana_colors',
        function (mana_cost) {
            var mana = mana_cost.split('');
            mana = _.intersection(mana, ['W', 'G', 'B', 'U', 'R', 'C']);
            mana = _.uniq(mana);
            mana = _.sortBy(mana);
            return mana.join('');
        });

    mana_cost_template = Handlebars.compile(mana_cost_template);

    Handlebars.registerHelper(
        'mana_cost',
        function (mana_cost) {
            var mana = mana_cost.toLowerCase().split('');
            return _.reduce(
                mana,
                function (result, item) {
                    return result + mana_cost_template(item);
                },
                ''
            );
        }
    );

    Handlebars.registerHelper(
        'ruling_text',
        function (ruling_text) {
            return ruling_text
                .replace(/(?:\r\n|\r|\n)/g, '<br />')
                .replace(/\{(\w)\}/g, function (matched, mana) {
                    mana = mana.toLowerCase();
                    if (mana == 't') {
                        mana = 'tap'
                    }
                    return mana_cost_template(mana);
                });
        }
    )

});