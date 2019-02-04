#!/bin/bash

set -e
expected="200"

actual=`curl --write-out "%{http_code}\n" --silent --output /dev/null "$URL"`

echo "Expected Status: $expected"
echo "Actual Status: $actual"

if [ "$expected" != "$actual" ]; then
  echo "Test failed"
  exit 1
else
  echo "Test passed"
  exit 0
fi