import request from "../client/client.js";
import fs from "fs";

// request({
//   method: "GET",
//   url: "myhttp://127.0.0.1:8848/login",
//   query: { account: "60rzvvbj", password: "123456" },
//   body: "aoiughadipsugfasdbgfapisdvbgwedbf",
//   success: (data) => {
//     console.log("请求成功");
//     console.log(data);
//   },
//   error: (err) => {
//     console.log("请求失败");
//     console.log(err);
//   },
// });

let file = fs.readFileSync("./src/test/client.js");

request({
  method: "GET",
  url: "myhttp://127.0.0.1:8848/getUserInfo",
  headers: {
    token: "aaa",
    cookie: "c",
  },
  query: { account: "60rzvvbj" },
  body: "this is body",
  success: (data) => {
    console.log("请求成功");
    console.log(data);
  },
  error: (err) => {
    console.log("请求失败");
    console.log(err);
  },
});
