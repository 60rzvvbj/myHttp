import server from './server/server'

let app = server();

app.on('GET', '/login', (req, res) => {
  let data = req.query;
  console.log(data);
  res.send("aaa");
});

app.listen(8848, () => {
  console.log(`listen on 8848`);
});
