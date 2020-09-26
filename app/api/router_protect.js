const passport = require("passport");
const auth = require("../auth/auth_jwt");

function protect(req, res, next) {
    passport.authenticate('jwt', {session: false}, function(err, user, info) {
        if (err) { return res.status(400).send(err); }
        if (!user) { return res.status(401).send(info); }
        req.user = user; return next();
    })(req, res, next);
}

module.exports = protect;