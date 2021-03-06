const path = require('path')
const {
    sortDependencies,
    installDependencies,
    runLintFix,
    printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

module.exports = {
    metalmith:{},
    helpers:{
        if_or(v1,v2,options){
            if(v1 || v2){
                return options.fn(this)
            }
            return options.inverse(this)
        },
        if_es(v1,v2,v3,options){
           if(v1 === v2 || v1 === v3){
               return options.fn(this)
           }
           return options.inverse(this)
        },
        template_version(){
            return templateVersion
        }
    },
    prompts:{
        name:{
            type:'string',
            required:true,
            message:'Project name'
        },
        description:{
            type:'string',
            required:false,
            message:'Project description',
            default:'A Vue.js initialize project'
        },
        author:{
            type:'string',
            message:'Author'
        },
        build:{
            type:'list',
            message:'Vue build',
            choices:[
                {
                    name:'Runtime + compiler:recomended for most users',
                    value:'standalone',
                    short:'standalone'
                },
                {
                    name:
                      'Runtime-only: about 6KB lighter min+gzip,but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere',
                    value:'runtime',
                    short:'runtime'
                }
            ]
        },
        router:{
            type:'comfirm',
            message:'Install vue-router ?',
            default:true
        },
        vuex:{
            type:'comfirm',
            message:'Install vuex ?',
            default:true
        },
        lint:{
            type:'comfirm',
            message:'Use ESLint to lint your code ?',
            default:true
        },
        lintConfig:{
            when:'lint',
            type:'list',
            message:'Pick an ESLint preset',
            choices:[
                {
                    name:'Standard (https://github.com/standsrd/standard)',
                    value:'standard',
                    short:'Standard'
                },
                {
                    name: 'Airbnb (https://github.com/airbnb/javascript)',
                    value: 'airbnb',
                    short: 'Airbnb',
                },
                {
                    name: 'none (configure it yourself)',
                    value: 'none',
                    short: 'none',
                }
            ]
        },
        autoInstall:{
            type:'list',
            message:
               'Should we run `npm install` for you after the project has been created?(recomended)',
            choices: [
                {
                    name: 'Yes, use NPM',
                    value: 'npm',
                    short: 'npm',
                },
                {
                    name: 'Yes, use Yarn',
                    value: 'yarn',
                    short: 'yarn',
                },
                {
                    name: 'No, I will handle that myself',
                    value: false,
                    short: 'no',
                }
            ]
        }
    },
    filters: {
        '.eslintrc.js': 'lint',
        '.eslintignore': 'lint',
        'src/router/**/*': 'router',
    },
    complete:function(data,{ chalk }){
        const green = chalk.green

        sortDependencies(data,green)

        const cwd = path.join(process.cwd(),data.inPlace ? '' : data.destDirName)


        if(data.autoInstall){
            installDependencies(cwd,data.autoInstall,green)
               .then(() => {
                   return runLintFix(cwd,data,green)
               })
               .then(() => {
                   printMessage(data,green)
               })
               .catch(e => {
                   console.log(chalk.red('Error:'),e)
               })
        }else{
            printMessage(data,chalk)
        }
    }
}