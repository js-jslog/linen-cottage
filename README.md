# SPA server

A simple backend for single page apps that provides the following:

- forwarding config (from environment variables) to the SPA
- serving static files
- (for development) webpack hotmodule reloading

## Installing

```sh
$ yarn add git ssh://git@rulsoft:11022/rulsoft/spa-server.git
```

## Using

Add the following to your `package.json`

```json
{
    "scripts": {
        "start": "spa-server"
    }
}
```

and `yarn run start` will start the SPA server with the default behaviour (see below for how to customise).


## Changing port

Out-of-the-box SPA server listens on port 9000, you can override this by setting the `PORT` environment variable:

```sh
$ PORT=3001 yarn run start
```

## Providing config to the SPA

spa-server forwards selective environment variables to the SPA. The server makes environment variables prefixed with `SPA_` available on `/config` as a json object. For example if the following environment variables are set in the `docker-compose.yml`

```yaml
services:
    spa:
        environment:
            - LOG_MODE="local"
            - SPA_USER_SERVICE="https://users-service"
            - SPA_CANDIDATE_SERVICE="https://candidates-service"
```

then a `GET` to `/config` would return the following json

```json
{
    "CANDIDATE_SERVICE": "https://user-service",
    "USER_SERVICE": "https://candidates-service"
}
```

## Serving static files

spa-server serves static files from `./dist/public`,  This can be changed by using the  `PUBLIC_DIR` environment variable to specify a different location:

```sh
$ PUBLIC_DIR=./dist/www yarn run start
```
## Serving static files

spa-server will serve an html template for your react app from `./index.html`,  This can be changed by using the  `HTML` environment variable to specify a different location:

```sh
$ HTML=./mycustom.html yarn run start
```

## Hotmodule reloading

By default webpack hot module reloading is disabled, but for local development you can enable it by setting the `HOT_MODULES` environment varialbe:

```sh
$ HOT_MODULES=true yarn run start
```

spa-server expects the dev version of the webpack config to be located in `./webpack.dev.js`, this can be changed using the `WEBPACK_CONFIG_FILE` environment variable:

```sh
$ WEBPACK_CONFIG_FILE=./config/webpack.config.dev.js yarn run start
```

## Custom server

If you need more than the out-of-the-box behaviour, you can include the SPA server middleware in your own koajs server for example:


```js
// app.js
import koa from 'koa'
import webpackConfig from './mywebapck.config.js'
import {
    routerMiddleware,
    staticMiddleware,
    // Some additional setting for the static middleware
    staticRoot,
    staticOpts,
    hotModuleMiddleware
} from 'spa-server'

const port = process.env.PORT || 3001
const publicDir = './dist/www'

const app = new Koa()

app.use(routerMiddleware.routes())
app.use(staticMiddleware(publicDir))

const hotModules = process.env.HOT_MODULES || false

if (hotModules) {
    app.use(hotModuleMiddleware({
        config = webpackConfig
    }))
}

const server = app.listen(port)
``` 

## Built With

* [koajs](http://koajs.com/) - Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.
* [koa-router](https://github.com/alexmingoia/koa-router) Router middleware for koa
* [koa-static](https://github.com/koajs/static) Koa static file serving middleware, wrapper for koa-send
* [koa-webpack](https://github.com/shellscape/koa-webpack) Development and Hot Module Reload Middleware for Koa2, in a single middleware module.
* [koa-webpack](https://github.com/DamonOehlman/detect-browser)
* [lodash](https://lodash.com/) A modern JavaScript utility library delivering modularity, performance & extras. 

