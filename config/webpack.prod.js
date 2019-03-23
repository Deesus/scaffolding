const path                      = require('path');
const webpack                   = require('webpack');
const HTMLWebpackPlugin         = require('html-webpack-plugin');
const VueLoaderPlugin           = require('vue-loader/lib/plugin');
const MiniCSSExtractPlugin      = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const BabelMinifyPlugin         = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin        = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
    entry: {
        // this is the same as `import` statements in `main.js`:
        // n.b. order matters (e.g. web entry needs to be loaded last):
        main: [
            './src/main.js'
        ]
    },


    mode: 'production',

    // name of file(s) after webpack process and outputs:
    output: {
        filename:   '[name]-bundle.js',                     // the `[name]` string interpolates the name in the entry object (so this will become `main-bundle.js`)
        path:       path.resolve(process.cwd(), 'dist'),    // all of our files will end up in `dist/`
        publicPath: '/'                                     // n.b. we can set this to other locations, like `/js`
    },


    module: {
        // rules that webpack uses when it encounters various file types:
        rules: [
            // ---------- Vue: ----------
            // see <https://vue-loader.vuejs.org/options.html>
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            // ---------- JS: ----------
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        // n.b. everything inside `options` is exactly the same as `.babelrc` options:
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            browsers: ["> 1%", "last 2 versions", "not ie <= 10"]
                                        },
                                        debug: false
                                    }
                                ]
                            ],

                            plugins: [
                                "@babel/plugin-transform-runtime"
                            ]
                        }
                    }
                ]
            },

            // ---------- Sass: ----------
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },

            // ---------- CSS: ----------
            {
                test: /\.css$/,

                // specify loaders:
                use: [
                    MiniCSSExtractPlugin.loader,
                    // 'style-loader',         // style-loader is responsible for injecting the css into the html // TODO: test style-loader vs traditional .css
                    'css-loader'
                ]
            },

            // ---------- HTML: ----------
            {
                // n.b. the `html-webpack-plugin` does the same thing as the `file-loader` and `extract-loader`; thus, we don't use them here:
                test: /\.html$/,
                loader: 'html-loader'
            },

            // ---------- Files: ----------
            // handles images, fonts, and urls in stylesheets (e.g. the CSS `background` property):
            {
                test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
                loader: 'file-loader'
            },
        ]
    },


    resolve: {
        // see <https://vuejs.org/v2/guide/installation.html#Webpack>
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@':    path.resolve(process.cwd(), 'src')
        }
    },


    // n.b. loaders apply a task one-at-a-time while plugins apply to all files:
    plugins: [
        new CleanWebpackPlugin(),   // cleans `output.path` directory (`dist/` folder) before every prod build
        new OptimizeCssAssetsPlugin(),
        new MiniCSSExtractPlugin(),
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: './src/public/index.html',    // n.b. this can be `.html`, `.ejs`, etc.
            inject:   true,
        }),
        new BabelMinifyPlugin()
    ]
};


if (isProduction) {
    console.log('Building and Optimizing Files...');
}
