import { usePreferences } from './usePreferences'

const getCharEquations = (coefficients) => {
  const { decimalPlaces } = usePreferences()
  const decimals = decimalPlaces.value

  coefficients = coefficients.map((e) => (e === '' ? 1 : e))
  const roots = getRoots(coefficients)

  if (!roots.isComplex) {
    let trimmedRoots = roots.roots.map((num) => Number(num.toFixed(decimals)))
    return [
      expString(trimmedRoots[0]),
      trimmedRoots.length == 2 ? expString(trimmedRoots[1]) : 'x' + expString(trimmedRoots[0]),
    ]
  } else {
    let trimmedRoot = {
      real: Number(roots.roots[0].real.toFixed(decimals)),
      imaginary: Number(roots.roots[0].imaginary.toFixed(decimals)),
    }
    return [cplxToCos(trimmedRoot), cplxToSin(trimmedRoot)]
  }
}

const getRoots = (coefficients) => {
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

const expString = (number) => {
  if (number == 0) {
    return ''
  } else if (number == 1) {
    return 'e^{x}'
  } else {
    return `e^{${number}x}`
  }
}

const cplxToCos = (cplx) => {
  return expString(cplx.real) + `\\cos{${cplx.imaginary}x}`
}

const cplxToSin = (cplx) => {
  return expString(cplx.real) + `\\sin{${cplx.imaginary}x}`
}

export { getCharEquations, getRoots }
