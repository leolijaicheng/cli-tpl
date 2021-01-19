const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const webpack = require('webpack')
const env = require('../config/dev.env')


module.exports = merge(base,{
    mode:'development',
    entry:{
        index:['./src/main.js','webpack-hot-middleware/client?noInfo=true&reload=true']
    },
    performance:{
      hints:'warning'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            env:env
        })
    ]
    // devServer:{
    //     contentBase:'./dist',
    //     port:'8090',
    //     inline:true,
    //     historyApiFallback:true,
    //     hot:true
    // }
})