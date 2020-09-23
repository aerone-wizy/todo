const Pool = require("pg").Pool;
var password = process.env.DB_PASS;

const pool = new Pool({
  user: "aerone",
  password: password,
  host: "localhost",
  port: 5432,
  database: "todoapp",
});

module.exports = pool;
