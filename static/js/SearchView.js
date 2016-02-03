define([
    'jquery',
    'backbone',
    'jqueryui'

], function ($, Backbone) {

    var SearchView = Backbone.View.extend({
        initialize: function () {
            $(this.el).autocomplete({
                source: "search",
                minLength: 2,
                select: function (event, ui) {
                    console.log('selected');
                }
            })
            .autocomplete( "instance" )
                ._renderItem = function( ul, item ) {
                    return $( "<li>" )
                        .append("<img src='" + item.image_url + "'>")
                        .append( "<a>" + item.name + "<br>" + item.rules_text + "</a>" )
                        .appendTo( ul );
                };
        }
    });

    return SearchView;
});

