// The Gulpfile.

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var themename = "changeHere";


// Main sass compiling
gulp.task('sass', function () {
    return gulp.src('./www/wp-content/themes/' + themename +'/assets/css/src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./www/wp-content/themes/' + themename +'/assets/css/dist'));
});

// Compile all sass files to main WordPress stylesheet (remeber to add the header comment)
gulp.task('sass_to_main_styles', function () {
    return gulp.src('./www/wp-content/themes/' + themename +'/assets/css/src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(sourcemaps.write('/'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./www/wp-content/themes/'));
});

// Main scripts compiling
gulp.task('scripts', function() {
    return gulp.src('./www/wp-content/themes/' + themename +'/assets/js/src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./www/wp-content/themes/' + themename +'/assets/js/dist'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./www/wp-content/themes/' + themename +'/assets/js/dist'));
});

// We watch both .js and .scss
gulp.task('watch', function () {
    gulp.watch('./www/wp-content/themes/' + themename +'/assets/css/src/**/*.scss', ['sass']);
    gulp.watch('./www/wp-content/themes/' + themename +'/assets/js/src/**/*.js', ['scripts']);
});

// Default task is the watch task
gulp.task('default', ['watch']);