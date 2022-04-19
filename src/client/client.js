const net = require("net");
let url1 =  "192.168.43.160";
let url2 = '127.0.0.1'
let url3 = "192.168.43.205";
// let count = 0;
const client = net.createConnection(
  { port: 1234, host: url3},
  () => {
    // 'connect' 监听器。
    console.log("connected to server!");
    let timer = setInterval(() => {
      client.write("world!" + count);
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
