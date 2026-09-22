// Tiny static server WITH HTTP Range support (needed for audio seeking).
// Run:  node serve.js       then open  http://localhost:8080/
// Python's built-in http.server does NOT support byte ranges, so the
// "start the bars on the beat's drop" seek only works behind a server like this.
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = process.env.PORT || 8080;
const types = {".html":"text/html",".js":"text/javascript",".css":"text/css",
  ".mp3":"audio/mpeg",".ico":"image/x-icon",".json":"application/json"};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const fp = path.join(root, p);
  if (!fp.startsWith(root) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
    res.writeHead(404); return res.end("Not found");
  }
  const size = fs.statSync(fp).size;
  const ct = types[path.extname(fp)] || "application/octet-stream";
  const range = req.headers.range;
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    const s = m[1] ? parseInt(m[1]) : 0;
    const e = m[2] ? parseInt(m[2]) : size - 1;
    if (s >= size) { res.writeHead(416, {"Content-Range": `bytes */${size}`}); return res.end(); }
    res.writeHead(206, {"Content-Type": ct, "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${s}-${e}/${size}`, "Content-Length": e - s + 1});
    fs.createReadStream(fp, {start: s, end: e}).pipe(res);
  } else {
    res.writeHead(200, {"Content-Type": ct, "Accept-Ranges": "bytes", "Content-Length": size});
    fs.createReadStream(fp).pipe(res);
  }
}).listen(port, () => console.log(`Kafiye Oyunu → http://localhost:${port}/`));
