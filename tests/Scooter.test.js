require("./expectExtensions.test.js");

const Scooter = require("../src/Scooter")
const User = require("../src/User")

const Stations = require("../src/Stations.json")

describe('Check scooter object', () => {
    let user = new User("user", "pass", 20)
    let scooter = new Scooter(Stations[2], user)

    it('should have a station property', () => {
        expect(scooter.station).toBeIn(Stations)
    });
    it('should have a user property', () => {
        expect(scooter.user).toEqual({
            username: "user",
            password: "pass",
            age: 20
        })
    });
    it('should have a serial property in range [1, 1000]', () => {
        expect(scooter.serial).toBeWithinRange(1, 1000)
    });
    it('should have a charge property in range [1, 100]', () => {
        expect(scooter.charge).toBeWithinRange(1, 100)
    });
    it('should have a isBroken bool defaulted to false', () => {
        expect(scooter.isBroken).toBeFalsy()
    });
    it('should have a docked bool defaulted to true', () => {
        expect(scooter.docked).toBeTruthy()
    });
});

describe('Test scooter renting and docking', () => {
    let scooter;
    beforeEach(() => {
        let user = new User("user", "pass", 20)
        scooter = new Scooter(Stations[0], user)
    });

    describe('Rent method', () => {
        it('should return "Enjoy the ride!" if all conditions are met', () => {
            scooter.charge = 100
            expect(scooter.rent()).toBe("Enjoy the ride!")
        });
        it('should return "Scooter low on battery, please charge." if charge is less than or equal to 20', () => {
            scooter.charge = 20
            expect(scooter.rent()).toBe("Scooter low on battery, please charge.")
        });
        it('should return "Scooter is broken, please send a repair request." if scooter is broken', () => {
            scooter.charge = 100
            scooter.isBroken = true
            expect(scooter.rent()).toBe("Scooter is broken, please send a repair request.")
        });
    });

    describe('Dock method', () => {
        it('should set the scooter\'s station property to the passed argument', () => {
            scooter.dock(Stations[3])
            expect(scooter.station).toBe(Stations[3])
        });
        it('should throw an error of "Docking station required!" if no station is provided', () => {
            expect(() => {
                scooter.dock()
            }).toThrow("Docking station required!")
        });
        it('should set the docked property to true', () => {
            scooter.dock(Stations[3])
            expect(scooter.docked).toBeTruthy()
        });
        it('should set current user to an empty string', () => {
            scooter.dock(Stations[3])
            expect(scooter.user).toBe("")
        });
    });
});

describe('Test recharge and repair methods', () => {
    let scooter;
    beforeEach(() => {
        let user = new User("user", "pass", 20)
        scooter = new Scooter(Stations[0], user)
    });

    it('should recharge and set the scooters charge to 100', async () => {
        scooter.charge = 20
        await scooter.recharge()
        expect(scooter.charge).toBe(100)
    });

    it('should repair the scooter and set isBroken to false', async () => {
        scooter.isBroken = true
        await scooter.requestRepair()
        expect(scooter.isBroken).toBeFalsy()
    });
});