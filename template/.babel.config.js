module.exports = {
    presets: [
        [
            "@babel/preset-env",
            { 
                "useBuiltIns":"entry",
                "corejs":{
                    "version":3
                },
                "targets":"defaults",
                "modules":false
            }
        ]
    ],
    plugins:[
        ["@babel/plugin-transform-runtime",{ "corejs":3 }]
    ]
}