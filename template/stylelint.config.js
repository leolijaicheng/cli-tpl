module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-sass-guidelines',
        "stylelint-config-prettier"
    ],
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules:{
        "declaration-block-trailing-semicolon": null
    }
}