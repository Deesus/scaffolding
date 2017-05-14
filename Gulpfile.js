'use strict';
///////////////////////////////////////////////////
///
/// Author: Dee Reddy
/// Created: 02-16-2017
/// Last updated: 05-13-2017
///
///////////////////////////////////////////////////

///------------------------------------------------
/// Import modules:
///
///
///------------------------------------------------
var gulp            = require('gulp');
var gulpImageResize = require('gulp-image-resize');	    // See <https://www.npmjs.com/package/gulp-image-resize>
var gulpRename      = require('gulp-rename');
var gulpChanged     = require('gulp-changed');
var concurrent      = require('concurrent-transform');  // will only process files that have changed since last time
var gulpSass        = require('gulp-sass');

///------------------------------------------------
/// Configuration:
///------------------------------------------------

/**
 * Config for all Gulp tasks:
 */

const IMG_FILE_TYPES = '**/*.{jpg,png}';
const CONFIG = {
    /// TODO: perhaps it would be more apt to place some of these in a 'RESPONSIVE_CONFIG' objects
    /// file paths of folders:
    PATHS: {
	/// TODO: set paths to your project folders:
        IMG_SRC_PATH:   './tests/images/images_src/' + IMG_FILE_TYPES,
        IMG_DEST_PATH:  './tests/images/images_target',
        JS_SRC_PATH:    '',
        JS_DEST_PATH:   '',
        HTML_SRC_PATH:  '',
        HTML_DEST_PATH: '',
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
gulp.task('compile-sass', function () {
    gulp.src(CONFIG.PATHS.SASS_SRC_PATH)

        // only process changed files:
        .pipe(gulpChanged(CONFIG.PATHS.SASS_SRC_PATH))

        // compile SASS:
        .pipe(gulpSass())

        // destination output:
        .pipe(gulp.dest(CONFIG.PATHS.SASS_DEST_PATH));
});


/**
 * Watcher
 */
gulp.task('watch', function() {
    gulp.watch(CONFIG.PATHS.SASS_SRC_PATH, ['compile-sass']);
    // gulp.watch(CONFIG.PATHS.JS_SRC_PATH, ['js-task-name']);
});

/// default task:
gulp.task('default', ['compile-sass', 'responsive- images', 'watch']);