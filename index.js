const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const pgSession = require("connect-pg-simple")(session);

const config = require("./config.js");

const pool = require("./db");

const port = 8080;

//Routes
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

var whitelist = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://todoapp-290603.an.r.appspot.com/",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors({ credentials: true, corsOptions }));
//Express flash
app.use(flash());
//Cookie
app.use(cookieParser("secret"));
//Morgan logger
app.use(logger("dev"));
//Recognize the incoming Request - middleware to read recieved data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

//ROUTES
// app.get("/api/test", (req, res) => {
//   res.json({ title: "Welcome, Aerone" });
// });

// app.get("/api/getList", (req, res) => {
//   var list = ["item1", "item2", "item3"];
//   res.json(list);
//   console.log("Sent list of items");
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//PORT
app.listen(port, (res, req) => {
  console.log(`NODE_ENV=${config.NODE_ENV}`);
  console.log("App is listening on port", port);
});
