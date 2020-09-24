import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";

import { Button, CircularProgress, List, TextField } from "@material-ui/core";

import TodoItem from "../components/TodoItem";

import { createTodoStart, readTodosStart } from "../redux/todo/todo.actions";
import { selectTodos } from "../redux/todo/todo.selector";

const Todo = ({ createTodo, readTodos, todos }) => {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState(moment().format("YYYY-MM-DD"));
  const [dueTime, setDueTime] = useState(moment(new Date()).format("LT"));

  useEffect(() => {
    readTodos();
  }, [readTodos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(input, dueDate, dueTime);

    createTodo(input, dueDate, dueTime);

    setInput("");
  };

  const handleDueTime = () => {
    if (moment(dueTime, "LT").format("LT") === "Invalid date") {
      setDueTime(moment(new Date()).format("LT"));
    } else {
      setDueTime(moment(dueTime, "LT").format("LT"));
    }
  };

  let dates = [];
  if (todos) {
    todos.map((todo) => {
      if (!dates.includes(todo.due_date)) {
        dates = [...dates, todo.due_date];
      }
      return null;
    });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Your Todos</h1>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
          }}
        >
          <TextField
            label="✔ What do you want to do?"
            value={input}
            style={{ margin: "10px", width: "20%" }}
            onChange={(event) => setInput(event.target.value)}
          />
          <TextField
            name="date"
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{ margin: "10px" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="time"
            label="Time"
            type="text"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            onBlur={handleDueTime}
            style={{ margin: "10px", width: "10%" }}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            disabled={
              !input ||
              !dueTime ||
              !dueDate ||
              dueTime === "Invalid date" ||
              dueDate === "Invalid date"
            }
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: "10px" }}
          >
            Add Todo
          </Button>
        </div>
      </form>
      <List>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!todos ? (
            <CircularProgress />
          ) : (
            dates
              .sort()
              .reverse()
              .map((date) => (
                <div key={date}>
                  {moment(date).format("dddd, MMMM D YYYY")}
                  {todos.map((todo) =>
                    date === todo.due_date ? (
                      <TodoItem key={todo.todo_id} todo={todo} />
                    ) : null
                  )}
                </div>
              ))
          )}
        </div>
      </List>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  todos: selectTodos,
});

const mapDispatchToProps = (dispatch) => ({
  createTodo: (todo, dueDate, dueTime) =>
    dispatch(createTodoStart(todo, dueDate, dueTime)),
  readTodos: () => dispatch(readTodosStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
