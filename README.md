# Project Scaffolding with Gulp
###### Scaffold your web project

- sets up CSS preprocessor, watcher, plugins
- TODO: set up directories

### Requirements:
- git
- NodeJS
- npm

### Quick start:
1. run `setup.sh`
2. see generated `README` to list of TODO items
3. update attributes and settings for your project
3. set global properties/options in the Gulpfile (`CONFIG` object)

### TODO:
1. Browser Sync
2. Sass/Less
    - CSS next (?)
    - refine CSS Comb options
3. minification/concat:
    - gulp-uglify
    - gulp-minify-css
    - gulp-minify-html
    - gulp-concat
4. set up directories

### Wish list:
1. add time stamp to css, js files
2. convert .aspx comment delimiters (`<%--` `--%>`) to html comment delimiters (`<!--` `--!>`)

### Issues:
- Gulp doesn't pick up changes to .scss file unless watcher is running when changes are made (.less always works, though).

### License
Copyright © Dee Reddy. BSD-2 License.
