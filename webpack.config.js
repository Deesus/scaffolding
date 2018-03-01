'use strict';

// imports:
const path      = require('path');
const webpack   = require('webpack');

// constants:
const SRC_DIR   = path.resolve(__dirname, 'src');
const DIST_DIR  = path.resolve(__dirname, 'dist');


// exports:
module.exports = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: DIST_DIR,
        filename: 'bundle.js'
    },
    stats: {
        colors: true
    },
};
