import type {ESLint, Linter} from 'eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
// @ts-expect-error - no types available
import jsxA11y from 'eslint-plugin-jsx-a11y';
// @ts-expect-error - no types available
import stylistic from '@stylistic/eslint-plugin';

const baseRules: Linter.RulesRecord = {
    // Custom rule
    '@croct/jsx-attribute-spacing': 'error',

    // React rules (from airbnb, with customizations)
    'react/display-name': 'off',
    'react/forbid-prop-types': ['error', {
        forbid: ['any', 'array', 'object'],
        checkContextTypes: true,
        checkChildContextTypes: true,
    }],
    'react/forbid-dom-props': ['off', {forbid: []}],
    'react/jsx-boolean-value': ['error', 'never', {always: []}],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-spacing': ['error', 'never', {allowMultiline: true}],
    'react/jsx-handler-names': ['off', {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
    }],
    'react/jsx-indent-props': 'off',
    'react/jsx-key': 'off',
    'react/jsx-max-props-per-line': ['error', {maximum: 1, when: 'multiline'}],
    'react/jsx-no-bind': [
        'error',
        {
            allowArrowFunctions: true,
            allowBind: false,
            allowFunctions: true,
        },
    ],
    'react/jsx-no-duplicate-props': ['error', {ignoreCase: true}],
    'react/jsx-no-literals': ['off', {noStrings: true}],
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': ['error', {
        allowAllCaps: true,
        ignore: [],
    }],
    'react/sort-prop-types': ['off', {
        ignoreCase: true,
        callbacksLast: false,
        requiredFirst: false,
        sortShapeProp: true,
    }],
    'react/jsx-sort-prop-types': 'off',
    'react/jsx-sort-props': [
        'error',
        {
            noSortAlphabetically: true,
            multiline: 'last',
        },
    ],
    'react/jsx-sort-default-props': ['off', {
        ignoreCase: true,
    }],
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/no-danger': 'warn',
    'react/no-deprecated': ['error'],
    'react/no-did-mount-set-state': 'off',
    'react/no-did-update-set-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/no-direct-mutation-state': 'off',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': 'off',
    'react/no-set-state': 'off',
    'react/no-string-refs': 'error',
    'react/no-unknown-property': 'error',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-stateless-function': ['error', {ignorePureComponents: true}],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': ['error', {
        order: [
            'static-variables',
            'static-methods',
            'instance-variables',
            'lifecycle',
            '/^handle.+$/',
            '/^on.+$/',
            'getters',
            'setters',
            '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
            'instance-methods',
            'everything-else',
            'rendering',
        ],
        groups: {
            lifecycle: [
                'displayName',
                'propTypes',
                'contextTypes',
                'childContextTypes',
                'mixins',
                'statics',
                'defaultProps',
                'constructor',
                'getDefaultProps',
                'getInitialState',
                'state',
                'getChildContext',
                'getDerivedStateFromProps',
                'componentWillMount',
                'UNSAFE_componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'UNSAFE_componentWillReceiveProps',
                'shouldComponentUpdate',
                'componentWillUpdate',
                'UNSAFE_componentWillUpdate',
                'getSnapshotBeforeUpdate',
                'componentDidUpdate',
                'componentDidCatch',
                'componentWillUnmount',
            ],
            rendering: [
                '/^render.+$/',
                'render',
            ],
        },
    }],
    'react/jsx-wrap-multilines': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-indent': ['error', 4],
    'react/jsx-no-target-blank': ['error', {enforceDynamicLinks: 'always'}],
    'react/jsx-filename-extension': [
        1,
        {
            extensions: ['.tsx'],
        },
    ],
    'react/jsx-no-comment-textnodes': 'error',
    'react/no-render-return-value': 'error',
    'react/require-optimization': ['off', {allowDecorators: []}],
    'react/no-find-dom-node': 'error',
    'react/forbid-component-props': ['off', {forbid: []}],
    'react/forbid-elements': ['off', {forbid: []}],
    'react/no-danger-with-children': 'error',
    'react/no-unused-prop-types': ['error', {
        customValidators: [],
        skipShapeProps: true,
    }],
    'react/style-prop-object': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-children-prop': 'error',
    'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
    }],
    'react/jsx-space-before-closing': ['off', 'always'],
    'react/no-array-index-key': 'error',
    'react/require-default-props': 'off',
    'react/forbid-foreign-prop-types': ['warn', {allowInPropTypes: true}],
    'react/void-dom-elements-no-children': 'error',
    'react/default-props-match-prop-types': ['error', {allowRequiredDefaults: false}],
    'react/no-redundant-should-component-update': 'error',
    'react/no-unused-state': 'error',
    'react/boolean-prop-naming': ['off', {
        propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
        message: '',
    }],
    'react/no-typos': 'error',
    'react/jsx-curly-brace-presence': ['error', {props: 'never', children: 'never'}],
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'error',
    'react/button-has-type': ['error', {
        button: true,
        submit: true,
        reset: false,
    }],
    'react/jsx-child-element-spacing': 'off',
    'react/no-this-in-sfc': 'error',
    'react/jsx-max-depth': 'off',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/no-unsafe': 'off',
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-curly-newline': ['error', {
        multiline: 'consistent',
        singleline: 'consistent',
    }],
    'react/state-in-constructor': ['error', 'always'],
    'react/static-property-placement': ['error', 'property assignment'],
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-read-only-props': 'off',
    'react/jsx-no-script-url': ['error', [
        {
            name: 'Link',
            props: ['to'],
        },
    ]],
    'react/jsx-no-useless-fragment': [
        'error',
        {
            allowExpressions: true,
        },
    ],
    'react/no-adjacent-inline-elements': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-newline': [
        'error',
        {
            prevent: true,
        },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/no-unstable-nested-components': [
        'error',
        {
            allowAsProps: true,
        },
    ],
    'react/no-namespace': 'error',
    'react/prefer-exact-props': 'error',
    'react/no-arrow-function-lifecycle': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-unused-class-component-methods': 'error',

    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Testing Library rules (overrides)
    'testing-library/no-container': 'off',
    'testing-library/no-node-access': 'off',
    'testing-library/await-async-utils': 'off',

    // JSX A11y rules (overrides)
    'jsx-a11y/aria-role': [
        'error',
        {
            ignoreNonDOM: true,
        },
    ],

    // Underscore dangle override for Redux DevTools
    'no-underscore-dangle': ['error', {
        allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
    }],

    // Class methods use this override for React lifecycle methods
    'class-methods-use-this': ['error', {
        exceptMethods: [
            'render',
            'getInitialState',
            'getDefaultProps',
            'getChildContext',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
            'componentDidCatch',
            'getSnapshotBeforeUpdate',
        ],
    }],

    // Import restrictions
    'no-restricted-imports': [
        'error',
        {
            name: 'react',
            importNames: ['default'],
            message: 'The React runtime is automatically imported, '
                + 'you can simply omit the import declaration in this case.',
        },
    ],

    // Import order for React (using import-x)
    'import-x/order': [
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
            pathGroupsExcludedImportTypes: ['react'],
            'newlines-between': 'never',
            alphabetize: {
                order: 'asc',
                caseInsensitive: true,
            },
        },
    ],
};

// Factory function to create React config with the plugin reference
export function createReactConfig(plugin: ESLint.Plugin, javascriptConfig: Linter.Config[]): Linter.Config[] {
    return [
        ...javascriptConfig,
        reactPlugin.configs.flat.recommended,
        testingLibrary.configs['flat/react'],
        jestDom.configs['flat/recommended'],
        jsxA11y.flatConfigs.recommended as Linter.Config,
        {
            name: '@croct/react',
            plugins: {
                'react-hooks': reactHooks,
                '@stylistic': stylistic,
                '@croct': plugin,
            },
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
            },
            settings: {
                'import-x/resolver': {
                    node: {
                        extensions: ['.js', '.jsx', '.json'],
                    },
                },
                react: {
                    pragma: 'React',
                    version: 'detect',
                },
                propWrapperFunctions: [
                    'forbidExtraProps',
                    'exact',
                    'Object.freeze',
                ],
            },
            rules: baseRules,
        },
    ];
}
