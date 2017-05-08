// {
//     "parserOptions": {
//         "ecmaVersion": 6,
//         "sourceType": "module"
//     },
//     "env": {
//         "browser": false,
//         "node": true
//     },
//     "rules": {
//         "no-extend-native": "off",
//         "quotes": ["error", "single"]
//     }
// }

module.exports = {
    "globals": {"Promise": true},
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "env": {
        "browser": false,
        "node": true
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "quotes": ["error", "single"],

        // override default options for rules from base configurations

        // disable rules from base configurations
        "no-extend-native": "off",
        "no-console": "off"
    }
}