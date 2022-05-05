import request from "../client/client";
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
  method: "LOAD",
  url: "myhttp://127.0.0.1:8848/upload",
  query: { account: "60rzvvbj" },
  body: file,
  success: (data) => {
    console.log("请求成功");
    console.log(data);
  },
  error: (err) => {
    console.log("请求失败");
    console.log(err);
  },
});
