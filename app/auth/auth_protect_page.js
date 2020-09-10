const path = require("path");

function protect(config = {}) {
    const {authorized = auth, unauthorized = unauth} = config;
    return function(req, res, next) {
        if (req.user) { authorized(req, res, next); }
        else { unauthorized(req, res); }
    }
}

const protected = {
    loginPage: protect({authorized: sendRequestedPage, unauthorized: sendRequestedPage}),
    anyPage: protect({authorized: sendRequestedPage, unauthorized: sendLoginPage})
}

function auth() { return; }
function unauth(_, res) { res.sendStatus(401); }

function sendRequestedPage(_, res) { 
    const pagePath = path.join(__dirname, "../", "/public/index.html");
    res.sendFile(pagePath); 
}
function sendLoginPage(_, res) { 
    res.redirect("/login"); 
}

exports.protect = protect;
exports.protected = protected;