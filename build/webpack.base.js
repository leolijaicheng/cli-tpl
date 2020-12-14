const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const AutoDllPlugin = require('autodll-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))

const resolve = function(paths){
    return path.resolve(__dirname,paths)
}

const isDev = argv.mode === 'development'

console.log(isDev)


const webpackConfig = {
    entry:{
        index:resolve('../src/main.js')
    },
    output:{
        path:resolve('../dist'),
        filename: isDev ? '[name].js' : 'js/[name].[chunkhash:8].js'
    },
    resolve:{
        alias:{
           '@':resolve('../src')
        },
        extensions:['.vue','.js','.json']
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    isDev ? 'style-loader' : { 
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                     },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    isDev ? 'style-loader' : { 
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                     },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.js$/,
                include:[resolve('../src')],
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            ['@babel/preset-env',{ targets:'defaults' }]
                        ]
                    }
                }
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10000,
                            name:resolve('img/[name].[hash:7].[ext]')
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        options:{
                            mozjpeg:{
                                progressive:true,
                                quality:65
                            },
                            webp:{
                                quality:75
                            }
                        }
                    }
                ]
             
            }
        ]
    },
    optimization:{
        minimizer:isDev ? [] : [

            new TerserPlugin(),

            //压缩css
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks:{
            chunks:'all',
            cacheGroups:{
                vendor:{
                    name:'venedor',
                    test:/[\\/]node_modules[\\/]/,
                    priority:10
                }
            }
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'cli模板',
            template:path.resolve(__dirname,'../public/index.html'),
            inject:true
        }),
        new AutoDllPlugin({
            // context:resolve('..'),
            inject:true,
            debug:true,
            filename:'[name]_[hash].js',
            path:'./dll',
            entry:{
                vendor:[
                    'vue',
                    'vue-router',
                    'lodash'
                ]
            }
        }),
        new VueLoaderPlugin()
        // new webpack.DllReferencePlugin({
        //     mainfest:require('../public/dll/vendor.manifest')
        // })
    ]
}
if(!isDev){
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename:'css/[name].[contenthash:8].css',
            chunkFilename:'css/[id].[contenthash:8].css'
        })
    )
}


module.exports = webpackConfig