import net from "net";
function connect(options, data, callback) {
  let client = net.createConnection(
    { port: parseInt(options.port), host: options.host },
    () => {
      client.write(data);
    }
  );
  client.on("error", function (err) {
    throw err;
  });
  client.on("data", (resData) => {
    client.end();
    callback(undefined, resData.toString());
  });
}

function XmlMyHTTPRequest() {
  let options = {
    method: "",
    url: "",
    host: "",
    port: "8848",
    text: "",
  };

  let flag = 0; // 判断函数调用情况，防止非法调用

  this.open = function (method, url) {
    options.method = method;
    options.url = url;

    // url处理
    options.text += options.method + " " + options.url + " 1.0";

    // myhttp://host:port/path?a=1&b=2
    let urlArr = url.substring(9).split(":");
    if (urlArr.length == 1) {
      options.host = urlArr[0];
    } else if (urlArr.length == 2) {
      options.host = urlArr[0];
      options.port = urlArr[1].split("/")[0];
    }
  };

  this.setHeader = function (headers) {
    for (let attr in headers) {
      options.text += "\n" + attr + "=" + headers[attr];
    }
  };

  this.send = function (bodyData) {
    if (bodyData != undefined) {
      options.text += "\n\n";
      options.text += bodyData;
    }

    connect(
      {
        host: options.host,
        port: options.port,
      },
      options.text,
      this.callback
    );
  };

  this.callback = function () {};
}

export default function request(options) {
  let defaultOptions = {
    method: "GET",
    url: "",
  };
  Object.assign(defaultOptions, options);

  let xmhr = new XmlMyHTTPRequest();

  if (defaultOptions.query) {
    let queryArr = [];
    for (let key in defaultOptions.query) {
      queryArr.push(key + "=" + defaultOptions.query[key]);
    }
    defaultOptions.url += "?" + queryArr.join("&");
  }

  xmhr.open(defaultOptions.method, defaultOptions.url);

  xmhr.callback = function (err, resData) {
    if (err) {
      defaultOptions.error(err);
    } else {
      defaultOptions.success(resData);
    }
  };
  xmhr.send(defaultOptions.body);
}
