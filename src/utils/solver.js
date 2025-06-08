import { usePreferences } from './usePreferences'

const getCharEquations = (coefficients) => {
  const { decimalPlaces } = usePreferences()
  const decimals = decimalPlaces.value

  coefficients = coefficients.map((e) => (e === '' ? 1 : e))
  const roots = getRoots(coefficients)
  console.log(roots);
  

  if (!roots.isComplex) {
    let trimmedRoots = roots.roots.map(num => Number(num.toFixed(decimals)))
    return [
      roots.roots[0] == 0 ? '' : `e^{${trimmedRoots[0]}x}`,
      roots.roots.length == 2
        ? `e^{${trimmedRoots[1]}x}`
        : trimmedRoots[0] == 0
          ? 'x'
          : `xe^{${trimmedRoots[0]}x}`,
    ]
  } else {
    let trimmedRoots = roots.roots.map((cplx) => {
      return {
        real: Number(cplx.real.toFixed(decimals)),
        imaginary: Number(cplx.imaginary.toFixed(decimals)),
      }
    })
    return [`\\cos{${trimmedRoots[0].real}x}`, `\\sin{${trimmedRoots[0].imaginary}x}`]
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
	returnRoots.isComplex = false;
	returnRoots.roots[0] = -c / b;
	return returnRoots;
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
