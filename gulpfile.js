// The Gulpfile.
const gulp          = require('gulp');
const watch         = require('gulp-watch');
const sass          = require('gulp-sass');
const babel         = require('gulp-babel');
const cleanCSS      = require('gulp-clean-css');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const concat        = require('gulp-concat');
const rename        = require('gulp-rename');
const uglify        = require('gulp-uglify');
const buffer        = require('vinyl-buffer');
const log           = require('fancy-log');

// Theme-Name
const themename = "productware";

// Path to assets
const assets_path = './www/wp-content/themes/' + themename + '/assets/';

// Ordered scripts for gulp-concat (add your main file last)
const jsfiles = [
    assets_path + 'js/vendor/bs-js/bootstrap.bundle.js',
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
        .pipe(babel({
            presets: ['@babel/env']
        }))
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
        .pipe(babel({
            presets: [[ "@babel/env", { modules: false } ]]
        }))
        .pipe(buffer())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(assets_path + 'js/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(assets_path + 'js/dist'));
});

// We watch both .js and .scss
gulp.task('watch', function () {
    gulp.watch('./www/wp-content/themes/' + themename +'/assets/css/src/**/*.scss', gulp.series('sass'));
    gulp.watch('./www/wp-content/themes/' + themename +'/assets/js/src/**/*.js', gulp.series('scripts_concat'));
});

// Default task is the watch task
gulp.task('default', gulp.series('watch'));
