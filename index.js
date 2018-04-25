'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotModuleMiddleware = exports.staticOpts = exports.staticRoot = exports.staticMiddleware = exports.routerMiddleware = undefined;

require('babel-polyfill');

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaWebpack = require('koa-webpack');

var _koaWebpack2 = _interopRequireDefault(_koaWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routerMiddleware = exports.routerMiddleware = _koaRouter2.default;
var staticMiddleware = exports.staticMiddleware = _koaStatic2.default;
var staticRoot = exports.staticRoot = _koaStatic.root;
var staticOpts = exports.staticOpts = _koaStatic.opts;
var hotModuleMiddleware = exports.hotModuleMiddleware = _koaWebpack2.default;
