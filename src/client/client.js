const net = require("net");
let count = 0;
const client = net.createConnection(
  { port: 8124, host: "192.168.0.167" },
  () => {
    // 'connect' 监听器。
    console.log("connected to server!");
    let timer = setInterval(() => {
      client.write("world!");
      count++;
      if (count > 5) {
        clearInterval(timer);
        client.end();
      }
    }, 0);
  }
);
client.on("data", (data) => {
  console.log(data.toString());
  // client.end();
});
client.on("end", () => {
  console.log("disconnected from server");
});

function request(options) {}

request({
  method: "GET",
  utl: "/aldas",
  query: {},
  body: "",
  success: (data) => {},
  error: (err) => {},
});
