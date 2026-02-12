const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://e6c0f857b7dd50276fb6e9fe955266ef@o4510870894411776.ingest.us.sentry.io/4510870928621568",
  environment: process.env.SENTRY_ENVIRONMENT || "dev",
  release: process.env.SENTRY_RELEASE, // 建议是 commit SHA
  sendDefaultPii: false, // POC 建议先 false，避免收集默认 PII
});
