#!/bin/bash

cd $(dirname $0)/..

pip install -r requirements.txt

npm install

./node_modules/.bin/bower install
