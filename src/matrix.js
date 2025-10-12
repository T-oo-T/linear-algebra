function is_square(A) {
  return A.length === A[0].length
}

function is_identity(A) {
  if (!is_square(A)) {
    return false
  }

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      if (i === j && A[i][j] !== 1 ||
          i !== j && A[i][j] !== 0 ) {
            return false
          }
    }
  }

  return true
}

function det2x2(A) {
  let [[a, b], [c, d]] = A
  return a*d - b*c
}

function det(A) {
  if (!is_square(A)) {
    throw new Error(`Expected square matrix, but got dimensions [${A.length}, ${A[0].length}].`)
  }

  // determinant of 1x1 matrix is the number itself
  if (A.length === 1) {
    return A[0][0]
  }

  if (A.length === 2) {
    return det2x2(A)
  }

  let [_, ...rows] = A
  let sum = 0
  
  for (let i = 0; i < A.length; i++) {
    let coefficient = A[0][i]
    let submatrix = rows.map(row => row.filter((_,cellIdx) => cellIdx !== i))
    sum += Math.pow(-1, i) * coefficient * det(submatrix)
  }

  return sum
}

function is_invertable(A) {
  return det(A) !== 0
}

function transpose(A) {
  let B = structuredClone(A)

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      B[i][j] = A[j][i]
    }
  }

  return B
}

function dot(u, v) {
  if (u.length !== v.length) {
    throw new Error(`Incompatible vector size: ${u.length} and ${v.length}`)
  }
  
  let sum = 0
  for (let i = 0; i < u.length; i++) {
    sum += u[i] * v[i]
  }

  return sum
}

function matmul(A, B) {
  if (A[0].length !== B.length) {
    throw new Error(`Incompatible matrix sizes: [${A.length}][${A[0].length}] and [${B.length}][${B[0].length}]`)
  }

  let output = []
  const BT = transpose(B)

  for (let i = 0; i < A.length; i++) {
    output.push(dot(A[i], BT[i]))
  }

  console.log(`output: ${output}, ${typeof output}`)
  return output
}

module.exports = {
    det,
    is_square,
    is_identity,
    is_invertable,
    matmul,
    transpose,
    dot
}