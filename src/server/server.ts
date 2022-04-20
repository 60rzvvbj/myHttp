const net = require("net");

enum Method {
  'GET' = 'GET',
  'POST' = 'POST'
}

interface ListenHandler {
  (): void
}

type IQuery = Record<string, string>
interface Request {
  method: Method,
  rawURL: string,
  url: string,
  version: string,
  body: string,
  path: string
  query: IQuery
}

interface Send {
  (data: string | Uint8Array): void
}

interface Response {
  send: Send
}

interface DataHandler {
  (req: Request, res: Response): void
}

// type EventListeners = Array<DataHandler>;

function resolve(data: string): Request {
  const [method, rawURL, version, body] = data.split(/\s/).filter(str => str.length !== 0);
  const [url, queryStr] = rawURL.split('?');
  const temp = url.slice(10); // 去除 myHttp://
  const path = temp.slice(temp.indexOf('/'));
  const queryPairs = queryStr.split('&');
  const query:IQuery = {};
  queryPairs.forEach(p => {
    let [k, v] = p.split('=');
    query[k] = v
  });
  return {
    url,
    rawURL,
    version,
    body,
    path,
    method: method.toLocaleUpperCase() as Method,
    query
  }
}


export default function express() {

  const eventMap: Map<string, Map<Method, DataHandler>> = new Map();


  const server = net.createServer((c) => {
    // 'connection' 监听器。
    console.log("client connected");
    c.on("end", () => {
      console.log("client disconnected");
    });
    c.on("data", (data: Buffer) => {
      const raw = data.toString(); // 为处理字符串
      const req = resolve(raw);
      const res: Response = {
        send: (d) => { console.log(d); c.write(d);
         }
      };
      // 触发处理
      console.log(eventMap.get(req.path));
      console.log(eventMap.get(req.path)?.get(req.method));
      eventMap.get(req.path)?.get(req.method)(req, res);
    });
  });


  server.on("error", (err: Error) => {
    throw err;
  });

  const app = {
    // 启动服务
    listen: (port: number, cb: ListenHandler) => {
      server.listen(port, cb);
    },
    // 注册 method 处理函数
    on: (method: Method, url: string, cb: DataHandler) => {
      if(!eventMap.has(url)){
        eventMap.set(url, new Map<Method, DataHandler>());
      }
      eventMap.get(url).set(method, cb);
    }
  };

  return app;
}
