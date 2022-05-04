import request from "../client/client";
request({
  method: "GET",
  url: "myhttp://127.0.0.1:8848/login",
  query: { account: "60rzvvbj", password: "123456" },
  body: "aoiughadipsugfasdbgfapisdvbgwedbf",
  success: (data) => {
    console.log("请求成功");
    console.log(data);
  },
  error: (err) => {
    console.log("请求失败");
    console.log(err);
  },
});
