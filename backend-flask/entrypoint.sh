#!/bin/env sh

sleep 2
flask db init >> /dev/null
flask db upgrade && flask run --host=0.0.0.0
