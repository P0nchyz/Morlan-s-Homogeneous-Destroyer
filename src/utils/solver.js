function getCharEquations(coefficients) {
  coefficients = coefficients.map((e) => (e === '' ? 1 : e))
  const roots = getRoots(coefficients)
  if (!roots.isComplex) {
    return [
      roots.roots[0] == 0 ? '' : `e^{${roots.roots[0]}x}`,
      roots.roots.length == 2
        ? `e^{${roots.roots[1]}x}`
        : roots.roots[0] == 0
          ? 'x'
          : `xe^{${roots.roots[0]}x}`,
    ]
  } else {
    return [`\\cos{${roots.roots[0].real}x}`, `\\sin{${roots.roots[0].imaginary}x}`]
  }
}

function getRoots(coefficients) {
  let a = coefficients[0],
    b = coefficients[1],
    c = coefficients[2]
  let discriminant = Math.pow(b, 2) - 4 * a * c

  let returnRoots = {
    isComplex: false,
    roots: [],
  }

  if (discriminant > 0) {
    returnRoots.isComplex = false
    returnRoots.roots[0] = ((-b + Math.sqrt(discriminant)) / 2) * a
    returnRoots.roots[1] = ((-b - Math.sqrt(discriminant)) / 2) * a
  } else if (discriminant == 0) {
    returnRoots.isComplex = false
    returnRoots.roots[0] = (-b / 2) * a
  } else {
    returnRoots.isComplex = true
    returnRoots.roots[0] = {
      real: (-b / 2) * a,
      imaginary: (Math.sqrt(Math.abs(discriminant)) / 2) * a,
    }
  }
  return returnRoots
}

export { getCharEquations, getRoots }
