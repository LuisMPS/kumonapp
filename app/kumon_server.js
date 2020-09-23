const express = require("express");
const env = require('dotenv').config();
const cors = require("cors");
const serveStatic = require("serve-static");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const protected = require("./auth/auth_protect_page").protected;
const connection = require("./db/connection");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(session({name: "session", httpOnly: true, resave: false, saveUninitialized: false, secret: process.env.SESSION_SECRET}));

const APIRouter = require("./api/router_api");
app.use("/api", APIRouter);

app.use(passport.initialize());
app.use(passport.session());

const loginRouter = require("./router_login");
app.use("/login", loginRouter);

app.get(["/login", "/register"], protected.loginPage);
app.get(["/", "/student", "/birthdays"], protected.anyPage);

const serve = serveStatic("./public");
app.use(serve);

app.use((req, res) => res.status(404).send("Resource not found..."));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
connection.then(() => console.log("Connected to database!")).catch();