#!/bin/bash

/usr/local/bin/janus --log-file=/usr/local/bin/logs
python3 -m http.server --directory /usr/local/src/live-stream/site 8080