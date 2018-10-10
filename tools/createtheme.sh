#!/bin/bash

themename=$1

cd ..
cd www/wp-content/themes/

git clone https://juliantroeps@bitbucket.org/hypemedia/wordpress-boilerplate.git $themename

cd $themename
rm -rf .git

echo "$themename created successfully!"