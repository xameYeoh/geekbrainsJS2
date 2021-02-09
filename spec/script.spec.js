const script = require('../calcBDD/calcBDD');
const sum = script.sum;
const mul = script.mul;
const divide = script.divide;
const sub = script.sub;

const a = Math.floor(Math.random() * 10);
const b = Math.floor(Math.random() * 10);
const str = "string";
console.log(a, b);
const resSum = a + b;
const resStrSumA = a + str;
const resStrSumB = str + b;

const resMul = a * b;
const resDivide = a / b;
const resSub = a - b;

console.log(resSum);



describe('Функция sum()', () => {
    it('должна возвращать resSum при аргументах (a,b)', () => {
        expect(sum(a, b)).toBe(resSum);
    })

    it('должна возвращать null при аргументах (null, b)', () => {
        expect(sum(null, b)).toBe(b);
    })

    it('должна возвращать null при аргументах (a, null)', () => {
        expect(sum(a, null)).toBe(a);
    })

    it('должна возвращать null при аргументах (null, null)', () => {
        expect(sum(null, null)).toBe(0);
    })

    it('должна возвращать строку + null при аргументах (str, null)', () => {
        expect(sum(str, null)).toBe(str + null);
    })

    it('должна возвращать null + строку  при аргументах (null, str)', () => {
        expect(sum(null, str)).toBe(null + str);
    })

    it('должна возвращать undefined при аргументах (undefined, b)', () => {
        expect(sum(undefined, b)).toBeNaN();
    })

    it('должна возвращать undefined при аргументах (a, undefined)', () => {
        expect(sum(a, undefined)).toBeNaN();
    })

    it('должна возвращать undefined при аргументах (undefined, undefined)', () => {
        expect(sum(undefined, undefined)).toBeNaN();
    })

    it('должна возвращать строку + undefined при аргументах (str, undefined)', () => {
        expect(sum(str, undefined)).toBe(str + undefined);
    })

    it('должна возвращать undefined + строку  при аргументах (undefined, str)', () => {
        expect(sum(undefined, str)).toBe(undefined + str);
    })


    it('должна возвращать a + строку  при аргументах (a, str)', () => {
        expect(sum(a, str)).toBe(resStrSumA);
    })

    it('должна возвращать строку + b  при аргументах (str, b)', () => {
        expect(sum(str, b)).toBe(resStrSumB);
    })


});

describe('Функция mul()', () => {
    it('должна возвращать resMul при аргументах (a,b)', () => {
        expect(mul(a, b)).toBe(resMul);
    })

    it('должна возвращать 0 при аргументах (null, b)', () => {
        expect(mul(null, b)).toBe(0);
    })

    it('должна возвращать 0 при аргументах (a, null)', () => {
        expect(mul(a, null)).toBe(0);
    })

    it('должна возвращать 0 при аргументах (null, null)', () => {
        expect(mul(null, null)).toBe(0);
    })

    it('должна возвращать 0 при аргументах (str, null)', () => {
        expect(mul(str, null)).toBe(0);
    })

    it('должна возвращать 0  при аргументах (null, str)', () => {
        expect(mul(null, str)).toBe(0) || expect(mul(null, str)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (undefined, b)', () => {
        expect(mul(undefined, b)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (a, undefined)', () => {
        expect(mul(a, undefined)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (undefined, undefined)', () => {
        expect(mul(undefined, undefined)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (str, undefined)', () => {
        expect(mul(str, undefined)).toBeNaN();
    })

    it('должна возвращать NaN  при аргументах (undefined, str)', () => {
        expect(mul(undefined, str)).toBeNaN();
    })


    it('должна возвращать a * строку  при аргументах (a, str)', () => {
        expect(mul(a, str)).toBe(a * str);
    })

    it('должна возвращать строку * b  при аргументах (str, b)', () => {
        expect(mul(str, b)).toBe(str * b);
    })


});
describe('Функция divide()', () => {
    it('должна возвращать res при аргументах (a,b)', () => {
        expect(divide(a, b)).toBe(resDivide);
    })

    it('должна возвращать null при аргументах (null, b)', () => {
        expect(divide(null, b)).toBe(0);
    })

    it('должна возвращать null при аргументах (a, null)', () => {
        expect(divide(a, null)).toBePositiveInfinity || expect(divide(a, null)).toBeNegativeInfinity;
    })

    it('должна возвращать null при аргументах (null, null)', () => {
        expect(divide(null, null)).toBeNaN();
    })

    it('должна возвращать строку / null при аргументах (str, null)', () => {
        expect(divide(str, null)).toBe(str / null);
    })

    it('должна возвращать null + строку  при аргументах (null, str)', () => {
        expect(divide(null, str)).toBe(null / str);
    })

    it('должна возвращать NaN при аргументах (undefined, b)', () => {
        expect(divide(undefined, b)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (a, undefined)', () => {
        expect(divide(a, undefined)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (undefined, undefined)', () => {
        expect(divide(undefined, undefined)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (str, undefined)', () => {
        expect(divide(str, undefined)).toBeNaN();
    })

    it('должна возвращать NaN  при аргументах (undefined, str)', () => {
        expect(divide(undefined, str)).toBeNaN();
    })


    it('должна возвращать a / строку  при аргументах (a, str)', () => {
        expect(divide(a, str)).toBe(a / str);
    })

    it('должна возвращать строку / b  при аргументах (str, b)', () => {
        expect(divide(str, b)).toBe(str / b);
    })


});

describe('Функция sub()', () => {
    it('должна возвращать res при аргументах (a,b)', () => {
        expect(sub(a, b)).toBe(resSub);
    })

    it('должна возвращать -b при аргументах (null, b)', () => {
        expect(sub(null, b)).toBe(-b);
    })

    it('должна возвращать a при аргументах (a, null)', () => {
        expect(sub(a, null)).toBe(a);
    })

    it('должна возвращать 0 при аргументах (null, null)', () => {
        expect(sub(null, null)).toBeNaN(0);
    })

    it('должна возвращать число str при аргументах (str, null)', () => {
        expect(sub(str, null)).toBe(+str);
    })

    it('должна возвращать null - строку  при аргументах (null, str)', () => {
        expect(sub(null, str)).toBe(null - str);
    })

    it('должна возвращать NaN при аргументах (undefined, b)', () => {
        expect(sub(undefined, b)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (a, undefined)', () => {
        expect(sub(a, undefined)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (undefined, undefined)', () => {
        expect(sub(undefined, undefined)).toBeNaN();
    })

    it('должна возвращать NaN при аргументах (str, undefined)', () => {
        expect(sub(str, undefined)).toBeNaN();
    })

    it('должна возвращать NaN  при аргументах (undefined, str)', () => {
        expect(sub(undefined, str)).toBeNaN();
    })


    it('должна возвращать a - строку  при аргументах (a, str)', () => {
        expect(sub(a, str)).toBe(a - str);
    })

    it('должна возвращать строку - b  при аргументах (str, b)', () => {
        expect(sub(str, b)).toBe(str - b);
    })


});