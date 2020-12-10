const merge = require('webpack-merge').default
const base = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')


module.exports = merge(base,{
    mode:'production',
    plugins:[
        new CleanWebpackPlugin(),

       new CompressionPlugin({
           test:/\.(js|html|css)$/,
           threshold:10240,
           deleteOriginalAssets:false
       })
    ]
})