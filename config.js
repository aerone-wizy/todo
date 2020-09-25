// config.js
const dotenv = require("dotenv");
const path = require("path");
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.DB_HOST || "localhost",
  PASS: process.env.DB_PASS || "simplengpassword",
  USER: process.env.DB_USER || "aerone",
  NAME: process.env.DB_NAME || "todoapp",
};
