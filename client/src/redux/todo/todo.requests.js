export const createRequest = (todo, dueDate, dueTime) =>
  fetch("http://localhost:8080/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify({ todo, dueDate, dueTime }),
  })
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .catch((error) => console.log("error", error));

export const readRequest = () =>
  fetch("http://localhost:8080/api/todos", {
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log("res", res))
    // .then((res) => setTodos(res))
    .catch((error) => console.log("error", error));

export const updateRequest = (id, todo, dueTime, isDone) =>
  fetch(`http://localhost:8080/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify({ todo, dueTime, isDone }),
  })
    .then((res) => res.json())
    // .then((res) => console.log(res.todo_id))
    .catch((error) => console.log("error", error));

export const deleteRequest = (id) =>
  fetch(`http://localhost:8080/api/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log(res.msg))
    .catch((error) => console.log("error", error));
