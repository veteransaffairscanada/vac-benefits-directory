
const sum = require('../components/sum');

describe('With Enzyme', () => {
    it('sum', () => {
        expect(sum(1, 2)).toBe(3);
    })
})

