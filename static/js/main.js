"use strict";

require.config({
    baseUrl: '/static/js',
    paths: {
        jquery      : '../vendor/jquery.min',
        jqueryui    : '../vendor/jquery-ui.min',
        bootstrap   : '../vendor/bootstrap/js/bootstrap.min',
        underscore  : '../vendor/underscore-min',
        backbone    : '../vendor/backbone',
        text        : '../vendor/text',
        handlebars  : '../vendor/handlebars.amd.min',
        select2     : '../vendor/select2.full.min.js',
        helpers     : 'helpers'
    },
    wrapShim: true,
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'jqueryui': {
            deps: ['jquery']
        },
        'select2': {
            deps: ['jquery'],
            exports: 'Select2'
        }
    }
});

require([
    'jquery',
    'views/SearchView',
    'views/CardView',
    'models/CardModel',
    'models/CardCollection',
    'helpers',
    'bootstrap'
], function($, SearchView, CardView, CardModel, CardCollection) {

    var search = new SearchView({
        el: $('[role="search"]')
    });

    //var el = $('[role="card_list"]');
    //var cards = new CardCollection();
    //cards.fetch({
    //    success: function (collection) {
    //        collection.each(function (item) {
    //            var el_card = $('<div>');
    //            var card = new CardView({el: el_card, model: item});
    //            el.append(el_card);
    //        });
    //        console.log(collection);
    //    }
    //});

    //
    //
    //var x = cards.get('587ef19bc96e90caac76047f069f4da7');
    //new CardView({
    //    el: $('[role="card"]'),
    //    model: x
    //});
});


