#!/bin/bash


# ------------------------------------------
# create directories:
mkdir dist src docs


# ------------------------------------------
# create documentation files:
cat <<EOF > docs/CHANGELOG.md
EOF

cat <<EOF > docs/ISSUES.md
EOF

cat <<EOF > README.md
# TODO: APP_NAME
###### TODO: APP_DESCRIPTION

### Requirements:

### Quickstart:

### Requirements:
- git
- NodeJS
- npm

### TODO:
+ [ ] update package.json (name of application, etc.)
+ [ ] set global properties/options in the Gulpfile (e.g. `CONFIG` object, file paths, etc.)
    + [ ] remove completed TODOs from Gulpfile
+ [ ] update settings in cssComb.json if needed
+ [ ] update this README.md with relevant info (app name, license, etc.)
+ [ ] change LICENSE if needed

### License:
Copyright © Dee Reddy. BSD-2 License.

EOF

cat <<EOF > LICENSE
BSD 2-Clause License

Copyright (c) 2017, Dee Reddy
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
EOF


# ------------------------------------------
# create core file:

cat <<EOF > .gitignore
# unversioned local files:
local/
local.*

# IDEs:
.idea/

# libraries:
node_modules/

# cached files:
.sass-cache/
*.pyc
.ipynb_checkpoints/

# misc:
*.css.map
setup.sh

EOF

cat<<EOF > package.json
{
  "name": "scaffolding",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {
    "concurrent-transform": "^1.0.0",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^4.0.0",
    "gulp-changed": "^2.0.0",
    "gulp-csscomb": "^3.0.8",
    "gulp-image-resize": "^0.12.0",
    "gulp-plumber": "^1.1.0",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^3.1.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Dee Reddy",
  "license": "BSD-2-Clause"
}

EOF

cat <<EOF > cssComb.json
{
  "exclude": [
    ".git/**",
    "node_modules/**",
    "bower_components/**"
  ],
  "always-semicolon": true,
  "block-indent": "  ",
  "color-case": "lower",
  "color-shorthand": true,
  "element-case": "lower",
  "eof-newline": true,
  "leading-zero": false,
  "quotes": "single",
  "remove-empty-rulesets": true,
  "space-after-colon": " ",
  "space-after-combinator": " ",
  "space-after-opening-brace": "\n",
  "space-after-selector-delimiter": "\n",
  "space-before-closing-brace": "\n",
  "space-before-colon": "",
  "space-before-combinator": " ",
  "space-before-opening-brace": "\n",
  "space-before-selector-delimiter": "",
  "strip-spaces": true,
  "unitless-zero": true,
  "vendor-prefix-align": true
}

EOF

cat <<EOF > Gulpfile.js
'use strict';
///////////////////////////////////////////////////
///
/// Author: Dee Reddy
/// Created: 02-16-2017
/// Last updated: 06-06-2017
///
///////////////////////////////////////////////////

/// TODO: gulp sass doesn't pick up changes unless watcher is running

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

    /// To compile .css files files into the same location as .scss files,
    /// set dest path to same parent folder as src folder (i.e. everything before '**/*.scss').
    PATHS: {
	/// TODO: set paths to your project folders:
        CSS_COMB_JSON:  './cssComb.json',
        CSS_SRC_PATH:   './local/stylesheets/**/*.css',
        CSS_DEST_PATH:  './local/stylesheets/',
        HTML_SRC_PATH:  '',
        HTML_DEST_PATH: '',
        IMG_SRC_PATH:   './local/images/images_src/**/' + IMG_FILE_TYPES,
        IMG_DEST_PATH:  './local/images/images_target',
        JS_SRC_PATH:    '',
        JS_DEST_PATH:   '',
        SASS_SRC_PATH:  './local/stylesheets/**/*.scss',
        SASS_DEST_PATH: './local/stylesheets/'
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
 * Watcher
 *
 * TODO: add your tasks to here
 */
gulp.task('watch', function() {
    gulp.watch(CONFIG.PATHS.SASS_SRC_PATH, ['sass']);
});


/// default task:
gulp.task('default', ['sass', 'watch']);

EOF


# ------------------------------------------
# install packages:
npm install


# ------------------------------------------
# clean up:

# start fresh version control:
git init
git add .
git commit -am "Initial commit."
