const net = require("net");
const server = net.createServer((c) => {
  // 'connection' 监听器。
  console.log("client connected");
  c.on("end", () => {
    console.log("client disconnected");
  });
  c.on("data", (data) => {
    console.log(data.toString());
    c.write("hello\r\n");
  });
});

server.on("error", (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log("server bound");
});

function express() {}

let app = express();

app.on("GET", (req, res) => {
  let data = req.query;
  console.log(data);
  res.send("aaa");
});

app.listen(8848);
