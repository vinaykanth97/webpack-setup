const {Sum} = require('../src/js/sum')

test('Adds two numbers', () => {
    expect(Sum(1, 2)).toEqual(3);
});