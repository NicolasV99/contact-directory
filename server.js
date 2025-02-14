require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { initDb } = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./config/passport");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "clave-secreta",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use("/auth", authRoutes);
app.use("/", require("./routes/index"));

initDb((err) => {
    if (err) {
        console.log(err);
    }
});

module.exports = app;
