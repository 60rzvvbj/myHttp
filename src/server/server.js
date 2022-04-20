import net from "net";
const server = net.createServer((c) => {
  // 'connection' 监听器。
  console.log("client connected");
  c.on("end", () => {
    console.log("client disconnected");
  });
  c.on("data", (data) => {
    console.log(data.toString());
    c.write("hello");
  });
});

server.on("error", (err) => {
  throw err;
});
server.listen(1234, () => {
  console.log("server bound");
});
