export const getMenu = () =>
  fetch(process.env.REACT_APP_API || "http://127.0.0.1:8080/html").then((res) =>
    res.json()
  );
