export const cypress = {
    extends: [
        'plugin:@croct/javascript',
    ],
    plugins: [
        'cypress',
        '@croct',
    ],
    rules: {
        'no-loop-func': 0,
        'cypress/no-assigning-return-values': 'warn',
        'cypress/no-unnecessary-waiting': 'error',
        'cypress/assertion-before-screenshot': 'warn',
        'cypress/no-async-tests': 'error',
        'cypress/no-pause': 'error',
        '@typescript-eslint/no-namespace': 'off',
    },
};
