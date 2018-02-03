# Wordpress Docker Starterkit
Personal WordPress Theme Development Starter Kit based on personel preferences. Edit (or leave) the MySQL- & Host-Ports and `docker-compose up -d`. Go through WordPress Setup. Set `var themename` to your theme folder in /wp-content/themes, save, setup files and `gulp watch` or `gulp` to watch for file changes. 
For DB management open phpMyAdmin on port http://localhost:8000 (or yours)

## docker-compose.yml
Run the Wordpress Installation in a docker container on http://localhost:XXXX
- WordPress Latest
- MariaDB
- phpMyAdmin

## gulpfile.js
Assets compiling in my own file structure inside the Wordpress content folder (themes, uploads)
- Sass minifing, source mapping
- js compiling, minifing

## Changelog
- 23.10.17
	+ gulpfile v0.4
		- removed image optimization
    	- changed whole script task
    	- changed file-structure ("/" -> "/src" + "/dist")
    	- changed default task to watch task
    + package.json
    	- changed name (bug npm install ERR)
    	- changed version x.x -> x.x.x (bug npm install ERR)
- 06.10.17 
	+ gulpfile v0.3
		- themename variable
    	- changed folder structure
    	- removed versions, added changelog, changed meta
    + docker-compose
    	- changed wordpress version to latest

## Todo
- gulpfile
	+ image-optimization, gzip files
- package.json
	+ ~~check versions~~
- shell scripts
	+ set table prefix
	+ db export
	+ auto create theme files
- docker-compose 
	+ switch images (own image?)
	+ set table prefix^

### work-in-progress