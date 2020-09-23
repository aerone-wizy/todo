import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Button, FormControl, List, TextField } from "@material-ui/core";

import TodoItem from "../components/TodoItem";

import { createTodoStart, readTodosStart } from "../redux/todo/todo.actions";
import { selectTodos } from "../redux/todo/todo.selector";

const Todo = ({ createTodoStart, readTodosStart, todos }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    readTodosStart();
  }, [readTodosStart]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Add todo");

    createTodoStart(input);

    setInput("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Your Todos</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            label="✔ What to do?"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <br />
        <br />
        <Button
          type="submit"
          disabled={!input}
          variant="contained"
          color="primary"
          size="large"
        >
          Add Todo
        </Button>
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
            <div></div>
          ) : (
            todos.map((todo) => <TodoItem key={todo.todo_id} todo={todo} />)
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
  createTodoStart: (todo) => dispatch(createTodoStart(todo)),
  readTodosStart: () => dispatch(readTodosStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
