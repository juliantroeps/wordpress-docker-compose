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
const replace       = require('gulp-replace');

// Theme-Name
const themename = "UPDATE_THIS";

// Path to assets
const theme_path    = './www/wp-content/themes/' + themename;
const assets_path   = theme_path + '/assets/';

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

// Everything in separate files
gulp.task('scripts_single', function() {
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

// Single file from jsfiles-Array
gulp.task('scripts', function() {
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

// Update the version string in functions.php (Epoch timestamp)
gulp.task('asset_version', () => {
    const version = Math.floor(new Date().getTime()/1000);
    return gulp.src(theme_path + '/functions.php')
        .pipe(replace(/(?<=')([0-9]!*){10}(?=')/g, (match) => {
            console.log('Replace ' + match + ' with ' + version + '.');
            return version;
        }))
        .pipe(gulp.dest(theme_path));
});

// We watch both .js and .scss
gulp.task('watch', function () {
    gulp.watch(theme_path + '/assets/css/src/**/*.scss', gulp.series('sass', 'asset_version'));
    gulp.watch(theme_path + '/assets/js/src/**/*.js', gulp.series('scripts', 'asset_version'));
});

// Default task is the watch task
gulp.task('default', gulp.series('watch'));
