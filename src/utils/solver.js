import { usePreferences } from './usePreferences'

const getCharacteristicEquation = (coefficients) => {
  coefficients = formatCoefficients(coefficients)
  let retString = ''
  let auxArray = []
  coefficients.reverse()
  coefficients.forEach((coefficient, pos) => {
    if (coefficient == 0) return
    if (pos == 0) auxArray.push(coefficient)
    else auxArray.push(coefficientString(coefficient) + 'r' + (pos == 1 ? '' : '^' + pos))
  })
  auxArray.reverse()
  retString = auxArray.join(' + ')
  return retString + ' = 0'
}

const getLinearSolutions = (coefficients) => {
  const iV = usePreferences().independentVariable.value
  coefficients = formatCoefficients(coefficients)
  const roots = getRoots(coefficients)
  const trimmedRoots = trimRoots(roots)

  if (!roots.isComplex) {
    return [
      expString(trimmedRoots[0]),
      trimmedRoots.length == 2 ? expString(trimmedRoots[1]) : iV + expString(trimmedRoots[0]),
    ]
  } else {
    return [cplxToCos(trimmedRoots), cplxToSin(trimmedRoots)]
  }
}

const getRoots = (coefficients) => {
  coefficients = formatCoefficients(coefficients)
  let a = coefficients[0],
    b = coefficients[1],
    c = coefficients[2]
  let discriminant = Math.pow(b, 2) - 4 * a * c

  let returnRoots = {
    isComplex: false,
    roots: [],
  }

  if (a === 0) {
    returnRoots.isComplex = false
    returnRoots.roots[0] = -c / b
    return returnRoots
  }

  if (discriminant > 0) {
    returnRoots.isComplex = false
    returnRoots.roots[0] = (-b + Math.sqrt(discriminant)) / (2 * a)
    returnRoots.roots[1] = (-b - Math.sqrt(discriminant)) / (2 * a)
  } else if (discriminant == 0) {
    returnRoots.isComplex = false
    returnRoots.roots[0] = -b / (2 * a)
  } else {
    returnRoots.isComplex = true
    returnRoots.roots[0] = {
      real: -b / (2 * a),
      imaginary: Math.abs(Math.sqrt(Math.abs(discriminant)) / (2 * a)),
    }
  }
  return returnRoots
}

const trimRoots = (roots) => {
  const { decimalPlaces } = usePreferences()
  const decimals = decimalPlaces.value
  if (!roots.isComplex) {
    return roots.roots.map((num) => Number(num.toFixed(decimals)))
  } else {
    return {
      real: Number(roots.roots[0].real.toFixed(decimals)),
      imaginary: Number(roots.roots[0].imaginary.toFixed(decimals)),
    }
  }
}

const expString = (number) => {
  const iV = usePreferences().independentVariable.value
  if (number == 0) {
    return ''
  } else {
    return `e^{${coefficientString(number)}${iV}}`
  }
}

const cplxToCos = (cplx) => {
  const iV = usePreferences().independentVariable.value
  return expString(cplx.real) + `\\cos{${coefficientString(cplx.imaginary)}${iV}}`
}

const cplxToSin = (cplx) => {
  const iV = usePreferences().independentVariable.value
  return expString(cplx.real) + `\\sin{${coefficientString(cplx.imaginary)}${iV}}`
}

const coefficientString = (coefficient) => {
  if (coefficient == 1) {
    return ''
  } else if (coefficient == -1) {
    return '-'
  } else {
    return coefficient.toString()
  }
}

const formatCoefficients = (coefficients) => coefficients.map((e) => (e === '' ? 1 : e))

export { getCharacteristicEquation, getLinearSolutions, coefficientString, getRoots, trimRoots }
