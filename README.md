# Scaffolding Projects with Gulp
###### Common tasks configured for Gulp

### Requirements:
- NodeJS/npm

### Quick start:
1. copy _Gulpfile_ and _package.json_ to your project
2. cd to project folder and install modules: `$ npm install`
3. set properties/options in the Gulpfile (`CONFIG` object)

### To Add:
1. Sass/Less
    - Future CSS
    - refine Css Comb options
2. Minification/concat:
    - gulp-uglify
    - gulp-minify-css
    - gulp-minify-html
    - gulp-concat
3. Browser Sync

### Wish list:
1. add time stamp to css, js files
2. convert .aspx comment delimiters (`<%--` `--%>`) to html comment delimiters (`<!--` `--!>`)

### Issues:
- Gulp doesn't pick up changes to .scss file unless watcher is running (.less works, though).

### License
Copyright © Dee Reddy. BSD-2 License.
