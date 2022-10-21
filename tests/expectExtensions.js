function toBeIn(value, array) {
    return {
        message: () => `expected ${this.utils.printReceived(value)} to be one of ${this.utils.printExpected(array)}`,
        pass: array.includes(value)
    }
}

function toBeWithinRange(actual, floor, ceiling) {
    return {
        message: () =>
            `expected ${this.utils.printReceived(
                actual,
            )} to be within range ${this.utils.printExpected(
                `${floor} - ${ceiling}`,
            )}`,
        pass: actual >= floor && actual <= ceiling,
    }
}

expect.extend({
    toBeIn,
    toBeWithinRange
})