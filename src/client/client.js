const net = require("net");
let url1 = "192.168.43.196";
let url2 = '127.0.0.1'
let url3 = "192.168.43.205";
let count = 0;
const client = net.createConnection(
  { port: 8848, host: url1 },
  () => {
    // 'connect' 监听器。
    console.log("connected to server!");
    client.write("GET myhttp://192.168.43.196:8848/login?account=60rzvvbj&password=123456 1.0\n\naoiughadipsugfasdbgfapisdvbgwedbf");
  }
);
client.on("data", (data) => {
  console.log(data.toString());
  client.end();
});
client.on("end", () => {
  console.log("disconnected from server");
});

// function request(options) { }

// request({
//   method: "GET",
//   utl: "/aldas",
//   query: {},
//   body: "",
//   success: (data) => { },
//   error: (err) => { },
// });
