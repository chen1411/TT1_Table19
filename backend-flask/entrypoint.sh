#!/bin/env bash

sleep 2
flask db init >> /dev/null
flask db migrate && flask db upgrade && flask run --host=0.0.0.0
