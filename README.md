# Wordpress docker-compose Starterkit [![Build Status](https://travis-ci.com/juliantroeps/wordpress-docker-compose.svg?branch=master)](https://travis-ci.com/juliantroeps/wordpress-docker-compose)
Local WordPress development with docker-compose and gulp-sass.

## Container
- WordPress from `wordpress:latest`
- MySQL from `mariadb`

##### Examples:

- `:latest` to get the latest image
- `:5.1.0` to get the specific WordPress version (5.1.0 in this case)
- `:5.1.0-alpine` to get the specific WordPress version in an [Alpine Linux](http://alpinelinux.org) image (smaller in size)

See [Dockerhub WordPress](https://hub.docker.com/_/wordpress/) for available tags.

## Getting started
- `git clone https://github.com/juliantroeps/WordPress-docker-compose.git myproject`
- `cd myproject` and `docker-compose up` or `docker-compose up -d`
- `open http://localhost:3001` and install your WordPress-Site

If you want to push this into your own repo remove the `.git` folder, `git init` and update the `.gitignore` based on your themename

Change the docker-file wordpress-service port to `80:80` if you want to build a WordPress-Network.

## Tools

#### Create theme
- cd into ./tools
- Run `sh createtheme.sh your-theme-name` to create empty theme files

#### Gulp taskrunner
- Update themename variable in `gulpfile.babel.js`
- Run `yarn install`
- Run `gulp` or `gulp watch` to watch for styles (sass) and scripts (js)

#### Backups
- cd into ./tools
- Run `sh export.sh` to create a zipped database drop, `sh export.sh true` to gzip the filesystem to.

#### Using existing content
Put your .sql file inside `./data` and run `docker-compose up` to use your data instead of creating empty tables.
Make sure to update the wpd_wordpress environment variable `WORDPRESS_TABLE_PREFIX` in the `docker-compose.yml` file. (default is wpd\_)

## Production
~~You can use this configuation in production too. Expose the wordpress-sevice on port 80 and use the `wordpress:4.9.8-php7.0` image instead of the latest tag.
By default the `WORDPRESS_DEBUG` environment variable is set to true (`1`). In production you should set it to false (`0`).~~

_You can do that. But there are better ways. Let's update this later!_

## Changes

### 2019.04.11
- Updated gulp-workflow for ES6 with Babel
- Empty ./data in GitHub
- Updated .gitignore
- Fixed Typos

### 2019.04.03
- Fixed bug in export script, argument now working

### 2018.11.19
- Bumped gulp version in package.json to 4.0.0 
- Updated gulpfile.js to work with gulp@4.0.0

If you run into an error while running `gulp watch` check [this issue/comment](https://github.com/gulpjs/gulp-cli/issues/84#issuecomment-272958709).

## Todo
- Gulp image optimization (wp-content/uploads/)
- Add production workflow -> docker-compose.prod.yml
