const express = require("express");
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN, // 从 Sentry 项目里复制
  environment: process.env.SENTRY_ENVIRONMENT || "dev",
  release: process.env.SENTRY_RELEASE, // 建议设置为 commit SHA，方便映射
});

const app = express();

app.get("/boom", async (req, res) => {
  try {
    // 故意制造一个稳定的 JS 错误：Cannot read properties of undefined
    const user = undefined;
    const name = user.name.toLowerCase();
    res.send(name);
  } catch (e) {
    Sentry.captureException(e);
    // 确保事件发出去（本地演示很重要）
    await Sentry.flush(2000);
    res.status(500).send("boom reported to sentry");
  }
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
