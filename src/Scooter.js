class Scooter {
    constructor(station, user) {
        this.station = station
        this.user = user
        this.serial = Math.round(Math.random() * 1000)
        this.charge = Math.round(Math.random() * 100)
        this.maxRange = 32 * (this.charge / 100)
        this.isBroken = false
        this.docked = true
    }

    rent() {
        if (this.charge < 100) {
            return "Scooter low on battery, please charge."
        } else if (this.isBroken) {
            return "Scooter is broken, please send a repair request."
        }
        return "Enjoy the ride!"
    }

    dock(station, distanceTravelled) {
        if (!station) {
            throw new Error("Docking station required!")
        }
        this.station = station
        this.docked = true
        this.user = ""

        if (distanceTravelled > this.maxRange) {
            throw new Error("Max range was exceeded")
        }
        this.maxRange -= distanceTravelled
        this.charge = (this.maxRange / 32) * 100
    }

    async recharge() {
        await new Promise(resolve => {
            setTimeout(resolve, 2000)
        })
        this.charge = 100
    }

    async requestRepair() {
        await new Promise(resolve => {
            setTimeout(resolve, 3000)
        })
        this.isBroken = false
    }
}

module.exports = Scooter