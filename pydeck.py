from flask import Flask, render_template
from flask_restful import Api, reqparse, Resource
from functools import partial, wraps
import json
from mtglib.gatherer_request import SearchRequest
from mtglib.card_extractor import CardExtractor
from hashlib import md5

app = Flask(__name__)
api = Api(app)


def nullable(factory, value):
    if value is None or value == '':
        return None
    return factory(value)


def parser_factory(**kwargs):
    p = reqparse.RequestParser()
    for name, args in kwargs.iteritems():
        type_ = args.get('type', None)
        if type_:
            args['type'] = partial(nullable, type_)
        p.add_argument(name, **args)
    return p


def from_query(**parameters):
    parser = parser_factory(**parameters)

    def decorator(f):
        @wraps(f)
        def inner(*args, **kwargs):
            query_arguments = parser.parse_args()
            kwargs.update(query_arguments)
            return f(*args, **kwargs)
        return inner

    return decorator


class Card(Resource):
    @from_query(
        name=dict(type=str),
        mana=dict(type=str, action='append'),
        cmc=dict(type=int)
    )
    def get(self, **kwargs):
        request = SearchRequest(kwargs)
        rv = []
        for c in CardExtractor(request.url).cards:
            card = vars(c)
            card['converted_mana_cost'] = len(card.get('mana_cost'))
            rv.append(card)
        return rv

api.add_resource(Card, '/api/card', endpoint='card_api')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search')
def search(kw=None):
    kw = 'Kor'
    rv = []
    if kw:
        request = SearchRequest(dict(name=kw))
        for card in CardExtractor(request.url).cards:
            rv.append(vars(card))
    return json.dumps(rv, indent=2), 200, {'Content-Type': 'application/json'}


_cards = [{
        "artist": "Lars Grant-West",
        "card_number": "256",
        "community_rating": "3.819",
        "community_votes": "47",
        "converted_mana_cost": "8",
        "mana_cost": "5URG",
        "name": "Commune with Nature",
        "printings": [
            [
                "Tenth Edition",
                "Common"
            ],
            [
                "Champions of Kamigawa",
                "Common"
            ],
            [
                "Modern Masters 2015 Edition",
                "Common"
            ]
        ],
        "printings_full": {
            "Champions of Kamigawa": [
                {
                    "id": "76639",
                    "rarity": "Common"
                }
            ],
            "Modern Masters 2015 Edition": [
                {
                    "id": "397767",
                    "rarity": "Common"
                }
            ],
            "Tenth Edition": [
                {
                    "id": "130521",
                    "rarity": "Common"
                }
            ]
        },
        "rules_text": "Look at the top five cards of your library. You may reveal a creature card from among them and put it into your hand. Put the rest on the bottom of your library in any order.",
        "ruling_data": [
            [
                "12/1/2004",
                "If you don't reveal a creature card, put all the revealed cards on the bottom of your library in any order."
            ]
        ],
        "types": [
            "Sorcery",
            "Instant"
        ]
    }]


@app.route('/card')
def cards():
    c = list(_cards)
    c[0]['id'] = md5(json.dumps(_cards[0])).hexdigest()
    return json.dumps(c, indent=2), 200, {"Content-Type": "application/json"}


@app.route('/card/<id_>')
def card(id_):
    c = dict(_cards[0])
    c['id'] = md5(json.dumps(_cards[0])).hexdigest()
    return json.dumps(c, indent=2), 200, {"Content-Type": "application/json"}


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, use_debugger=True)
