export const typescript = {
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@croct/javascript',
    ],
    plugins: [
        '@typescript-eslint',
        '@croct',
    ],
    rules: {
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'generic',
            },
        ],
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/strict-boolean-expressions': [
            'error',
            {
                allowString: false,
                allowNumber: false,
                allowNullableObject: false,
            },
        ],
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',

        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': [
            'error',
            {
                ignoreTypeValueShadow: true,
                ignoreFunctionTypeParameterNameValueShadow: true,
            },
        ],
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': [
            'error',
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': 'error',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
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
            },
        ],
    },
};
