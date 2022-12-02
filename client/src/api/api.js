export const getMenu = () =>
  fetch(process.env.REACT_APP_API || "http://127.0.0.1:8080/html").then((res) =>
    res.json()
  );

export const testApi = () =>
  fetch("http://192.168.1.19:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "1111@naver.com",
      password: "1111",
    }),
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
