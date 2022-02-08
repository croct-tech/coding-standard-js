export const typescript = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: ['@croct'],
    rules: {
        '@croct/argument-spacing': 'error',
        '@croct/jsx-attribute-spacing': 'error',
    },
};
