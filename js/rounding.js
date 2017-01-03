'use strict';

const recursive = require('./recursive'),
    roundTo = function (num, places) {
        const factor = Math.pow(10, places);

        return Math.round(factor * num) / factor;
    },
    rounder = function (num, tolerance) {
        const countPlaces = recursive((count, recurse) => {
                const testValue = Math.pow(10, -count);

                if (testValue <= tolerance) {
                    return count;
                }
                return recurse(count + 1);
            }),
            decimalPlaces = countPlaces(1);

        return roundTo(num, decimalPlaces);
    };

module.exports = {
    roundToPlaces:    roundTo,
    roundToTolerance: rounder
};
