/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var net = __webpack_require__(2);
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
})(Method || (Method = {}));
function resolve(data) {
    var _a = data
        .split(/\s/)
        .filter(function (str) { return str.length !== 0; }), method = _a[0], rawURL = _a[1], version = _a[2], body = _a[3];
    var _b = rawURL.split("?"), url = _b[0], queryStr = _b[1];
    var temp = url.slice(10);
    var path = temp.slice(temp.indexOf("/"));
    var queryPairs = queryStr.split("&");
    var query = {};
    queryPairs.forEach(function (p) {
        var _a = p.split("="), k = _a[0], v = _a[1];
        query[k] = v;
    });
    return {
        url: url,
        rawURL: rawURL,
        version: version,
        body: body,
        path: path,
        method: method.toLocaleUpperCase(),
        query: query,
    };
}
function express() {
    var eventMap = new Map();
    var server = net.createServer(function (c) {
        console.log("client connected");
        c.on("end", function () {
            console.log("client disconnected");
        });
        c.on("data", function (data) {
            var _a, _b;
            var raw = data.toString();
            console.log(raw);
            var req = resolve(raw);
            var res = {
                send: function (d) {
                    console.log(d);
                    c.write(d);
                },
            };
            console.log(eventMap.get(req.path));
            console.log((_a = eventMap.get(req.path)) === null || _a === void 0 ? void 0 : _a.get(req.method));
            (_b = eventMap.get(req.path)) === null || _b === void 0 ? void 0 : _b.get(req.method)(req, res);
        });
    });
    server.on("error", function (err) {
        throw err;
    });
    var app = {
        listen: function (port, cb) {
            server.listen(port, cb);
        },
        on: function (method, url, cb) {
            if (!eventMap.has(url)) {
                eventMap.set(url, new Map());
            }
            eventMap.get(url).set(method, cb);
        },
    };
    return app;
}
exports["default"] = express;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("net");

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
/* harmony import */ var _server_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


let app = (0,_server_server__WEBPACK_IMPORTED_MODULE_0__["default"])();

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

})();

/******/ })()
;