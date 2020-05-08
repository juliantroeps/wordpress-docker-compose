# WordPress Development with Docker and Webpack [![Build Status](https://travis-ci.com/juliantroeps/wordpress-docker-compose.svg?branch=master)](https://travis-ci.com/juliantroeps/wordpress-docker-compose)

Develop your WordPress-Theme or -Plugin locally with **Docker Compose** and **Webpack 4 with ES6**.

## Getting started
- `git clone https://github.com/juliantroeps/WordPress-docker-compose.git myproject` where "myproject" will be your root directory
- `docker-compose up` or `docker-compose up -d` to build the container
- `open http://localhost:3001` and install your WordPress site

If you want to build a WordPress-Network change the WordPress service port to ``80:80`` before building the container.

#### Directory structure for Webpack

The paths set in the ``webpacl.config.js`` are created for the following project structure.

```
| docker-compose.yml
| webpack.config.js
| www
|   | index.php
|   | wp-config.php
|   | wp-content.js
|   |   | themes
|   |   |   | THEME_NAME
|   |   |   |   | lang
|   |   |   |   | assets
|   |   |   |   |   | assets
|   |   |   |   |   |   | dist
|   |   |   |   |   |   | src
|   |   |   |   |   |   |   | css
|   |   |   |   |   |   |   |   | app.scss
|   |   |   |   |   |   |   |   | _partial.scss
|   |   |   |   |   |   |   |   | ...
|   |   |   |   |   |   |   | js
|   |   |   |   |   |   |   |   | app.js
|   |   |   |   |   |   |   |   | plugin.jquery.js
|   |   |   |   |   |   |   |   | ...
|   |   |   |   |   |   |   | fonts
|   |   |   |   |   |   |   | img
|   |   |   |   | index.php
|   |   |   |   | functions.php
|   |   |   |   | style.css
|   |   |   |   | ...
|   |   |   | ...
|   |   | ...
|   | ...
| ...
```

## Tools

### Webpack
Webpack is used for SASS processing and to bundle JavaScript files. You can use ES6 syntax and import directly from node_modules.

Update the ``THEME_NAME`` string to your theme in the ``path`` object in the webpack.config.js. Optionally update the path.

Run `npm run dev` or `yarn dev` to watch for file changes and build on the fly and use `npm run prod` or `yarn prod` to optimze the output.

### Backups
- cd into ./tools
- Run `sh export.sh` to create a zipped database drop, `sh export.sh true` to gzip the filesystem to.

### Using existing content
Put your .sql file inside `./data` and run `docker-compose up` to use your data instead of creating empty tables.
Make sure to update the wpd_wordpress environment variable `WORDPRESS_TABLE_PREFIX` in the `docker-compose.yml` file. (default is wpd\_)

## Production
~~You can use this configuation in production too. Expose the wordpress-sevice on port 80 and use the `wordpress:4.9.8-php7.0` image instead of the latest tag.
By default the `WORDPRESS_DEBUG` environment variable is set to true (`1`). In production you should set it to false (`0`).~~

_You can do that. But there are better ways. Let's update this later!_

## Changes

### 2020.05.08

- Removed .browserslistrc, moved to package.json
- Updated webpack.config.js for multiple input->output (multiple js apps in one theme)
- Added postcss-loader to webpack.config.js
- Remove create-theme tool

### 2020.01.09

- Removed gulp in favor for Webpack 4

### 2019.06.03

- Updated Gulpfile with image optimization (gulp-imagemin without special config)

### 2019.05.28

- Updated Gulpfile with automated version bump (Unix Epoch Timestamp)

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
- Add production workflow -> docker-compose.prod.yml
