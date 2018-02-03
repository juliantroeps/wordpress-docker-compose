# Wordpress docker-compose Starterkit
Run WordPress dockerized for local development.

## Container
- WordPress from `wordpress:latest`
- mySQL from `mariadb`
- wpcli from `tatemz/wp-cli` 

## Install
- Clone the repo 
- Run `docker-compose up` or `docker-compose up -d`
- Visit `http://localhost:3001`

## Tools

#### Create theme
- cd into ./tools
- Update themename variable in `createtheme.sh` and run `sh createtheme.sh` to create our empty theme files

#### Gulp taskrunner	
- Update themename variable in `gulpfile.js`
- Run `npm install`
- Run `gulp` to watch for styles (sass) and scripts (js)

The working directories are:
./assets/[type]/src/subdirectories/files.[type]
  
Our ready files are :
./assets/[type]/dist/subdirectories/main[.min].[type]

#### Backups
- cd into ./tools
- Run `sh export.sh` to create a zipped database drop and wp-content folder

#### WP_CLI
Additionally we added a wp_cli container to accces your WordPress-Install via your terminal etc.

Access: `$ docker-compose run --rm wpd_wpcli` or use `wp` as an command alias `$ alias wp="docker-compose run --rm wpd_wpcli"`

Visit docs for more info (http://wp-cli.org/de/)


    
#### Using existing content
Before you run `docker-compose up` put your .sql file inside `./data` to use your data instead of creating empty tables.
Make sure to update the wpd_wordpress environment variable `WORDPRESS_TABLE_PREFIX` in the `docker-compose.yml` file. (default is wpd\_)


## Todo
- Gulp image optimization (wp-content/uploads/**)
