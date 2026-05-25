import fs from 'node:fs';
import {createRequire} from 'node:module';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const requireFromTest = createRequire(__filename);

function buildBundle(): string {
    execFileSync('npm', ['run', 'build'], {
        cwd: path.resolve(__dirname, '..'),
        stdio: 'pipe',
    });

    return path.resolve(__dirname, '../dist/index.cjs');
}

describe('published bundle', () => {
    it('inlines metadata for bundled plugins that read their own package.json', () => {
        const bundlePath = buildBundle();
        const bundle = fs.readFileSync(bundlePath, 'utf8');

        expect(bundle).not.toContain('cjsRequire("../package.json")');

        const sandboxRoot = path.resolve(__dirname, '../.tmp');

        fs.mkdirSync(sandboxRoot, {recursive: true});

        const sandbox = fs.mkdtempSync(path.join(sandboxRoot, 'croct-eslint-plugin-'));
        const packageDir = path.join(sandbox, 'node_modules/@croct/eslint-plugin');
        const distDir = path.join(packageDir, 'dist');

        fs.mkdirSync(distDir, {recursive: true});
        fs.copyFileSync(bundlePath, path.join(distDir, 'index.cjs'));
        fs.writeFileSync(
            path.join(packageDir, 'package.json'),
            JSON.stringify({name: '@croct/eslint-plugin', version: '0.0.0-dev', main: 'dist/index.cjs'}),
        );

        const script = [
            `const plugin = require(${JSON.stringify(packageDir)});`,
            'const javascriptConfig = plugin.configs.javascript.at(-1);',
            'process.stdout.write(JSON.stringify(javascriptConfig.plugins[\'import-x\'].meta));',
        ].join('\n');

        const meta = execFileSync(
            'node',
            ['-e', script],
            {cwd: path.resolve(__dirname, '..'), encoding: 'utf8'},
        );

        const importXPackageJson = JSON.parse(
            fs.readFileSync(requireFromTest.resolve('eslint-plugin-import-x/package.json'), 'utf8'),
        ) as {name: string, version: string};

        expect(JSON.parse(meta)).toEqual({
            name: importXPackageJson.name,
            version: importXPackageJson.version,
        });
    });
});
