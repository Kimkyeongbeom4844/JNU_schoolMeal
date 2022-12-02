const jwt = require("jwt");
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.EXPRESS_APP_PRIMARY_KEY));

const authentication = (at, rt, pk, req, res) => {};

module.exports = authentication;
