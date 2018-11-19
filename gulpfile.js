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

// Theme-Name
var themename = "your-theme-name";

// Path to assets
var assets_path = './www/wp-content/themes/' + themename + '/assets/';

// Ordered scripts for gulp-concat (add your main file last)
var jsfiles = [
    assets_path + 'js/vendor/bootstrap.js',
    assets_path + 'js/src/main.js'
];
 
// Main sass compiling
gulp.task('sass', function () {
    return gulp.src(assets_path + 'css/src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(assets_path + 'css/dist'));
});

// Main script compiling
gulp.task('scripts', function() {
    return gulp.src(assets_path + 'js/src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./www/wp-content/themes/' + themename +'/assets/js/dist'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(assets_path + 'js/dist'));
});

// Concatenate all scripts from jsfiles array
gulp.task('scripts_concat', function() {
    return gulp.src(jsfiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(assets_path + 'js/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(assets_path + 'js/dist'));
});

// We watch both .js and .scss
gulp.task('watch', function () {
    gulp.watch('./www/wp-content/themes/' + themename +'/assets/css/src/**/*.scss', gulp.series('sass'));
    gulp.watch('./www/wp-content/themes/' + themename +'/assets/js/src/**/*.js', gulp.series('scripts'));
});

// Default task is the watch task
gulp.task('default', gulp.series('watch'));