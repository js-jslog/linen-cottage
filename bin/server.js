#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _lodash = require('lodash');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaWebpack = require('koa-webpack');

var _koaWebpack2 = _interopRequireDefault(_koaWebpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var port = process.env.PORT || '9000';
var hotModuleReplacement = process.env.HOT_MODULES || 'false';
var setWebpackConfigFile = process.env.WEBPACK_CONFIG_FILE || './webpack.dev.js';
var resolveWebpackFolder = _path2.default.resolve(setWebpackConfigFile);
var webpackConfig = require(resolveWebpackFolder);
var setStaticFolder = process.env.PUBLIC_DIR || './dist/public';
var getHTML = process.env.HTML || './index.html';
var html = _path2.default.resolve(getHTML);

(0, _assert2.default)((0, _lodash.isString)(port), 'Invalid port');
(0, _assert2.default)((0, _lodash.isString)(hotModuleReplacement), 'Invalid Webpack HMR Setup');
(0, _assert2.default)((0, _lodash.isString)(setWebpackConfigFile), 'Invalid Webpack config file path');
(0, _assert2.default)((0, _lodash.isString)(setStaticFolder), 'Invalid static folder path');
(0, _assert2.default)((0, _lodash.isString)(getHTML), 'Invalid HTML file path');

var app = new _koa2.default();

// Serve static files
app.use((0, _koaStatic2.default)(_path2.default.resolve(setStaticFolder)));

// Use webpack hot module middleware in development
if (hotModuleReplacement === 'true') {
  console.log('PATH', process.env.NODE_PATH);
  // Adding Webpack middleware
  app.use((0, _koaWebpack2.default)({
    config: webpackConfig
  }));
} else {
  app.use(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx.type = 'html';
              ctx.body = _fs2.default.createReadStream(html, { encodign: 'utf8' });
              _context.next = 4;
              return next;

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

app.listen(port);
console.log('Your SPA is now running on port ' + port);
