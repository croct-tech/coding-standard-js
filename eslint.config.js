const eslintPlugin = require('eslint-plugin-eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const self = require('eslint-plugin-self');

module.exports = [
    eslintPlugin.configs['flat/recommended'],
    {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        plugins: {
            self: self,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['**/tsconfig.json'],
            },
        },
        rules: {
            ...self.configs.typescript.rules,
        },
    },
];
