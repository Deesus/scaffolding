/**
 * Jest Configuration
 *
 * See <https://jestjs.io/docs/en/configuration> for more info/options.
 **/

module.exports = {
    // file extensions our modules use:
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    // Jest only runs test scripts that are in `__tests__` folders and whose file name end in `.spec.js`:
    testMatch: [
        '**/__tests__/*.spec.(js|ts)'
    ],

    // for Jest, we need to transform ES6+ (via Babel), transform `.vue` files, etc.:
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'      // creates alias for `@` to point to `/src` folder
    },

    // list of snapshot testing plugins:
    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    // coverage reporting:
    collectCoverage: 		    true,
    collectCoverageFrom: 	    ["src/**/*.(js|vue)"],
    coveragePathIgnorePatterns: ["src/plugins", "node_modules"],
    coverageReporters: 		    ["text", "html"]
};
