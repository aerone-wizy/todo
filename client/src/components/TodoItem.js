import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Card,
  InputBase,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteTodoStart, updateTodoStart } from "../redux/todo/todo.actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  todo: {
    display: "flex",
    flexDirection: "row",
    width: "80vw",
  },
}));

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const { todo_id, is_done, date_created, due_time } = todo;

  const classes = useStyles();
  const [input, setInput] = useState(todo.todo);
  const [time, setTime] = useState(moment(due_time, "LT").format("LT"));

  const handleUpdate = () => {
    if (todo.todo === input) return;

    updateTodo(todo_id, input, time, is_done);
  };

  const handleCheckbox = () => {
    updateTodo(todo_id, todo.todo, due_time, !is_done);
  };

  const handleDelete = () => {
    deleteTodo(todo_id);
  };

  const handleDueTime = () => {
    if (moment(time, "LT").format("LT") === "Invalid date") {
      setTime(moment(due_time, "LT").format("LT"));
      return;
    }

    setTime(moment(time, "LT").format("LT"));

    if (due_time === moment(time, "LT").format("LT")) return;

    updateTodo(todo_id, todo.todo, moment(time, "LT").format("LT"), is_done);
  };

  return (
    <div>
      <ListItem>
        <Card className={classes.todo}>
          <Checkbox checked={is_done} onChange={handleCheckbox} />
          <ListItemText
            primary={
              <InputBase
                defaultValue={input}
                onChange={(event) => setInput(event.target.value)}
                onBlur={handleUpdate}
                style={{ width: "60%" }}
                inputProps={{ "aria-label": "naked" }}
              />
            }
            secondary={"Created on " + moment(date_created).format("LLLL")}
            style={{ whiteSpace: "nowrap" }}
          />
          <InputBase
            value={time}
            onChange={(event) => setTime(event.target.value)}
            onBlur={handleDueTime}
            inputProps={{ "aria-label": "naked" }}
          />
          <Button onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Card>
      </ListItem>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTodo: (id, todo, dueTime, isDone) =>
    dispatch(updateTodoStart(id, todo, dueTime, isDone)),
  deleteTodo: (id) => dispatch(deleteTodoStart(id)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
