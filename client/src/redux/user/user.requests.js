const url = () =>
  window.location.href.indexOf("localhost") < 0
    ? "https://todoapp-290603.an.r.appspot.com"
    : "http://localhost:8080";

export const loginRequest = (userCredentials) =>
  fetch(`${url()}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify(userCredentials),
  })
    .then((res) => res.json())
    .catch((error) => console.log("error", error));

export const registerRequest = (userCredentials) =>
  fetch(`${url()}/api/users/register`, {
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
  fetch(`${url()}/api/users/me`, {
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log("res", res))
    .catch((error) => console.log("error", error));

export const logoutRequest = () =>
  fetch(`${url()}/api/users/logout`, {
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => res.json())
    // .then((res) => console.log("res", res))
    .catch((error) => console.log("error", error));
