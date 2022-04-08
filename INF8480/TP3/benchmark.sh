#!/bin/bash

for i in {1..30}; do
	curl http://132.207.12.71:8080 > /dev/null 2>&1 &
done

wait
