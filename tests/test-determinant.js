const { test } = require("node:test")
const assert = require("assert").strict
const { det } = require("../determinant")

test('simple 2x2 determinant', () => {
    assert.strictEqual(det([[1,2],[3,4]]), -2)
});

test('3x3 determinant', () => {
    assert.strictEqual(det([[1,2,3],[4,5,6],[7,8,9]]), 0)
    assert.strictEqual(det([[1,5,3],[4,8,6],[7,8,9]]), -18)
});

test('4x4 determinant', () => {
    assert.strictEqual(det([[1,5,3,7],[4,8,6,2],[7,8,9,5],[5,2,8,6]]), 408)
});
