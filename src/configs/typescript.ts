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
    '@typescript-eslint/explicit-member-accessibility': [
        'error',
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
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
    '@typescript-eslint/restrict-template-expressions': 'off',

    // Disable rules that turn `any` into `unknown`, places where `unknown` is the preferred type
    // have that type already.
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-unary-minus': 'off',
    // Breaks with overloaded functions that implement both callback and Promise signatures
    '@typescript-eslint/no-misused-promises': 'off',
    // Doesn't detect classes that implement `toString` method
    '@typescript-eslint/no-base-to-string': 'off',
    // Conflict with TS promise ignore explicitly (void Promise)
    'no-void': 'off',
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
            name: '@croct/typescript-test-files',
            files: ['**/*.test.ts', '**/*.test.tsx'],
            rules: {
                // Prevent false warning when checking mocked interfaces
                '@typescript-eslint/unbound-method': 'off',
            },
        },
    ];
}
