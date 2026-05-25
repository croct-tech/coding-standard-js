import { defineConfig } from 'tsdown';
import fs from 'node:fs';
import path from 'node:path';
import {parseAst} from 'rolldown/parseAst';

type AstNode = {
    type?: string;
    start?: number;
    end?: number;
    name?: string;
    value?: unknown;
    callee?: AstNode;
    arguments?: AstNode[];
    [key: string]: unknown;
};

type Replacement = {
    start: number;
    end: number;
    value: string;
};

function isNode(value: unknown): value is AstNode {
    return typeof value === 'object' && value !== null && typeof (value as AstNode).type === 'string';
}

function isNodeArray(value: unknown): value is AstNode[] {
    return Array.isArray(value) && value.every(isNode);
}

function isBundledDependency(id: string): boolean {
    return id.includes('/node_modules/') || id.includes('\\node_modules\\');
}

function isPackageJsonSpecifier(value: unknown): value is string {
    return typeof value === 'string' && value.startsWith('.') && path.basename(value) === 'package.json';
}

function findPackageJsonRequires(node: AstNode, visitor: (node: AstNode, specifier: string) => void): void {
    if (
        node.type === 'CallExpression'
        && node.callee?.type === 'Identifier'
        && (node.callee.name === 'cjsRequire' || node.callee.name === 'require')
        && node.arguments?.length === 1
        && node.arguments[0]?.type === 'Literal'
        && isPackageJsonSpecifier(node.arguments[0].value)
    ) {
        visitor(node, node.arguments[0].value);
    }

    for (const value of Object.values(node)) {
        if (isNode(value)) {
            findPackageJsonRequires(value, visitor);
        } else if (isNodeArray(value)) {
            for (const child of value) {
                findPackageJsonRequires(child, visitor);
            }
        }
    }
}

function applyReplacements(code: string, replacements: Replacement[]): string {
    return replacements
        .sort((first, second) => second.start - first.start)
        .reduce(
            (result, replacement) => (
                result.slice(0, replacement.start) + replacement.value + result.slice(replacement.end)
            ),
            code,
        );
}

function inlineBundledPackageJson() {
    return {
        name: 'inline-bundled-package-json',
        transform(code: string, id: string, meta: {ast?: AstNode} = {}) {
            if (!isBundledDependency(id) || !code.includes('package.json')) {
                return null;
            }

            const ast = meta.ast ?? parseAst(code, null, id) as AstNode;
            const replacements: Replacement[] = [];

            findPackageJsonRequires(ast, (node, specifier) => {
                if (node.start === undefined || node.end === undefined) {
                    return;
                }

                const packageJsonPath = path.resolve(path.dirname(id), specifier);

                if (!fs.existsSync(packageJsonPath)) {
                    return;
                }

                replacements.push({
                    start: node.start,
                    end: node.end,
                    value: JSON.stringify(JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))),
                });
            });

            return replacements.length > 0 ? applyReplacements(code, replacements) : null;
        },
    };
}

export default defineConfig({
    entry: ['src/index.ts'],
    format: 'cjs',
    dts: true,
    platform: 'node',
    plugins: [inlineBundledPackageJson()],
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
