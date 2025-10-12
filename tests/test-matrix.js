const { test } = require("node:test")
const assert = require("assert").strict
const { det, is_identity, is_square, is_invertable, matmul } = require("../src/matrix")

const I_1 = [[1]]
const I_2 = [[1,0], [0,1]]
const I_3 = [[1,0,0], [0,1,0], [0,0,1]]

test('simple 1x1 determinant', () => {
    assert.strictEqual(det([[7]]), 7)
    assert.strictEqual(det([[-15]]), -15)
});

test('simple 2x2 determinant', () => {
    assert.strictEqual(det([[1,2],[3,4]]), -2)
});

test('3x3 determinant', () => {
    assert.strictEqual(det([[1,2,3],[4,5,6],[7,8,9]]), 0)
    assert.strictEqual(det([[1,5,3],[4,8,6],[7,8,9]]), -18)
    assert.strictEqual(det([
        [0,1,0],
        [1,0,0],
        [0,0,1]
    ]), -1)
    assert.strictEqual(det([
        [1,0,0],
        [0,5,0],
        [0,0,1]
    ]), 5)
    assert.strictEqual(det([
        [1,0,0],
        [0,0,1],
        [0,5,0]
    ]), -5)
    // linearly dependent
    assert.strictEqual(det([
        [1,1,1],
        [2,2,2],
        [33,85,991]
    ]), 0)
});

test('4x4 determinant', () => {
    assert.strictEqual(det([[1,5,3,7],[4,8,6,2],[7,8,9,5],[5,2,8,6]]), 408)
});

test("identity matrix determinants", () => {
    assert.strictEqual(det(I_1), 1)
    assert.strictEqual(det(I_2), 1)
    assert.strictEqual(det(I_3), 1)
})

test("determinant laws", () => {
    // |AB| = |A|*|B|
    assert.strictEqual(
        det(matmul(I_1,I_1)),
        det(I_1)*det(I_1)
    )
    assert.strictEqual(
        det(matmul(I_2,I_2)),
        det(I_2)*det(I_2)
    )
    assert.strictEqual(
        det(matmul(I_3,I_3)),
        det(I_3)*det(I_3)
    )
    const A = [
        [1,2,3],
        [3,5,6],
        [3,2,1]
    ] // det -4
    const B = [
        [7,2,3],
        [-3,5,6],
        [4,2,1]
    ] // -73
    // -4 * -73  = 292
    assert.strictEqual(
        det(matmul(A,B)),
        det(A)*det(B)
    )
})

test("is_square", () => {
    assert.strictEqual(is_square([1]), false)
    assert.strictEqual(is_square([[1]]), true)
    assert.strictEqual(is_square([[1,1],[2,2]]), true)
    assert.strictEqual(is_square([[1,1],[2,2],[3,3]]), false)
})

test("is_identity", () => {
    assert.strictEqual(is_identity([1]), false)
    assert.strictEqual(is_identity([2]), false)
    assert.strictEqual(is_identity(I_1), true)
    assert.strictEqual(is_identity(I_2), true)
    assert.strictEqual(is_identity(I_3), true)
    assert.strictEqual(is_identity([[1,1],[2,2],[3,3]]), false)
})


test("is_invertable", () => {
    assert.strictEqual(is_invertable(I_1), true)
    assert.strictEqual(is_invertable(I_2), true)
    assert.strictEqual(is_invertable(I_3), true)
    
    assert.strictEqual(
        is_invertable([
            [1,1],
            [1,2]
        ]), 
        true
    )
    assert.strictEqual(
        is_invertable([
            [1,1],
            [1,1]
        ]), 
        false
    )
})