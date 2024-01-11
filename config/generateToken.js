
const jwt = require("jsonwebtoken");

const genarateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
        expiresIn: "30d"
    })
}

module.exports = genarateToken