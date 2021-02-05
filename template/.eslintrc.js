const { webpack } = require("webpack")

module.exports = {
  root:true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    {{#if_eq lintConfig "standard"}}
    "standard",
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    "airbnb-base",
    {{/if_eq}}
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    "parser":"babel-eslint",
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  plugins: [
    "vue"
  ],
  {{#if_es lintConfig "standard" "airbnb"}}
  settings:{
    'import/resolver':{
      webpack:{
        config:'build/webpack.base.js'
      }
    }
  },
  {{/if_es}}
  rules: {
    {{#if_eq lintConfig "standard"}}
    "gengerator-star-spacing":"off",
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
     "import/extensions":['error','always',{
       js:"never",
       vue:"never"
     }],
     "no-param-reassign":["error",{
       props:true,
       ingorePropertyModificationsFor:[
         'state',
         'acc',
         'e'
       ]
     }],
    {{/if_eq}}
    "no-debugger":process.env.NODE_ENV === 'production' ? 'error' :'off',
    "no-console":process.env.NODE_ENV === 'proeduction' ? 'error' : 'off',
    "indent":["warn",2,{
      "SwitchCase":1,
      "VariableDeclarator":{ "var":2,"let":2,"const":3 }
    }]
  }
};
