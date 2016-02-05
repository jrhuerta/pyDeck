"use strict";

require.config({
    baseUrl: '/static/js',
    paths: {
        jquery: '../vendor/jquery.min',
        jqueryui: '../vendor/jquery-ui.min',
        bootstrap: '../vendor/bootstrap/js/bootstrap.min',
        underscore: '../vendor/underscore-min',
        backbone: '../vendor/backbone',
        text: '../vendor/text',
        handlebars: '../vendor/handlebars.amd.min',
        select2: '../vendor/select2.full.min.js',
        interact: '../vendor/interact.min',
        pivottable: '../vendor/pivottable/pivot.min',
        helpers: 'helpers'
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
        },
        'pivottable': {
            deps: ['jquery', 'jqueryui']
        }
    }
});

require([
    'jquery',
    'views/DeckBuilderView',
    'helpers',
    'bootstrap',

], function ($, DeckBuilderView) {
    var builder = new DeckBuilderView({
        el: $('[role="builder"]')
    });
});


