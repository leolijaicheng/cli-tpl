const webpack = require('webpack')
const path = require('path')
const cleanWebpackPlugin = require('clean-webpack-plugin')


const resolve = (dir) => path.join(__dirname,'..',dir)

module.exports = {
    entry:{
        vendor:['vue','vue-router','lodash']
    },
    output:{
        path:resolve('public'),
        library:'_dll_[name]',
        filename:'dll/_dll_[name].[hash].js'
    },
    plugins:[
        new cleanWebpackPlugin(['dll'],{
            root:resolve('public')
        }),
        new webpack.DllPlugin({
            name:'_dll_[name]',
            path:path.join(__dirname,'../public/dll','[name].mainfest.json')
        })
    ]
}