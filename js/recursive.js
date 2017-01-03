'use strict';

//Substitute for tail recursion. Though supported in Ecma6, tail recursion
//is not implemented in V8.
//
//Advantage: the declarative call to recurse is a guarantee that the call
//will not stack and be vulnerable to overflow.
const restackUncurried = function (callback, finalArgs) {
        return () => {
            return callback.apply(null, finalArgs);
        };
    },
    recursive = function (target) {
        const restack = function () {
            return restackUncurried(target, Array.from(arguments).concat([restack]));
        };

        return function () {
            let callback = () => restack.apply(null, Array.from(arguments));

            do {
                const result = callback();

                if (typeof result === 'function') {
                    callback = result;
                } else {
                    return result;
                }
            } while (true);
        };
    };

module.exports = recursive;
