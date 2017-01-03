'use strict';

const rounding = require('../js/rounding');

module.exports = {
    beforeTest: t => {
        return t.createContext('rounding', 'rounding');
    },

    tests: {
        'rounding to places': context => {
            context.equal(rounding.roundToPlaces(10.12345, 3).toString(), '10.123', 'should round to 3 places');
            context.equal(rounding.roundToPlaces(5.998, 0).toString(), '6', 'should round to 0 places');
        },
        'rounding to tolerance': context => {
            context.equal(rounding.roundToTolerance(5.888, 0.1).toString(), '5.9', 'should round to 0.1 tolerance');
            context.equal(rounding.roundToTolerance(100.2112, 0.001).toString(), '100.211', 'should round to 0.001 tolerance');
        }
    }
};
