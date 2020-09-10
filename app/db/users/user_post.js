const User = require("./user");
const {v4: uuidV4} = require("uuid");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

function postUser(req, res) {
    const data = req.get("Authorization") || "";
    const authorization = data.split(" ");
    const [type, key] = authorization;
    if (type !== "Bearer" || key !== process.env.REGISTER_SECRET_KEY) { res.sendStatus(403); return; }
    const {username, password} = req.body;
    if (!username || !password) { res.status(404).json({err: "Incomplete data!"}); return; }
    bcrypt.hash(password, saltRounds).then(hash => {
        const uuid = uuidV4();
        const user = User.create({username, password: hash, uuid});
        user.then(() => res.sendStatus(204))
        .catch(err => res.status(400).json(err));
    }); 
}

module.exports = postUser;
