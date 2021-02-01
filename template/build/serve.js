const handler = require('serve-handler')
const http = require('http')
const path = require('path')
const chalk = require('chalk')
const opn = require('opn')


const server = http.createServer((req,res) => {
    return handler(req,res,{
        public:path.join(__dirname,'..','dist')
    })
})

server.listen(3000,() => {
    
    console.log(chalk.yellow('Running at http://localhost:3000'))

    opn('http://localhost:3000')
})