import net from 'net';

enum Method {
  'GET' = 'GET',
  'POST' = 'POST'
}

interface ListenHandler {
  (): void
}

interface Request {
  query: Object
}

interface Send {
  (data: String | Buffer): void
}

interface Response {
  send: Send
}

interface DataHandler {
  (req: Request, res: Response): void
}

// type EventListeners = Array<DataHandler>;

let str = `GET myhttp://192.168.43.205:1234/login?account=60rzvvbj&password=123456 1.0

aoiughadipsugfasdbgfapisdvbgwedbf`;


export function resolve(data: string): Request{

}


function express() {

  const  eventMap: Map<string,  Map<Method, DataHandler>> = new Map();


  const server = net.createServer((c) => {
    // 'connection' 监听器。
    console.log("client connected");
    c.on("end", () => {
      console.log("client disconnected");
    });
    c.on("data", (data) => {
      const raw = data.toString(); // 为处理字符串
      const req = resolve(raw);
      const res: Response = {
        send:(d) => {}
      };
      // 触发处理
      eventMap.get('').get(Method.GET)(req, res);
    });
  });


  server.on("error", (err) => {
    throw err;
  });

  const app = {
    // 启动服务
    listen: (port: number, cb: ListenHandler) => {
      server.listen(port, cb);
    },
    // 注册 method 处理函数
    on: (method: Method, url: string, cb: DataHandler) => {
      let map = eventMap.get(url) ?? new Map<Method, DataHandler>();
      map.set(method, cb);
    }
  };

  return app;
}

let app = express();

app.on(Method.GET, '/login', (req, res) => {
  let data = req.query;
  console.log(data);
  res.send("aaa");
});

app.listen(8848, () => {
  console.log(`listen on 8848`);
});
