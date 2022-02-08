export const react = {
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'plugin:@croct/javascript',
    ],
    plugins: [
        'import',
        'react',
        'react-hooks',
        'testing-library',
        'jest-dom',
        '@croct',
    ],
    rules: {
        '@croct/jsx-attribute-spacing': 'error',
        'react/jsx-wrap-multilines': 'error',
        'react/display-name': 'off',
        'react/jsx-newline': [
            'error',
            {
                prevent: true,
            },
        ],

        'react/jsx-no-bind': [
            'error',
            {
                allowArrowFunctions: true,
                allowBind: false,
                allowFunctions: true,
            },
        ],
        'react/no-unstable-nested-components': [
            'error',
            {
                allowAsProps: true,
            },
        ],
        'react/jsx-no-useless-fragment': [
            'error',
            {
                allowExpressions: true,
            },
        ],
        'react/function-component-definition': 'off',
        'testing-library/no-container': 'off',
        'testing-library/no-node-access': 'off',
        'testing-library/await-async-utils': 'off',
        'jsx-a11y/aria-role': [
            'error',
            {
                ignoreNonDOM: true,
            },
        ],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/jsx-fragments': [
            'error',
            'element',
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: [
                    '.tsx',
                ],
            },
        ],
        'react/jsx-indent': [
            'error',
            4,
        ],
        'react/jsx-indent-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-restricted-imports': [
            'error',
            {
                name: 'react',
                importNames: [
                    'default',
                ],
                message: 'The React runtime is automatically imported, '
                    + 'you can simply omit the import declaration in this case.',
            },
        ],
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: [
                    'react',
                ],
                'newlines-between': 'never',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
};
