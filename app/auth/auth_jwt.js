const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const ExtractJWTFromCookie = req => req.cookies["jwt_api"];
const ExtractJwtFromAuthHeader = req => {
    const data = req.get("Authorization") || "";
    const authorization = data.split(" ");
    const [type, token] = authorization;
    if (type === "Bearer" && token) return token;
}

const params = {};
params.secretOrKey = process.env.JWT_SECRET;
params.jwtFromRequest = ExtractJwt.fromExtractors([ExtractJWTFromCookie, ExtractJwtFromAuthHeader]);

passport.use(new JWTStrategy(params, function(jwt_payload, done) {
    const user = jwt_payload.sub;
    if (user) done(null, user);
    else done(null, false, {message: "Invalid token"});
}));


