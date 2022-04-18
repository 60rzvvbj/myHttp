import net from "net";
function connect(options, data, callback) {
  // console.log();
  let client = net.createConnection(
    { port: parseInt(options.port), host: options.host },
    () => {
      client.write(data);
    }
  );
  client.on("data", (resData) => {
    client.end();
    callback(undefined, resData.toString());
  });
}

function request(options) {
  let defaultOptions = {
    method: "GET",
    url: "",
  };
  Object.assign(defaultOptions, options);

  let url = defaultOptions.url;
  let text = "";
  let host, port;
  let urlArr = url.substring(9).split(":");
  if (urlArr.length == 1) {
    host = urlArr[0];
    port = "8848";
  } else if (urlArr.length == 2) {
    host = urlArr[0];
    port = urlArr[1].split("/")[0];
  }

  if (defaultOptions.query) {
    let queryArr = [];
    for (let key in defaultOptions.query) {
      queryArr.push(key + "=" + defaultOptions.query[key]);
    }
    defaultOptions.url += "?" + queryArr.join("&");
  }
  text += defaultOptions.method + " " + defaultOptions.url + " 1.0\n";
  text += "\n";
  text += defaultOptions.body;
  connect(
    {
      host,
      port,
    },
    text,
    (err, resData) => {
      if (err) {
        defaultOptions.error(err);
      } else {
        defaultOptions.success(resData);
      }
    }
  );
}

request({
  method: "GET",
  url: "myhttp://192.168.43.205:1234/login",
  query: { account: "60rzvvbj", password: "123456" },
  body: "aoiughadipsugfasdbgfapisdvbgwedbf",
  success: (data) => {
    console.log(data);
  },
  error: (err) => {
    console.log(err);
  },
});
