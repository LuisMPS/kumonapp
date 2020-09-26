const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const SecretJWT = process.env.JWT_SECRET;

const ExtractJWTFromCookie = req => req.cookies["jwt_api"];
const ExtractJwtFromAuthHeader = req => {
    const data = req.get("Authorization") || "";
    const authorization = data.split(" ");
    const [type, token] = authorization;
    if (type === "Bearer" && token) return token;
}

const params = {};
params.secretOrKey = SecretJWT;
params.jwtFromRequest = ExtractJwt.fromExtractors([ExtractJWTFromCookie, ExtractJwtFromAuthHeader]);

passport.use(new JWTStrategy(params, function(jwt_payload, done) {
    const user = jwt_payload.sub;
    if (user) done(null, jwt_payload);
    else done(null, false, {message: "Invalid token"});
}));

function verifyJWT(token) {
    return new Promise((resolve, reject) => 
        jwt.verify(token, SecretJWT, function(err, decoded) {
        if (err) reject(err); else resolve(decoded);
    }));
}

module.exports = verifyJWT;



