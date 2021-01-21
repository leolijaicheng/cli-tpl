const opn = require('opn')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const config = require('../config/index')
const express = require('express')
const webpack = require('webpack')
const { createProxyMiddleware  } = require('http-proxy-middleware')
const webpackConfigDev = require('./webpack.dev')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')

process.env.NODE_ENV = 'development'

const port = process.env.port || config.dev.port

const autoOpenBrowser = config.dev.autoOpenBrowser

const proxyTable = config.dev.proxy

const app = express()

const compiler = webpack(webpackConfigDev)

const devMiddleware = webpackDevMiddleware(compiler)

const hotMiddleware = webpackHotMiddleware(compiler,{
    log:false,
    heartbeat:2000
})

Object.keys(proxyTable).forEach(function(context){
    const options = proxyTable[context]

    if(typeof options === 'string'){
        options = { target:options }
    }

    app.use(createProxyMiddleware(options.filter || context,options))

})

// app.use(history())

app.use(devMiddleware)

app.use(hotMiddleware)

const staticPath = path.posix.join(config.build.assetsPublicpath,config.build.assetsSubDirectory)


app.use(staticPath,express.static('./static'))


const uri = 'http://localhost:' + port

let _resolve

const readyPromise = new Promise(resolve => {
    _resolve = resolve
})

const files = glob.sync('./mock/**/*js')

files.forEach(function(f){
    const fileContent = require(path.resolve(__dirname,'..',f))

    Object.keys(fileContent).forEach(rq => {
        app.use(rq,fileContent[rq])
    })
    
})

devMiddleware.waitUntilValid(() => {

    console.log('\n')

    console.log(chalk.yellow('=> Server running at ' + uri + '\n'))
    
    if(autoOpenBrowser){
        opn(uri)
    }

    _resolve()
})

const server = app.listen(port)

module.exports = {
    ready:readyPromise,
    close:() => {
        server.close()
    }
}




