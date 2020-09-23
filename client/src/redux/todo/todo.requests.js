export const createRequest = (input) =>
  fetch("http://localhost:9000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify({ todo: input }),
  })
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .catch((error) => console.log("error", error));

export const readRequest = () =>
  fetch("http://localhost:9000/api/todos", {
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log("res", res))
    // .then((res) => setTodos(res))
    .catch((error) => console.log("error", error));

export const updateRequest = (id, todo) =>
  fetch(`http://localhost:9000/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify({ todo: todo }),
  })
    .then((res) => res.json())
    // .then((res) => console.log(res.todo_id))
    .catch((error) => console.log("error", error));

export const deleteRequest = (id) =>
  fetch(`http://localhost:9000/api/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log(res.msg))
    .catch((error) => console.log("error", error));
