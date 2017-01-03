'use strict';

const newtonsMethod = require('./newton'),
    powerOf = (x, n) => {
        const callback = (depth, xn) => {
            if (depth === n) {
                return xn;
            }

            return callback(depth + 1, xn * x)
        };

        return callback(1, x);
    },
    createZeroFunc = power => (s, xn) => powerOf(xn, power) - s,
    createDerivative = power => xn => power * xn,
    createEstimator = power => s => s / power,
    nthRoot = function (power, value, tolerance) {
        return newtonsMethod(value, tolerance,
            createZeroFunc(power), createDerivative(power), createEstimator(power));
    };

module.exports = nthRoot;

// console.log(nthRoot(4, 16, 0.0000001));
// console.log(nthRoot(2, 16, 0.0000001));
//console.log(nthRoot(3, 27, 0.0001));
