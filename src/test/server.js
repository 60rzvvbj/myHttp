import server from "../server/server";

let app = server();

app.on("GET", "/login", (req, res) => {
  let data = req.query;
  console.log(data);
  res.send("aaa");
});

app.on("LOAD", "/upload", (req, res) => {
  console.log(req);
  console.log(res);
  res.send("bbb");
});

app.listen(8848, () => {
  console.log(`listen on 8848`);
});
