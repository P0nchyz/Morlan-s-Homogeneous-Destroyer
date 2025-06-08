function getNotation(notation, degree) {
	if (notation == 'leibniz') {
		return degree == 0 ? 'y' : `\\frac{d${degree == 1 ? '' : '^' + degree}y}{dx}`;
	} else if (notation == 'lagrange') {
		return `y${"'".repeat(degree)}`;
	} else if (notation == 'newton') {
		return `${degree == 0 ? '' : '\\' + 'd'.repeat(degree) + 'ot'} y`
	}
}

export {getNotation}