export const loginRequest = (userCredentials) =>
  fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify(userCredentials),
  })
    .then((res) => res.json())
    .catch((error) => console.log("error", error));

export const registerRequest = (userCredentials) =>
  fetch("http://localhost:8080/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify(userCredentials),
  })
    .then((res) => res.json())
    // .then((res) => console.log("res", res))
    .catch((error) => console.log("error", error));

export const userRequest = () =>
  fetch("http://localhost:8080/api/users/me", {
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((error) => console.log("error", error));

export const logoutRequest = () =>
  fetch("http://localhost:8080/api/users/logout", {
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log("res", res))
    .catch((error) => console.log("error", error));
