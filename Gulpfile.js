'use strict';
///////////////////////////////////////////////////
///
/// Author: Dee Reddy
/// Created: 02-16-2017
/// Last updated: 05-18-2017
///
///////////////////////////////////////////////////

/// TODO: gulp sass doesn't pick up changes unless watcher is running;

///------------------------------------------------
/// Import modules:
///------------------------------------------------

const gulp              = require('gulp');
const gulpImageResize   = require('gulp-image-resize');	    // See <https://www.npmjs.com/package/gulp-image-resize>
const gulpRename        = require('gulp-rename');
const gulpChanged       = require('gulp-changed');
const concurrent        = require('concurrent-transform');  // will only process files that have changed since last time
const gulpSass          = require('gulp-sass');
const autoPrefixer      = require('gulp-autoprefixer');
const gulpPlumber       = require('gulp-plumber');
const gulpLess          = require('gulp-less');
const gulpCssComb       = require('gulp-csscomb');          // See <https://github.com/csscomb/csscomb.js/blob/master/doc/options.md> for options

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

    /// To compile .css files files into the same location as .less/.sass files,
    /// set dest path to same parent folder as src folder (i.e. everything before '**/*.scss').
    PATHS: {
	/// TODO: set paths to your project folders:
        CSS_COMB_JSON:  './cssComb.json',
        CSS_SRC_PATH:   './tests/stylesheets/**/*.css',
        CSS_DEST_PATH:  './tests/stylesheets/',
        HTML_SRC_PATH:  '',
        HTML_DEST_PATH: '',
        LESS_SRC_PATH:  './tests/stylesheets/**/*.less',
        LESS_DEST_PATH: './tests/stylesheets/',
        IMG_SRC_PATH:   './tests/images/images_src/**/' + IMG_FILE_TYPES,
        IMG_DEST_PATH:  './tests/images/images_target',
        JS_SRC_PATH:    '',
        JS_DEST_PATH:   '',
        SASS_SRC_PATH:  './tests/stylesheets/**/*.scss',
        SASS_DEST_PATH: './tests/stylesheets/'
    }
};

///------------------------------------------------
/// Tasks:
///------------------------------------------------

/**
 * Responsive Images
 */
gulp.task('responsive-images', function () {
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
 * Compile/process Sass
 */
gulp.task('sass', function () {
    gulp.src(CONFIG.PATHS.SASS_SRC_PATH)
        .pipe(gulpPlumber())

        // only process changed files:
        .pipe(gulpChanged(CONFIG.PATHS.SASS_SRC_PATH))

        // compile SASS:
        .pipe(gulpSass({
                outputStyle: 'expanded'             // specifies formatting of CSS output (see github.com/sass/node-sass#outputstyle)
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

        // comb CSS:
        .pipe(gulpCssComb(CONFIG.PATHS.CSS_COMB_JSON))

        // destination output:
        .pipe(gulp.dest(CONFIG.PATHS.SASS_DEST_PATH));
});


/**
 * Compile/process Less
 */
gulp.task('less', function () {
    gulp.src(CONFIG.PATHS.LESS_SRC_PATH)
        .pipe(gulpPlumber())

        // only process changed files:
        .pipe(gulpChanged(CONFIG.PATHS.LESS_SRC_PATH))

        // compile LESS:
        .pipe(gulpLess({ /* TODO: add LESS plugins and options */ }))

        // comb CSS:
        .pipe(gulpCssComb(CONFIG.PATHS.CSS_COMB_JSON))

        // destination output:
        .pipe(gulp.dest(CONFIG.PATHS.LESS_DEST_PATH));
});


/**
 * Watcher
 *
 * TODO: add your tasks to here
 */
gulp.task('watch', function() {
    gulp.watch(CONFIG.PATHS.SASS_SRC_PATH, ['sass']);
    gulp.watch(CONFIG.PATHS.LESS_SRC_PATH, ['less']);
});


/// default task:
gulp.task('default', ['sass', 'less', 'watch']);
