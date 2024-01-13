const express = require("express")
const app = express()
app.use(express.json());
app.use("/db", require("./router/db"))
app.set("port",3002)

module.exports = app;