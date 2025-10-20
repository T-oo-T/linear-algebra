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

function cross(u, v) {
  if (u.length !== 3 || v.length !== 3) {
    throw new Error(`Size of u and v must be 3, but got ${u.length} and ${v.length}`)
  }

  let sub_i = [
    [u[1], u[2]],
    [v[1], v[2]]
  ]
  let sub_j = [
    [u[0], u[2]],
    [v[0], v[2]]
  ]
  let sub_k = [
    [u[0], u[1]],
    [v[0], v[1]]
  ]
  return [
    +det(sub_i),
    -det(sub_j),
    +det(sub_k)
  ]
}

function dot(u, v) {
  if (u.length !== v.length) {
    throw new Error(`Incompatible vector sizes: ${u.length} and ${v.length}`)
  }
  
  let sum = 0
  for (let i = 0; i < u.length; i++) {
    sum += u[i] * v[i]
  }

  return sum
}

function matrix(i,j) {
  return Array.from(new Array(i), () => new Array(j).fill(0))
}

function matmul(A, B) {
  if (A[0].length !== B.length) {
    throw new Error(`Incompatible matrix sizes: [${A.length}][${A[0].length}] and [${B.length}][${B[0].length}]`)
  }

  let output = matrix(A.length, B[0].length)
  const BT = transpose(B)

  for (let i = 0; i < output.length; i++) {
    for (let j = 0; j < output[i].length; j++) {
      output[i][j] = dot(A[i], BT[j])
    }
  }

  return output
}

function swap_rows(A, a_row_index, b_row_index) {
  for (let i = 0; i < A[a_row_index].length; i++) {
    let temp = A[b_row_index]
    A[b_row_index] = A[a_row_index]
    A[a_row_index] = temp
  }
  return A
}

function scale_row(A, row_index, scalar) {
  if (scalar === 0) {
    throw new Error("Cannot scale by zero!")
  }
  for (let i = 0; i < A[row_index].length; i++) {
    A[row_index][i] *= scalar
  }
  return A
}

function sum_rows(A, dst_row_index, src_row_index, scalar) {
  for (let i = 0; i < A[dst_row_index].length; i++) {
    A[dst_row_index][i] += scalar * A[src_row_index][i]
  }
  
  return A
}

function rref(A) {
  for (let i = 0; i < A.length; i++) {
    // TODO: handle case when A[i][i] == 0
    scale_row(A, i, 1/A[i][i])
  
    // zero out all rows below this diagonal cell
    for (let j = i+1; j < A.length; j++) {
      let sign = -Math.sign(A[i][i]) * Math.sign(A[j][i])
      sum_rows(A, j, i, sign * Math.abs(A[j][i]))
    }

    // zero out all rows above this diagonal cell
    for (let j = i-1; j >= 0; j--) {
      let sign = -Math.sign(A[i][i]) * Math.sign(A[j][i])
      sum_rows(A, j, i, sign * Math.abs(A[j][i]))
    }
  }

  return A
}

function I(n) {
  let A = matrix(n, n)
  for (let i = 0; i < A.length; i++) {
    A[i][i] = 1
  }
  return A
}

function matrixConcat(A, B) {
  if (A.length !== B.length) {
    throw new Error(`Incompatible row sizes ${A.length} and ${B.length}`)
  }
  for (let i = 0; i < A.length; i++) {
    A[i] = A[i].concat(B[i])
  }
  return A
}

function inv(A) {
  return A
}

module.exports = {
    det,
    is_square,
    is_identity,
    is_invertable,
    matmul,
    transpose,
    dot,
    cross,
    swap_rows,
    sum_rows,
    scale_row,
    rref,
    inv,
    I,
    matrixConcat
}