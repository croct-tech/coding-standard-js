import path from 'node:path';
import {execFileSync} from 'node:child_process';

const bundlePath = path.resolve(__dirname, '../../dist/index.cjs');

function lint(filename: string, code: string): Array<{ruleId: string | null, message: string}> {
    const script = `
        const {Linter} = require('eslint');
        const {configs} = require(${JSON.stringify(bundlePath)});
        const messages = new Linter().verify(
            ${JSON.stringify(code)},
            configs.typescript,
            {filename: ${JSON.stringify(filename)}},
        );
        process.stdout.write(JSON.stringify(messages));
    `;

    const output = execFileSync('node', ['-e', script], {
        cwd: path.resolve(__dirname, '../..'),
        encoding: 'utf8',
    });

    return JSON.parse(output) as Array<{ruleId: string | null, message: string}>;
}

describe('typescript', () => {
    it('should not apply type-checked rules to pure JS files', () => {
        const messages = lint('file.js', 'const x = 1;\n');

        const typeAwareErrors = messages.filter(
            message => message.message.includes('requires type information'),
        );

        expect(typeAwareErrors).toEqual([]);
    });
});
