class Scooter {
    constructor(station, user) {
        this.station = station
        this.user = user
        this.serial = Math.round(Math.random() * 1000)
        this.charge = Math.round(Math.random() * 100)
        this.isBroken = false
        this.docked = true
    }

    rent() {
        if (this.charge <= 20) {
            return "Scooter low on battery, please charge."
        } else if (this.isBroken) {
            return "Scooter is broken, please send a repair request."
        }
        return "Enjoy the ride!"
    }

    dock(station) {
        if (!station) {
            throw new Error("Docking station required!")
        }
        this.station = station
        this.docked = true
        this.user = ""
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