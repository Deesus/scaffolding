'use strict';

// Set constants as object properties inside `constants`:
//
// example:
// MY_CONSTANT: 'foo',
// OTHER_CONST: 'bar
//
let constants = {

};

// n.b. freeze prevents changes by users:
module.exports = Object.freeze(constants);
