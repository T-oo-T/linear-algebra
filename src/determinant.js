function det2x2(A) {
  let [[a, b], [c, d]] = A
  return a*d - b*c
}

function det(A) {
  if (A.length !== A[0].length) {
    throw new Error(`Expected square matrix, but got dimensions [${A.length}, ${A[0].length}].`)
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

module.exports = {
    det
}