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

function toBeTypeOf(actual, type) {
    return {
        message: () =>
            `expected ${this.utils.printReceived(
                actual,
            )} to be a typeof ${this.utils.printExpected(type)}`,
        pass: typeof actual == type,
    }
}

function toBeAnArray(actual) {
    return {
        message: () =>
            `expected ${this.utils.printReceived(
                actual,
            )} to be an Array`,
        pass: Array.isArray(actual),
    }
}

expect.extend({
    toBeIn,
    toBeWithinRange,
    toBeTypeOf,
    toBeAnArray
})

test("No test", () => { })