require("./expectExtensions.test.js");

const ScooterApp = require("../src/ScooterApp")
const Scooter = require("../src/Scooter")
const User = require("../src/User")

const Stations = require("../src/Stations.json")

describe('Check ScooterApp class', () => {
    it('should have a static scooterSessions array', () => {
        expect(ScooterApp.scooterSessions).toBeAnArray("array")
    });
    it('a new instance of ScooterApp should be added to the scooterSessions array', () => {
        let app = new ScooterApp()
        expect(ScooterApp.scooterSessions).toContainEqual(app)
    });
});

describe('Check ScooterApp object', () => {
    let app = new ScooterApp()
    let stationsObj = {}
    for (let station of Stations) {
        stationsObj[station] = []
    }

    it('should have a stations property which is an object of arrays and station names', () => {
        expect(app.stations).toEqual(stationsObj)
    });
    it('should have an empty registeredUsers object', () => {
        expect(app.registeredUsers).toEqual({})
    });
});

describe('Test register and login methods', () => {
    let app = new ScooterApp()

    describe('Register method', () => {
        it('should return "too young to register!" if user is under the age of 18', () => {
            let user = new User("John", "abc12345", 17)
            expect(app.register(user)).toBe("too young to register!")
        });
        it('should add userdata to the registeredUsers property when successfully registering', () => {
            let user = new User("Sam", "abc12345", 20)
            app.register(user)
            expect(app.registeredUsers).toEqual({
                Sam: {
                    password: "abc12345",
                    age: 20,
                    loggedIn: false,
                    accountChange: 0
                }
            })
        });
        it('should return "user has been registered" when successfully registering', () => {
            let user = new User("Tim", "abc12345", 19)
            expect(app.register(user)).toBe("user has been registered")
        });
        it('should return "already registered!" when a user is already registered', () => {
            let user = new User("Sam", "abc12345", 20)
            expect(app.register(user)).toBe("already registered!")
        });
    });

    describe('Login method', () => {
        it('should throw the error "Username or password is incorrect." if username does not match', () => {
            expect(() => {
                app.logIn("Rose", "abc12345")
            }).toThrow("Username or password is incorrect.")
        });
        it('should throw the error "Username or password is incorrect." if password does not match', () => {
            expect(() => {
                app.logIn("Sam", "wrongpassword")
            }).toThrow("Username or password is incorrect.")
        });
        it('should set a user to be logged in after a successful login', () => {
            app.logIn("Tim", "abc12345")
            expect(app.registeredUsers.Tim.loggedIn).toBeTruthy()
        });
        it('should return "user logged in" after a successful login', () => {
            expect(app.logIn("Sam", "abc12345")).toBe("user logged in")
        });
    });
})

describe('Test adding and removing a scooter and marking one as broken', () => {
    let user = new User("user", "password", 21)

    describe('Add scooter', () => {
        let app = new ScooterApp()
        let scooter = new Scooter(null, user)
        app.addScooter(Stations[1], scooter)

        it('set the scooter\'s station property to the station argument', () => {
            expect(scooter.station).toBe(Stations[1])
        });
        it(`should add the scooter to the "${Stations[1]}" array in the stations object`, () => {
            expect(app.stations.Brooklyn).toEqual([scooter])
        });
    });

    describe('Remove scooter', () => {
        let app = new ScooterApp()
        let scooter = new Scooter(Stations[0], user)
        app.stations[Stations[0]].push(scooter)

        it('should return "scooter has successfully been removed" after successful removal', () => {
            expect(app.removeScooter(scooter)).toBe("scooter has successfully been removed")
        });
        it('should remove the scooter from the location\'s array of scooters', () => {
            expect(app.stations[Stations[0]]).toEqual([])
        });
        it('should throw the error "scooter serial number not located!" if the scooter has not been previously added', () => {
            app.stations[Stations[0]].push(new Scooter(Stations[0], user)) // for 100% coverage
            expect(() => {
                let scooter2 = new Scooter(null, user)
                app.removeScooter(scooter2)
            }).toThrow("scooter serial number not located!")
        });
    });

    describe('Mark scooter as broken', () => {
        let app = new ScooterApp()
        let scooter = new Scooter(Stations[0], user)

        it('should throw the error "scooter serial number not located!" if the scooter is not in an available list', () => {
            expect(() => {
                app.markScooterAsBroken(scooter)
            }).toThrow("scooter serial number not located!")
        });
        it('should set the scooter\'s isBroken property to true', () => {
            app.addScooter(Stations[0], scooter)
            app.markScooterAsBroken(scooter)
            expect(scooter.isBroken).toBeTruthy()
        });
        it('should set the scooter\'s isBroken property back to false once repaired', async () => {
            app.addScooter(Stations[0], scooter)
            await app.markScooterAsBroken(scooter)
            expect(scooter.isBroken).toBeFalsy()
        });
    });
});