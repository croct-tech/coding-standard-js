import type {Linter} from 'eslint';
import cypressPlugin from 'eslint-plugin-cypress';

// Factory function to create Cypress config with the plugin reference
export function createCypressConfig(plugin: any, javascriptConfig: Linter.Config[]): Linter.Config[] {
    return [
        ...javascriptConfig,
        {
            name: '@croct/cypress',
            plugins: {
                cypress: cypressPlugin,
                '@croct': plugin,
            },
            rules: {
                'no-loop-func': 0,
                'cypress/no-assigning-return-values': 'warn',
                'cypress/no-unnecessary-waiting': 'error',
                'cypress/assertion-before-screenshot': 'warn',
                'cypress/no-async-tests': 'error',
                'cypress/no-pause': 'error',
                '@typescript-eslint/no-namespace': 'off',
            },
        },
    ];
}
