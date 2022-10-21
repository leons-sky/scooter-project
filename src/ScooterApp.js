const Stations = require("./Stations.json")

class ScooterApp {
    static scooterSessions = []

    constructor() {
        let stationsObj = {}
        for (let station of Stations) {
            stationsObj[station] = []
        }
        this.stations = stationsObj
        this.registeredUsers = {}

        ScooterApp.scooterSessions.push(this)
    }

    register(user) {
        if (user.age < 18) {
            return "too young to register!"
        } else if (this.registeredUsers[user.username]) {
            return "already registered!"
        }

        this.registeredUsers[user.username] = {
            password: user.password,
            age: user.age,
            loggedIn: false,
            accountChange: 0
        }

        return "user has been registered"
    }

    logIn(username, password) {
        let user = this.registeredUsers[username]
        if (!user || user.password !== password) {
            throw new Error("Username or password is incorrect.")
        }
        user.loggedIn = true
        return "user logged in"
    }

    addScooter(station, scooter) {
        scooter.station = station
        this.stations[station].push(scooter)
    }

    removeScooter(scooter) {
        let removedScooter = false
        for (let station of Object.keys(this.stations)) {
            let scooters = this.stations[station]
            for (let otherScooter of scooters) {
                if (otherScooter.serial !== scooter.serial) continue;
                let index = scooters.indexOf(otherScooter)
                scooters.splice(index, 1)
                removedScooter = true
            }
        }

        if (!removedScooter) {
            throw new Error("scooter serial number not located!")
        }

        return "scooter has successfully been removed"
    }

    markScooterAsBroken(scooter) {
        this.removeScooter(scooter)
        scooter.isBroken = true

        return scooter.requestRepair()
    }
}

module.exports = ScooterApp