/*= Info =====
 - Description: Gulpfile for image optimization and asset compiling build for WordPress development.
 - Author: Julian Troeps
 - Contact: hi@juliantroeps.com
=== ===========

=== Changelog =====
  - 26.10.17 v0.4
    + removed image optimization
    + changed whole script task
    + changed file-structure (added /src + /dist)
    + changed default task to watch task
  - 06.10.17 v0.3
    + themename variable
    + changed folder structure
    + removed versions, added changelog, chnaged meta
  - 28.08.17 v0.2
  - 16.07.17 v0.1
=== ===========

=== Tasks =====
  - Sass compiling - done
  - js minifing - done
  - image optimazion for wp-uploads and theme assets
=== =========== */


// === Configuration 
var gulp = require('gulp');
var watch = require('gulp-watch');

//SASS-CSS
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

//JS 
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var themename = "themename";

// === Go! 

//Sass =======================
gulp.task('sass', function () {
  return gulp.src('./www/wp-content/themes/' + themename +'/assets/css/src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./www/wp-content/themes/' + themename +'/assets/css/dist'));
});

//Scripts  =======================
gulp.task('scripts', function() {
    return gulp.src('./www/wp-content/themes/' + themename +'/assets/js/src/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./www/wp-content/themes/' + themename +'/assets/js/dist'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./www/wp-content/themes/' + themename +'/assets/js/dist'));
});

//Default + watch  =======================
gulp.task('watch', function () {
    gulp.watch('./www/wp-content/themes/' + themename +'/assets/css/src/**/*.scss', ['sass']);
    gulp.watch('./www/wp-content/themes/' + themename +'/assets/js/src/**/*.js', ['scripts']);
});

gulp.task('default', ['watch']);


// =============================
// =============================
// =============================
