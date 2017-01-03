'use strict';

const nthroot = require('../js/nthroot');

module.exports = {
    beforeTest: t => {
        return t.createContext('nthroot', 'root calcs using Newton\'s method');
    },

    tests: {
        'root calculations': context => {
            context.equal(nthroot(2, 64, 0.0001), 8, 'square root of 64');
            //context.equal(nthroot(3, 27, 0.0001), 3, 'cube root of 3');
            context.equal(nthroot(4, 256, 0.0001), 4, '4th root of 256');
        }
    }
};
