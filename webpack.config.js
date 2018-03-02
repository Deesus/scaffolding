'use strict';

// imports:
const path    = require('path');
const webpack = require('webpack');

// constants:
const SRC_DIR    = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');


// exports:
module.exports = {
    entry: [SRC_DIR],

    output: {
        path: OUTPUT_DIR,
        filename: 'bundle.js'
    },

    // debug: true,

    module: {
        // n.b. the "rules" property was known as "loaders" in previous versions of Webpack
        rules: [
            // Babel ES6:
            {
                loader: 'babel-loader',

                // skip any files outside of the 'src' directory:
                include: [SRC_DIR],

                // only run .js files through babel:
                test: /\.js$/,

                // exclude `/node_modules` folder:
                exclude: /node_modules/,

                // Babel config options:
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
};
