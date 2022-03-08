export const javascript = {
    extends: [
        'plugin:jest/recommended',
        'airbnb-base',
    ],
    plugins: [
        'jest',
        'import',
        'no-smart-quotes',
        'import-newlines',
        '@croct',
    ],
    rules: {
        '@croct/argument-spacing': 'error',
        '@croct/complex-expression-spacing': 'error',
        'no-plusplus': 'off',
        'array-bracket-newline': [
            'error',
            'consistent',
        ],
        'multiline-ternary': [
            'error',
            'always-multiline',
        ],
        'no-undef-init': 'error',
        'jest/consistent-test-it': [
            'error',
            {
                fn: 'it',
            },
        ],
        'jest/no-large-snapshots': 'off',
        'jest/prefer-expect-resolves': 'error',
        'jest/prefer-lowercase-title': [
            'error',
            {
                ignore: ['describe'],
            },
        ],
        'jest/prefer-spy-on': 'error',
        'jest/require-top-level-describe': 'error',
        'jest/prefer-to-contain': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-equality-matcher': 'error',
        'jest/no-test-return-statement': 'error',
        'function-call-argument-newline': [
            'error',
            'consistent',
        ],
        'no-underscore-dangle': 'off',
        'import/no-default-export': 'error',
        'array-element-newline': [
            'error',
            'consistent',
        ],
        'import-newlines/enforce': [
            'error',
            {
                items: 6,
                'max-len': 100,
            },
        ],
        'no-smart-quotes/no-smart-quotes': 'error',
        'no-shadow': 'error',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-use-before-define': 'error',
        'arrow-parens': [
            'error',
            'as-needed',
        ],
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        'default-case': 'off',
        'import/extensions': [
            'error',
            'never',
            {
                d: 'always',
                json: 'always',
            },
        ],
        'import/no-unresolved': 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'max-classes-per-file': 'off',
        'max-len': [
            'error',
            {
                code: 100,
                ignoreStrings: false,
                ignoreComments: false,
                ignoreTemplateLiterals: false,
                ignoreTrailingComments: false,
                ignoreUrls: false,
            },
        ],
        'no-await-in-loop': 'off',
        'no-bitwise': 'off',
        'no-continue': 'off',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxEOF: 0,
                maxBOF: 0,
            },
        ],
        'no-unused-expressions': 'error',
        'no-unused-vars': 'error',
        'no-restricted-syntax': [
            'error',
            'ForInStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        'object-curly-newline': [
            'error',
            {
                multiline: true,
                consistent: true,
            },
        ],
        'object-curly-spacing': [
            'error',
            'never',
        ],
        'require-await': 'error',
        'object-shorthand': [
            'error',
            'never',
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'try',
                ],
            },
            {
                blankLine: 'always',
                prev: [
                    'break',
                    'return',
                ],
                next: [
                    'case',
                    'default',
                ],
            },
            {
                blankLine: 'always',
                prev: [
                    'const',
                    'let',
                    'var',
                ],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: [
                    'const',
                    'let',
                    'var',
                ],
                next: [
                    'const',
                    'let',
                    'var',
                ],
            },
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'return',
                    'if',
                    'function',
                    'block',
                    'block-like',
                ],
            },
        ],
    },
    overrides: [
        {
            files: [
                'src/**/*.test.js',
                'test/**/*.js',
            ],
            extends: ['plugin:jest/recommended'],
            plugins: ['jest'],
            rules: {
                'no-new-object': 'off',
            },
            env: {
                jest: true,
            },
        },
    ],
};
