from flask import Flask, render_template
import json
from mtglib.gatherer_request import SearchRequest
from mtglib.card_extractor import CardExtractor

app = Flask(__name__)


@app.route('/')
def hello_world():
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


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, use_debugger=True)
