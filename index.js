const app = require("./app")

app.listen(app.get("port"))
app.set()
console.log(`server on port http://127.0.0.1:${app.get("port")}`)