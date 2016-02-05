from flask_restful import fields


class Entity(object):

    def __init__(self, **kwargs):
        for k, v in kwargs.iteritems():
            setattr(self, k, v)


class Card(Entity):

    fields = {
        'community_rating': fields.Integer(default=0),
        'converted_mana_cost': fields.Integer(default=0),
        'mana_cost': fields.String,
        'name': fields.String,
        'rules_text': fields.String,
        'types': fields.List(fields.String)
    }


class Deck(Entity):

    fields = {
        'name': fields.String,
        'cards': fields.List(fields.Nested(Card.fields))
    }


class Inventory(object):

    def filter(self, **kwargs):
        request = SearchRequest(kwargs)
        for card in CardExtractor(request.url).cards:
            yield Card(vars(card))