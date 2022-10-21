const User = require("../src/User")

let user = new User("username", "password", 18)
test('User object should have all passed arguments as properties', () => {
    expect(user).toEqual({
        username: "username",
        password: "password",
        age: 18
    })
});