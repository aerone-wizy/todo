const Pool = require("pg").Pool;
const config = require("./config.js");

const pool = new Pool({
  user: config.USER,
  password: config.PASS,
  host: config.HOST,
  database: config.NAME,
});

module.exports = pool;
