#!/bin/sh

docker build -t will . \
&& \
docker run -ti --rm --name will will
