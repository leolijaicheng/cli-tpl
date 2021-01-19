const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const AutoDllPlugin = require('autodll-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))
const threadLoader = require('thread-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const resolve = function(paths){
    return path.resolve(__dirname,paths)
}

threadLoader.warmup({},[
    'babel-loader',
    '@babel/preset-env'
])

const isDev = argv.mode === 'development'

const webpackConfig = {
    entry:{
        app:resolve('../src/main.js')
    },
    output:{
        path:resolve('../dist'),
        filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:8].js'
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
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    isDev ? 'style-loader' : { 
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                     },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.jsx?$/,
                include:[resolve('../src')],
                use:[
                   'thread-loader',
                   'babel-loader'
                ]
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10240,
                            name:resolve('[name].[hash:8].[ext]'),
                            outputPath:'static/image'
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
             
            },
            {
                test:/(\.(ttf|woff|eot)$|iconfont\.svg)/,
                loader:'file-loader',
                options:{
                    name:'[name].[hash:8].[ext]',
                    outputPath:'static/font'
                }
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
                    name:'vendor',
                    test:/[\\/]node_modules[\\/]/,
                    priority:10
                }
            }
        }
    },
    stats:'errors-only',
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
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                { 
                    from:resolve('../public'),
                    to:resolve('../dist/static'),
                    filter:(resourcePath) => {
                        if(resourcePath.indexOf('.html') > -1){
                            return false
                        }
                        return true
                    }
                }
            ]
        }),
        new FriendlyErrorsWebpackPlugin()
    ]
}
if(!isDev){
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename:'static/css/[name].[contenthash:8].css',
            chunkFilename:'static/css/[id].[contenthash:8].css'
        })
    )
}


module.exports = webpackConfig