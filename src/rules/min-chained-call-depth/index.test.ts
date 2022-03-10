// eslint-disable-next-line import/no-extraneous-dependencies
import {ESLintUtils} from '@typescript-eslint/utils';
import {minChainedCallDepth} from './index';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});

ruleTester.run('min-chained-call-depth', minChainedCallDepth, {
    valid: [
        {code: 'expect(screen.getElementById("very-long-identifier"))\n// comment\n.toBe(true);'},
        {code: 'expect(screen.getElementById("very-long-identifier")).toBe(true);'},
        {
            code: '                    const expressionsOnSameLine = memberExpressions'
                + '\n.filter(hasObjectAndPropertyOnSameLine);',
        },
        {code: 'a()\n.b()\n.c();'},
        {
            code: 'expect(screen.getElementById("very-long-identifier"))\n.toBe(true);',
            options: [
                {
                    maxLineLength: 64,
                },
            ],
        },
        {
            code: 'expect(screen.getElementById("very-long-identifier")).toBe({\nfoo: true\n});',
            options: [
                {
                    maxLineLength: 60,
                },
            ],
        },
    ],
    invalid: [
        {
            code: 'expect(screen.getElementById("very-long-identifier"))\n.toBe(true)',
            output: 'expect(screen.getElementById("very-long-identifier")).toBe(true)',
            errors: [
                {
                    line: 1,
                    column: 54,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
        {
            code: 'expect(screen.getElementById("very-long-identifier"))\n.toBe({\nfoo: true\n});',
            output: 'expect(screen.getElementById("very-long-identifier")).toBe({\nfoo: true\n});',
            options: [
                {
                    maxLineLength: 60,
                },
            ],
            errors: [
                {
                    line: 1,
                    column: 54,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
    ],
});
