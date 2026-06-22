// Custom Next.js server for PM2 cluster mode.
//
// PM2 cluster mode needs a Node entry script (it can't cluster `next start`),
// and rolling zero-downtime reload needs each worker to announce when it is
// actually accepting connections. This server does both: it emits the PM2
// `ready` signal only once it is listening, and exposes /healthz so the deploy
// can verify a release before traffic relies on it.

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    if (req.url === "/healthz") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }
    handle(req, res, parse(req.url, true));
  });

  server.listen(port, () => {
    // Tell PM2 (wait_ready) the worker is live — only now is it safe to kill
    // the previous worker during a rolling reload.
    if (process.send) process.send("ready");
    console.log(`> Ready on http://${hostname}:${port} (pid ${process.pid})`);
  });
});
