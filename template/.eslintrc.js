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
  rules: {
    "no-console":process.env.NODE_ENV === 'proeduction' ? 'error' : 'off',
    "indent":["warn",2,{
      "SwitchCase":1,
      "VariableDeclarator":{ "var":2,"let":2,"const":3 }
    }]
  }
};
