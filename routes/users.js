const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const router = express.Router();

router.get("/me", (req, res) => {
  // console.log("me route req.user", req.user);
  // console.log("req.isAuthenticated()", req.isAuthenticated());
  res.json({ user: req.user, isAuthenticated: req.isAuthenticated() });
});

router.get("/logout", (req, res) => {
  req.logout();
  // console.log("req.isAuthenticated()", req.isAuthenticated());
  res.json({ message: "You have logged out successfully" });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log("login route - req.user: ", req.user);
  let user = req.user;
  delete user.password;
  res.json(user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, done) => {
      // console.log(username, password);
      pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username],
        (err, results) => {
          if (err) throw err;
          // console.log(results.rows[0]);

          if (results.rows.length > 0) {
            const user = results.rows[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) console.log(err);

              if (isMatch) {
                return done(null, user);
              } else {
                //password is incorrect
                return done(null, false, { message: "Password is incorrect" });
              }
            });
          } else {
            // No user
            return done(null, false, {
              message: "No user with that email address",
            });
          }
        }
      );
    }
  )
);

router.post("/register", async (req, res) => {
  let { name, email, username, password, confirmPassword } = req.body;

  let errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== confirmPassword) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.json({ errors });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) console.log(err);
        // console.log(results.rows);

        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered" });
          res.json({ errors });
        } else {
          pool.query(
            `INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4)
            RETURNING username`,
            [name, email, username, hashedPassword],
            (err, results) => {
              if (err) throw err;

              // console.log(results.rows[0].username);
              res.json({
                username: results.rows[0].username,
                password: confirmPassword,
              });
              // req.flash("success_msg", "You are now registered. Please log in");
              // res.redirect("/login");
            }
          );
        }
      }
    );
  }
});

passport.serializeUser((user, done) => {
  // console.log("Serialize: ", user.id);

  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log("Deserialize: ", id);

  pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
    if (err) {
      return done(err);
    }
    let user = results.rows[0];
    delete user.password;
    // console.log("user DESERIALIZE", user);
    return done(null, user);
  });
});

module.exports = router;
