const path = require('path')

module.exports ={
    dev:{
       env:require('./dev.env'),
       port:8091,
       autoOpenBrowser:true,
       host:'localhost',
       proxy:{
           '/dev/':{
               target:'http://localhost:9528',
               changeOrigin:true
           }
       }
    },
    build:{
      env:require('./prod.env'),
      assetsRoot:path.join(__dirname,'../dist'),
      assetsSubDirectory:'static',
      assetsPublicpath:'./',
      sourceMap:false,
      gzip:false,
      gzipExtensions:['js','css'],
      bundleAnalyzerReport:process.env.npm_config_report
    }
}