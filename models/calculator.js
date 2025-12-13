function sum(...numbers) {
    return numbers.reduce((total, value) => {
        if (typeof value !== 'number') {
            throw new Error("All params must be valid numbers");
        }
        return total + value;
    }, 0);
}


exports.sum = sum;