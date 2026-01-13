const eslintPlugin = require('eslint-plugin-eslint-plugin');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const jest = require('eslint-plugin-jest');
const importPlugin = require('eslint-plugin-import');
const eslintComments = require('eslint-plugin-eslint-comments');

module.exports = [
    eslintPlugin.configs['flat/recommended'],
    {
        files: ['src/**/*.ts'],
        plugins: {
            '@typescript-eslint': tseslint,
            'jest': jest,
            'import': importPlugin,
            'eslint-comments': eslintComments,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        rules: {
            // TypeScript ESLint recommended rules
            ...tseslint.configs.recommended.rules,

            // TypeScript specific rules from @croct/typescript config
            '@typescript-eslint/array-type': ['error', {
                default: 'array-simple',
            }],
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/strict-boolean-expressions': ['error', {
                allowString: false,
                allowNumber: false,
                allowNullableObject: false,
            }],
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/no-shadow': ['error', {
                ignoreTypeValueShadow: true,
                ignoreFunctionTypeParameterNameValueShadow: true,
            }],
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/explicit-member-accessibility': ['error'],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/explicit-function-return-type': ['error'],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-use-before-define': 'off',
            '@typescript-eslint/no-unused-expressions': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {
                args: 'after-used',
                ignoreRestSiblings: true,
            }],
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-namespace': 'off',

            // Disable base rules in favor of TypeScript versions
            'no-shadow': 'off',
            'no-use-before-define': 'off',
            'no-unused-expressions': 'off',
            'no-unused-vars': 'off',
            'no-undef': 'off',

            // JavaScript rules from @croct/javascript config (subset relevant for this project)
            'indent': ['error', 4, {SwitchCase: 1}],
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single', {avoidEscape: true}],
            'semi': ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'max-len': ['error', {code: 120}],
            'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0, maxBOF: 0}],
            'eol-last': ['error', 'always'],
            'object-curly-spacing': ['error', 'never'],

            // Import rules
            'import/no-duplicates': 'error',
            'import/first': 'error',
            'import/newline-after-import': 'error',

            // ESLint comments rules
            'eslint-comments/disable-enable-pair': ['error', {allowWholeFile: true}],
            'eslint-comments/no-unused-disable': 'error',
        },
    },
    {
        files: ['src/**/*.test.ts'],
        plugins: {
            'jest': jest,
        },
        rules: {
            ...jest.configs.recommended.rules,
            'jest/consistent-test-it': ['error', {fn: 'it'}],
            'jest/prefer-lowercase-title': ['error', {ignore: ['describe']}],
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    },
];
