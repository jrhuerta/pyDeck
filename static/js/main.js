"use strict";

require.config({
    baseUrl: '/static/js',
    paths: {
        jquery      : '../vendor/jquery.min',
        jqueryui    : '../vendor/jquery-ui.min',
        bootstrap   : '../vendor/bootstrap/js/bootstrap.min',
        underscore  : '../vendor/underscore-min',
        backbone    : '../vendor/backbone'
    },
    wrapShim: true,
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'jqueryui': {
            deps: ['jquery']
        }
    }
});

require([
    'jquery',
    'SearchView'
], function($, SearchView) {
    new SearchView({el: $('[role="search"]')});
});


