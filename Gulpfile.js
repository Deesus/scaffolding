'use strict';
///////////////////////////////////////////////////
///
/// Author: Dee Reddy
/// Created: 02-16-2017
/// Last updated: 05-13-2017
///
///////////////////////////////////////////////////

// TODO: gulp sass doesn't pick up changes unless watcher is running;

///------------------------------------------------
/// Import modules:
///
///------------------------------------------------

var gulp            = require('gulp');
var gulpImageResize = require('gulp-image-resize');	    // See <https://www.npmjs.com/package/gulp-image-resize>
var gulpRename      = require('gulp-rename');
var gulpChanged     = require('gulp-changed');
var concurrent      = require('concurrent-transform');  // will only process files that have changed since last time
var gulpSass        = require('gulp-sass');
var autoPrefixer    = require('gulp-autoprefixer');
var gulpPlumber     = require('gulp-plumber');

///------------------------------------------------
/// Configuration:
///------------------------------------------------

/**
 * Config for all Gulp tasks:
 */

const IMG_FILE_TYPES = '*.{jpg,png}';
const CONFIG = {
    /// TODO: perhaps it would be more apt to place some of these in a 'RESPONSIVE_CONFIG' objects
    /// file paths of folders:
    PATHS: {
	/// TODO: set paths to your project folders:
        CSS_SRC_PATH:   './tests/stylesheets/**/*.css',
        CSS_DEST_PATH:  './tests/stylesheets/',
        HTML_SRC_PATH:  '',
        HTML_DEST_PATH: '',
        IMG_SRC_PATH:   './tests/images/images_src/**/' + IMG_FILE_TYPES,
        IMG_DEST_PATH:  './tests/images/images_target',
        JS_SRC_PATH:    '',
        JS_DEST_PATH:   '',
        SASS_SRC_PATH:  './tests/stylesheets/**/*.scss',
        SASS_DEST_PATH: './tests/stylesheets/css'
    }
};

///------------------------------------------------
/// Tasks:
///------------------------------------------------

/**
 * Responsive Images
 */
gulp.task('responsive- images', function () {
    gulp.src(CONFIG.PATHS.IMG_SRC_PATH)
        .pipe(gulpPlumber())

        // only process changed files:
        .pipe(gulpChanged(CONFIG.PATHS.IMG_DEST_PATH))

        // resize images:
        .pipe(gulpImageResize({
            width:          1600,   // if we only specify one dimension, output won't exceed this value
            quality:        0.85,   // jpg quality -- ranges from 0-1
            crop:           false,
            upscale:        false,
            imageMagick:    false   // specifies to use GraphicsMagick instead of ImageMagick
        }))

        // rename files:
        .pipe(gulpRename({
            suffix: '_large_2x'
        }))

        // destination output:
        .pipe(gulp.dest(CONFIG.PATHS.IMG_DEST_PATH));
});


/**
 * Compile Sass
 */
gulp.task('sass', function () {
    gulp.src(CONFIG.PATHS.SASS_SRC_PATH)
        .pipe(gulpPlumber())

        // only process changed files:
        .pipe(gulpChanged(CONFIG.PATHS.SASS_SRC_PATH))

        // compile SASS:
        .pipe(gulpSass({
                outputStyle: 'expanded'         // specifies formatting of CSS output (see github.com/sass/node-sass#outputstyle)
            }).on('error', gulpSass.logError)
        )

        // auto-prefixer:
        .pipe(autoPrefixer({
                browsers:   ['last 2 versions'],
                cascade:    true,                   // visually cascade prefixes
                flexbox:    'no-2009',              // adds flexbox prefixes ONLY for final and IE versions
                grid:       true                    // adds IE prefixes for Grid Layouts
            }).on('error', function (error) {
                console.log(error.message);
        }))

        // destination output:
        .pipe(gulp.dest(CONFIG.PATHS.SASS_DEST_PATH));
});


/**
 * Watcher
 */
gulp.task('watch', function() {
    /// TODO: add your tasks to watcher
    gulp.watch(CONFIG.PATHS.SASS_SRC_PATH, ['sass']);
});


/// default task:
gulp.task('default', ['sass', 'watch']);
