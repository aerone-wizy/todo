const pool = require("../db");
const express = require("express");
var router = express.Router();

//? -- ADD TODO --
router.post("/", (req, res) => {
  const { todo, dueDate, dueTime } = req.body;
  // console.log("todo, dueDate, dueTime", todo, dueDate, dueTime);
  if (!todo) res.json({ error: "Todo is empty" });
  pool.query(
    "INSERT INTO todos (user_id, todo, date_created, due_date, due_time, is_done) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [req.user.id, todo, new Date(), dueDate, dueTime, false],
    (err, result) => {
      if (err) console.log(err);
      // console.log("result", result);
      result.rows
        ? getAllTodo(req.user.id, (err, result) => {
            res.json({
              todos: result.rows,
              msg: "Todo added successfuly",
              error: err,
            });
          })
        : res.json({ error: "No rows affected" });
    }
  );
});

//? -- UPDATE TODO --
router.put("/:id", (req, res) => {
  const { todo, dueTime, isDone } = req.body;
  // console.log(" todo, dueTime, isDone ", todo, dueTime, isDone);
  pool.query(
    "UPDATE todos SET todo = $2, due_time = $3, is_done = $4  WHERE todo_id = $1 RETURNING *",
    [req.params.id, todo, dueTime, isDone],
    (err, result) => {
      if (err) console.log(err);
      // console.log("result", result);
      result.rows
        ? getAllTodo(req.user.id, (err, result) => {
            res.json({
              todos: result.rows,
              msg: "Todo updated successfuly",
              error: err,
            });
          })
        : res.json({ error: "No rows affected" });
    }
  );
});

//? -- DELETE TODO --
router.delete("/:id", (req, res) =>
  pool.query(
    "DELETE FROM todos WHERE todo_id = $1 RETURNING *",
    [req.params.id],
    (err, result) => {
      if (err) console.log(err);

      result.rows
        ? getAllTodo(req.user.id, (err, result) => {
            res.json({
              todos: result.rows,
              msg: "Todo deleted successfuly",
              error: err,
            });
          })
        : res.json({ error: "No rows affected" });
    }
  )
);

//? -- READ TODOS --
router.get("/", (req, res) => {
  getAllTodo(req.user.id, (err, result) => {
    res.json({
      todos: result.rows,
      msg: "Todo successfuly retrieved",
      error: err,
    });
  });
});

const getAllTodo = (id, callback) =>
  pool.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY date_created DESC ",
    [id],
    callback
  );

module.exports = router;
