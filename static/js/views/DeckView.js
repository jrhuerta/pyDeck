define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'interact',
    'text!templates/deck.html',
    'models/CardCollection',
    'pivottable'
], function ($, _, Backbone, hb, interact, deck_template, CardCollection) {

    var DeckView = Backbone.View.extend({
        el: null,
        template: null,
        cards: null,

        initialize: function () {
            this.template = hb.compile(deck_template);
            this.cards = new CardCollection();
            this.render();
        },

        render: function () {
            var self = this;

            $(this.el).html(this.template());

            var cards = new CardCollection();
            cards.query('name=drone').fetch({
                success: self.renderPivotTable
            });


            //interact('[role="deck"]').dropzone({
            //    accept: '[role="card"]',
            //    overlap: 0.75,
            //    ondropactivate: self.onDropActivate,
            //    ondragenter: self.onDragEnter,
            //    ondragleave: self.onDragLeave,
            //    ondrop: self.onDrop,
            //    ondropdeactivate: self.onDropDeactivate
            //});
        },

        renderPivotTable: function (collection) {
            var data = _.map(collection.toArray(), function (item) {
                return {
                    name: item.get('name'),
                    mana_cost: item.get('mana_cost'),
                    cmc: item.get('converted_mana_cost'),
                    url: item.get('image_url')
                };
            });

            var tpl = $.pivotUtilities.aggregatorTemplates;

            $('.deck').pivotUI(data, {
                renderers: {
                    'Table': function (pvtData, opts) {
                        var table = $($.pivotUtilities.renderers['Table'](pvtData, opts));
                        $('.pvtVal', table).each(function (index, cell) {
                            cell = $(cell);
                            var content = cell.text();
                            cell.html(content);
                        });
                        return table;
                    }
                },
                aggregators: {
                    "Cards": function () {
                        //return tpl.count()();

                        return function (data, rowKey, colKey) {
                            return {
                                isTotal: function () {
                                    return rowKey.length == 0 || colKey.length == 0;
                                },
                                cards: [],
                                count: 0,
                                push: function (record) {
                                    this.cards.push(record);
                                },
                                value: function (param) {
                                    if (this.isTotal())
                                        return {
                                            type: 'total',
                                            value: this.cards.length
                                        };
                                    return {
                                        type: 'cards',
                                        value: this.cards
                                    };
                                },
                                format: function (x) {
                                    switch (x.type) {
                                        case 'total':
                                            return x.value;
                                        case 'cards':
                                            return _.map(this.cards, function (c) {
                                                var el = $('<img>');
                                                el.prop('src', c['url']);
                                                return el.prop('outerHTML');
                                            }).join(' ');
                                    }
                                }
                            };
                        };
                    }
                },
                cols: ['cmc'],
                rows: ['mana_cost']
            });
        },

        onDropActivate: function (event) {
            event.target.classList.add('drop-active');
        },

        onDropDeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active');
        },

        onDragEnter: function (event) {
            var draggableElement = event.relatedTarget,
                dropzoneElement = event.target;

            // feedback the possibility of a drop
            //dropzoneElement.classList.add('drop-target');
            draggableElement.classList.add('can-drop');
            //draggableElement.textContent = 'Dragged in';
        },

        onDragLeave: function (event) {
            // remove the drop feedback style
            //event.target.classList.remove('drop-target');
            event.relatedTarget.classList.remove('can-drop');
            //event.relatedTarget.textContent = 'Dragged out';
        },

        onDrop: function (event) {
            //event.relatedTarget.textContent = 'Dropped';
        },
    });

    return DeckView;
});