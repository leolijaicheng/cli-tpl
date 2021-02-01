const merge = require('webpack-merge').default
const base = require('./webpack.base')
const env = require('../config/prod.env')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')


module.exports = merge(base,{
    mode:'production',
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            env:env
        }),
        new CompressionPlugin({
            test:/\.(js|html|css)$/,
            threshold:10240,
            deleteOriginalAssets:false
        })
    ]
})