import { defineConfig } from 'tsdown';
import path from 'node:path';

export default defineConfig({
    entry: ['src/index.ts'],
    format: 'cjs',
    dts: true,
    platform: 'node',
    alias: {
        // Redirect to a shim that statically resolves rules
        // (the original uses `requireindex` which breaks in bundles)
        'eslint-plugin-jest-dom': path.resolve('src/shims/eslint-plugin-jest-dom.ts'),
    },
    deps: {
        // Native bindings can't be bundled
        neverBundle: [
            /^@unrs\//,
            /^@eslint\//,
            'eslint',
            'unrs-resolver',
        ],
    },
});
