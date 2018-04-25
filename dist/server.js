#!/usr/bin/env node
import 'babel-polyfill'
import assert from 'assert'
import { isString } from 'lodash'
import Koa from 'koa'
import serve from 'koa-static'
import webpackHmrMidleware from 'koa-webpack'
import path from 'path'
import fs from 'fs'

const port = process.env.PORT || '9000'
const hotModuleReplacement = process.env.HOT_MODULES || 'false'
const setWebpackConfigFile = process.env.WEBPACK_CONFIG_FILE || './webpack.dev.js'
const resolveWebpackFolder = path.resolve(setWebpackConfigFile)
const webpackConfig = require(resolveWebpackFolder)
const setStaticFolder = process.env.PUBLIC_DIR || './dist/public'
const getHTML = process.env.HTML || './index.html'
const html = path.resolve(getHTML)

assert(isString(port), 'Invalid port')
assert(isString(hotModuleReplacement), 'Invalid Webpack HMR Setup')
assert(isString(setWebpackConfigFile), 'Invalid Webpack config file path')
assert(isString(setStaticFolder), 'Invalid static folder path')
assert(isString(getHTML), 'Invalid HTML file path')

const app = new Koa()

// Serve static files
app.use(serve(path.resolve(setStaticFolder)))

// Use webpack hot module middleware in development
if (hotModuleReplacement === 'true') {
  console.log('PATH', process.env.NODE_PATH)
  // Adding Webpack middleware
  app.use(webpackHmrMidleware({
    config: webpackConfig
  }))
} else {
  app.use(async (ctx, next) => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream(html, {encodign: 'utf8'})
    await (next)
  })
}

app.listen(port)
console.log('Your SPA is now running on port ' + port)
