#!/bin/env sh

sleep 2
flask db init 2> /dev/null
flask db upgrade && flask run --host=0.0.0.0
