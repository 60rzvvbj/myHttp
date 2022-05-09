/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ request)
/* harmony export */ });
/* harmony import */ var net__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var net__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(net__WEBPACK_IMPORTED_MODULE_0__);

function connect(options, datas, callback) {
  let client = net__WEBPACK_IMPORTED_MODULE_0___default().createConnection(
    { port: parseInt(options.port), host: options.host },
    () => {
      for (let data of datas) {
        console.log(data);
        client.write(data);
      }
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
    headers: {
      "content-type": "Default",
    },
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
    options.headers = { ...options.headers, ...headers };
    let hArr = [];
    for (let attr in headers) {
      hArr.push(attr + "=" + headers[attr]);
    }
    options.text += "\n" + hArr.join("&");
  };

  this.send = function (bodyData) {
    let datas = [options.text];

    if (options.headers["content-type"] == "File") {
      datas.push(bodyData);
    } else if (bodyData != undefined) {
      datas[0] += "\n" + bodyData;
    }

    connect(
      {
        host: options.host,
        port: options.port,
      },
      datas,
      this.callback
    );
  };

  this.callback = function () {};
}

function request(options) {
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

  if (options.headers) {
    xmhr.setHeader(options.headers);
  }

  xmhr.callback = function (err, resData) {
    if (err) {
      defaultOptions.error(err);
    } else {
      defaultOptions.success(resData);
    }
  };
  xmhr.send(defaultOptions.body);
}


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("net");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);



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

let file = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync("./src/test/client.js");

(0,_client_client_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
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

})();

/******/ })()
;