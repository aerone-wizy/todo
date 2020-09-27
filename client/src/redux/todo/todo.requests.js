const url = () =>
  window.location.href.indexOf("localhost") < 0
    ? "https://todoapp-290603.an.r.appspot.com"
    : "http://localhost:8080";

export const createRequest = (todo, dueDate, dueTime) =>
  fetch(`${url()}/api/todos`, {
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
  fetch(`${url()}/api/todos`, {
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log("res", res))
    // .then((res) => setTodos(res))
    .catch((error) => console.log("error", error));

export const updateRequest = (id, todo, dueTime, isDone) =>
  fetch(`${url()}/api/todos/${id}`, {
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
  fetch(`${url()}/api/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log(res.msg))
    .catch((error) => console.log("error", error));
