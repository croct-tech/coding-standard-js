import { defineConfig } from 'eslint/config';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import { configs } from './dist/index.js';

export default defineConfig(
    configs.typescript,
    eslintPlugin.configs['flat/recommended'],
    {
        files: ['src/**/*.ts'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            // Many casts are necessary to account for libraries maintaining compatibility between v8 and v9
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            // ESLint plugin development expects default exports
            'import-x/no-default-export': 'off',
        },
    },
);
