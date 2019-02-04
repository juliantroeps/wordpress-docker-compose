#! /bin/bash

# Expecting 302, because WordPress redirects to insall page
expected="302"

echo "Starting Test 1."

echo "Waiting 20s until WordPress-Container boots up and is ready."

sleep 20s

echo "Test 1: If successful we are redirected to the install page ('/wp-admin/install.php')."

actual=`curl --write-out "%{http_code}\n" --silent --output /dev/null "http://localhost:3001"`
urleffective=`curl --write-out "%{url_effective}\n" --silent --output /dev/null "http://localhost:3001"`

echo "Expected Status: $expected"
echo "Actual Status: $actual"


if [ "$expected" != "$actual" ]; then
  echo "Test 1 failed."
  exit 1
else
  echo "URL effective: $urleffective"
  echo "Test 1 passed."
  exit 0
fi
