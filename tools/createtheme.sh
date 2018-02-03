#!/bin/bash

themename="changethis"

cd ..
cd www/wp-content/themes/
mkdir -p $themename/assets/css/src
mkdir -p $themename/assets/css/dist
mkdir -p $themename/assets/js/src
mkdir -p $themename/assets/js/dist
cd $themename
touch index.php style.css function.php page.php single.php header.php footer.php 404.php

echo "$themename created"