export const typescript = {
    extends: ['plugin:@croct/javascript'],
    plugins: [
        '@typescript-eslint',
        '@croct',
    ],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended'],
            parser: '@typescript-eslint/parser',
            rules: {
                'import/export': 'off',
                '@typescript-eslint/array-type': ['error', {
                    default: 'array-simple',
                }],
                '@typescript-eslint/prefer-as-const': 'error',
                '@typescript-eslint/adjacent-overload-signatures': 'error',
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/semi': ['error', 'always'],
                '@typescript-eslint/strict-boolean-expressions': ['error', {
                    allowString: false,
                    allowNumber: false,
                    allowNullableObject: false,
                }],
                '@typescript-eslint/prefer-optional-chain': 'error',
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': ['error', {
                    ignoreTypeValueShadow: true,
                    ignoreFunctionTypeParameterNameValueShadow: true,
                }],
                '@typescript-eslint/no-empty-interface': 'off',
                '@typescript-eslint/explicit-member-accessibility': [
                    'error',
                ],
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/explicit-function-return-type': ['error'],
                '@typescript-eslint/no-explicit-any': 'off',
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': 'error',
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 'error',
                indent: ['error', 4, {
                    SwitchCase: 1,
                }],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        args: 'after-used',
                        ignoreRestSiblings: true,
                    },
                ],
                'no-unused-vars': 'off',
                '@typescript-eslint/no-non-null-assertion': 'off',
                'object-curly-spacing': 'off',
                '@typescript-eslint/object-curly-spacing': 'error',
                '@typescript-eslint/member-delimiter-style': ['error', {
                    multiline: {
                        delimiter: 'comma',
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: 'comma',
                        requireLast: false,
                    },
                    overrides: {
                        interface: {
                            singleline: {
                                delimiter: 'semi',
                            },
                            multiline: {
                                delimiter: 'semi',
                            },
                        },
                    },
                }],
                'no-undef': 'off',
                '@typescript-eslint/no-namespace': 'off',
                '@typescript-eslint/no-redeclare': ['error', {
                    ignoreDeclarationMerge: true,
                }],
            },
        },
        {
            files: [
                'src/**/*.test.ts',
                'test/**/*.ts',
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
