'use strict';

const
    rounding = require('./rounding'),
    recursive = require('./recursive'),
    isPositive = (num) => num >= 0,
    makeIterator = (x0, x1, z0, z1, zeroFunc) => {
        const positiveBias = isPositive(z1),
            increment = (x1 - x0) / 100 * (positiveBias ? -1.0 : 1.0);

        return {
            done: xn => isPositive(zeroFunc(xn)) !== positiveBias,
            next: xn => xn + increment
        };
    },
    convergeBack = (x0, x1, z0, z1, zeroFunc) => {
        const iterator = makeIterator(x0, x1, z0, z1, zeroFunc),
            converge = recursive((xn, recurse) => {
            console.log(xn)
                if (iterator.done(xn)) {
                    return xn;
                }

                return recurse(iterator.next(xn));
            });

        return converge(x1);
    },
    correct = (x0, x1, zeroFunc, derivative) => {
        const z0 = zeroFunc(x0),
            z1 = zeroFunc(x1);

        //Closing toward zero?
        if (Math.abs(z1) < Math.abs(z0)) {
            return x1;
        } else if((z0 > 0 && z1 < 0) || (z0 < 0 && z1 > 0)) {
            //When we cross the zero boundary in either direction, the solution is
            //isolated. We can converge toward zero and then go back to newton's method.
            return convergeBack(x0, x1, z0, z1, zeroFunc);
        } else {
            const rateOfChange = Math.min(1 / derivative(x0), x0 / 2),
                needsIncrease = z0 < 0;

            return needsIncrease ? x0 + rateOfChange : x0 - rateOfChange;
        }
    },
    calc = function (value, tolerance, zeroFunc, derivative, estimateInitialValue) {
        //let x = 0;
        const initialValue = estimateInitialValue(value),
            calculate = recursive((xn, recurse) => {
                const zeroConverge = Math.abs(zeroFunc(value, xn));

                //console.log(xn, zeroConverge)
                if (zeroConverge <= tolerance) {
                    return xn;
                }

                const iterativeValue = xn - zeroFunc(value, xn) / derivative(xn),
                    adjusted = Math.abs(correct(xn, iterativeValue, v => zeroFunc(value, v), derivative));

                console.log(`xn=${xn}  next=${iterativeValue}`)
                return recurse(adjusted);
            });

        return rounding.roundToTolerance(calculate(initialValue), tolerance);
    };

module.exports = calc;
