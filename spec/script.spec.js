const script = require('../calcBDD/calcBDD');
const sum = script.sum;
const mul = script.mul;
const divide = script.divide;
const sub = script.sub;

const a = Math.random() * 10;
const b = Math.random() * 10;
const str = "string";
console.log(a, b);
const resSum = a + b;
const resStrSumA = a + str;
const resStrSumB = str + b;

console.log(resSum);



describe('Функция sum()', () => {
    it('должна возвращать res при аргументах (a,b)', () => {
        expect(sum(a, b)).toBe(resSum);
    })

    it('должна возвращать null при аргументах (null, b)', () => {
        expect(sum(null, b)).toBeNull();
    })

    it('должна возвращать null при аргументах (a, null)', () => {
        expect(sum(a, null)).toBeNull();
    })

    it('должна возвращать null при аргументах (null, null)', () => {
        expect(sum(null, null)).toBeNull();
    })

    it('должна возвращать строку + null при аргументах (str, null)', () => {
        expect(sum(str, null)).toBe(str + null);
    })

    it('должна возвращать null + строку  при аргументах (null, str)', () => {
        expect(sum(null, str)).toBe(null + str);
    })

    it('должна возвращать a + строку  при аргументах (a, str)', () => {
        expect(sum(a, str)).toBe(resStrSumA);
    })

    it('должна возвращать строку + b  при аргументах (str, b)', () => {
        expect(sum(str, b)).toBe(resStrSumB);
    })


});