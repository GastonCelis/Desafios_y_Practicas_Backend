const bCrypt = require("bcrypt")

const webAuth = (req, res, next) => {
    if (req.session?.nombre) {
        next()
    } else {
        res.redirect("/login")
    }
}

const apiAuth = (req, res, next) => {
    if (req.session?.nombre) {
        next()
    } else {
        res.status(401).json({ error: "no autorizado!" })
    }
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


module.exports = {
    webAuth,
    apiAuth,
    isValidPassword,
    createHash
}