import axios from "axios";

export const getMenu = () =>
  fetch(process.env.REACT_APP_API || "http://127.0.0.1:8080/html").then((res) =>
    res.json()
  );

export const testApi = () =>
  axios
    .post(
      "https://kingbeom.herokuapp.com/login",
      JSON.stringify({
        email: "1111@naver.com",
        password: "1111",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
// fetch("https://kingbeom.herokuapp.com/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     email: "1111@naver.com",
//     password: "1111",
//   }),
//   credentials: "include",
// })
//   .then((res) => res.json())
//   .catch((err) => console.log(err));
