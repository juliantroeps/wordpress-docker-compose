#!/bin/bash

themename=$1

cd ..
cd www/wp-content/themes/
mkdir -p $themename/assets/css/src
mkdir -p $themename/assets/css/vendor
mkdir -p $themename/assets/css/dist
mkdir -p $themename/assets/js/src
mkdir -p $themename/assets/js/dist
mkdir -p $themename/assets/js/vendor

cd $themename
touch index.php style.css functions.php page.php single.php header.php footer.php 404.php

cd assets/css/src
touch main.scss

cd ../../js/src
touch main.js


echo "$themename created successfully!"