const jwt = require("jsonwebtoken");

function jwtCookie(req, res, next) {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({sub: req.user}, secretKey);
    res.cookie("jwt_api", token, {httpOnly: true});
    next();
}

const cookies = {jwtCookie, }; //CAN INTEGRATE COOKIES
module.exports = cookies;