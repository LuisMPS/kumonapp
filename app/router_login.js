const express = require("express");
const router = express.Router();
const passport = require("passport");
const bodyParser = require("body-parser");
const auth = require("./auth/auth_login");
const cookies = require("./auth/auth_cookies");

router.post("/user", 
    bodyParser.json(),
    function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return res.status(500).json(err); }
            if (!user) { return res.status(401).send(info); }
            req.logIn(user, function(err) {
                if (err) { res.status(500).json(err); }
                return next();
            });
        })(req, res, next);
    },
    cookies.jwtCookie, //... ANY OTHER COOKIE
    function(req, res) { res.sendStatus(204); }
);

module.exports = router;