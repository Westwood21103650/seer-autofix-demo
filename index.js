require("./instrument.js");

const Sentry = require("@sentry/node");
const express = require("express");

const app = express();

app.get("/boom", (req, res) => {
  // 故意制造一个 JS 错误
  const user = undefined;
  const name = user.name.toLowerCase();
  res.send(name);
});

// 注意：Sentry 的 error handler 要放在所有路由之后
Sentry.setupExpressErrorHandler(app);

app.listen(3000, () => console.log("listening on http://localhost:3000"));
