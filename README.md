# Wordpress docker-compose Starterkit
Local WordPress development with docker-compose and gulp-sass.

## Container
- WordPress from `wordpress:latest`
- mySQL from `mariadb`

## Install
- `git clone https://github.com/juliantroeps/WordPress-docker-compose.git myproject` 
- `cd myproject` and `docker-compose up` or `docker-compose up -d`
- `open http://localhost:3001` and install your WordPress-Site

Change the docker-file wordpress-service port to `80:80` if you want to build a WordPress-Network.

## Tools

#### Create theme
- cd into ./tools
- Run `sh createtheme.sh your-theme-name` to create our empty theme files

#### Gulp taskrunner	
- Update themename variable in `gulpfile.js`
- Run `npm install`
- Run `gulp` or `gulp watch` to watch for styles (sass) and scripts (js)
- Use `gulp single_file` to compile our CSS in the WordPress style.css file. Don't forget the WordPress File-Header.

#### Backups
- cd into ./tools
- Run `sh export.sh` to create a zipped database drop and wp-content folder

#### Using existing content
Put your .sql file inside `./data` and run `docker-compose up` to use your data instead of creating empty tables.
Make sure to update the wpd_wordpress environment variable `WORDPRESS_TABLE_PREFIX` in the `docker-compose.yml` file. (default is wpd\_)

## Production
You can use this configuation in production too. Expose the wordpress-sevice on port 80 and use the `wordpress:4.9.8-php7.0` image instead of the latest tag.

## Todo
- Gulp image optimization (wp-content/uploads/)