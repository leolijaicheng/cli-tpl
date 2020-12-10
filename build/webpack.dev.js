const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const webpack = require('webpack')


module.exports = merge(base,{
    mode:'development',
    entry:{
        index:['./src/main.js','webpack-hot-middleware/client?noInfo=true&reload=true']
    },
    performance:{
      hints:false
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
    // devServer:{
    //     contentBase:'./dist',
    //     port:'8090',
    //     inline:true,
    //     historyApiFallback:true,
    //     hot:true
    // }
})