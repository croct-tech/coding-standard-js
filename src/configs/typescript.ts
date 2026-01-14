import type {Linter, ESLint} from 'eslint';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
// @ts-expect-error - no types available
import stylistic from '@stylistic/eslint-plugin';

const baseRules: Linter.RulesRecord = {
    'import-x/export': 'off',
    '@typescript-eslint/array-type': ['error', {
        default: 'array-simple',
    }],
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@stylistic/type-annotation-spacing': 'error',
    '@stylistic/semi': ['error', 'always'],
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
    '@typescript-eslint/no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@stylistic/indent': ['error', 4, {
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
    '@stylistic/object-curly-spacing': 'error',
    '@stylistic/member-delimiter-style': ['error', {
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
};

// Factory function to create TypeScript config with the plugin reference
export function createTypescriptConfig(plugin: ESLint.Plugin, javascriptConfig: Linter.Config[]): Linter.Config[] {
    return [
        ...javascriptConfig,
        ...tseslint.configs.recommendedTypeChecked,
        jest.configs['flat/recommended'],
        {
            name: '@croct/typescript',
            files: ['**/*.ts', '**/*.tsx'],
            plugins: {
                '@stylistic': stylistic,
                '@croct': plugin,
            },
            languageOptions: {
                parser: tsParser,
                parserOptions: {
                    // Enable type-aware linting
                    projectService: true,
                },
            },
            rules: baseRules,
        },
        {
            name: '@croct/typescript/tests',
            files: [
                'src/**/*.test.ts',
                'test/**/*.ts',
            ],
            rules: {
                'no-new-object': 'off',
            },
        },
    ];
}
