const path = require('path')
const fs = require('fs')

const lintStyles = ['standard','airbnb']

exports.sortDependencies = function sortDependencies(data){
    const packageJsonFile = path.join(
        data.inPlace ? '' : data.destDirName,
        'package.json'
    )
    const packageJson = JSON.parse(fs.readFileSync(packageJsonFile))
    packageJson.devDependencies = sortObject(packageJson.devDependencies)
    packageJson.dependencies = sortObject(packageJson.dependencies)

    fs.writeFileSync(packageJsonFile,JSON.stringify(packageJson,null,2) + '\n')
}


exports.installDependencies = function installDependencies(
    cwd,
    executable = 'npm',
    color
){
    console.log(`\n\n# ${color('Installing project dependencies ...')}`)
    console.log('# ===================\n')
    return runCommand(executable,['install'],{ cwd })
}


exports.runLintFix = function runLintFix(cwd,data,color){
   if(data.lint && lintStyles.indexOf(data.lintConfig) !== -1){
       console.log(
           `\n\n${color(
               'Running eslint --fix to comply with chosen preset rules...'
           )}`
       )
       console.log('# ===============\n')
       const args = 
          data.autoInstall === 'npm' 
           ? ['run','lint','--','--fix']
           : ['run','lint','--fix']
       return runCommand(data.autoInstall,args,{ cwd })
   }
   return Promise.resolve()
}

exports.printMessage = function printMessage(data,{ green,yellow }){
    const message = `
# ${green('Project initialization finished!')}
# ===================

To get started:

   ${yellow(
       `${data.inPlace ? '' : `cd ${data.destDirName}\n `}${installMsg(
           data
       )}${lintMsg(data)}  npm run dev`
   )}

Documentation can be found at https://vuejs-templates.github.io/webpack
`

   console.log(message)
} 


function lintMsg(data){
    return !data.autoInstall && 
       data.lint && 
       lintStyles.indexOf(data.lintConfig) !== -1
       ? '  npm run lint -- --fix (or for yarn:yarn run lint --fix)\n '
       : ''
}


function installMsg(data){
    return !data.autoInstall ? '  npm install (or if using yarn:yarn)\n ': ''
}


function runCommand(cmd,args,options){
    return new Promise((resolve,reject) => {
        const spawn =  require('child_process').spawn(
            cmd,
            args,
            Object.assign(
                {
                    cwd:process.cwd(),
                    stdio:'inherit',
                    shell:true
                },
                options
            )
        )

        spawn.on('exit',() => {
            resolve()
        })
    })
}

function sortObject(object){
    const sortedObject = {}
    Object.keys(object)
       .sort()
       .forEach(item => {
           sortedObject[item] = object[item]
       })
    return sortedObject
}