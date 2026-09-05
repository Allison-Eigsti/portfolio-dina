function mockAuth(req, res, next) {
    req.user = {
        _id: "6a5cec979fde6464ab9c3176",
        id: "6a5cec979fde6464ab9c3176",
        name: "Dina",
        email: "dina@example.com",
        role: "admin"
    }

    next()
}

module.exports = mockAuth



