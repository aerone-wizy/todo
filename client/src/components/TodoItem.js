import React, { useState } from "react";
import { connect } from "react-redux";
// import {  } from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Modal,
  Input,
  Card,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [input, setInput] = useState(todo.todo);

  const handleUpdate = (event) => {
    event.preventDefault();
    setOpen(false);
    updateTodo(todo.todo_id, input);
    setInput("");
  };

  const handleDelete = () => {
    deleteTodo(todo.todo_id);
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper}>
          <form onSubmit={handleUpdate}>
            <h3 style={{ textAlign: "center" }}>Change your todo</h3>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" disabled={!input} onClick={handleUpdate}>
              Update Todo
            </Button>
          </form>
        </div>
      </Modal>
      <ListItem>
        <Card className={classes.todo}>
          <Checkbox />
          <ListItemText
            primary={todo.todo}
            secondary={"" + todo.date_created}
            style={{ whiteSpace: "nowrap" }}
          />
          <Button onClick={() => setOpen(true)}>
            <EditIcon />
          </Button>
          <Button onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Card>
      </ListItem>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTodo: (id, todo) => dispatch(updateTodoStart(id, todo)),
  deleteTodo: (id) => dispatch(deleteTodoStart(id)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
