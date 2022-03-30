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
        {
            code: 'new StringSchema<ApiKeyPermission>()'
                + '\n.required()'
                + '\n.strict()'
                + '\n.oneOf(Object.values(ApiKeyPermission));',
        },
        {
            code: 'new yup.StringSchema<ApiKeyPermission>()'
                + '\n.required()'
                + '\n.strict()'
                + '\n.oneOf(Object.values(ApiKeyPermission));',
        },
        {
            code: 'await expect(analyzer.isAssignableTo("true", "boolean", true)).rejects'
                + '\n.toThrow(new AnalysisError("Unexpected expression: true"));',
        },
        {code: 'expect(screen.getElementById("very-long-identifier"))\n// comment\n.toBe(true);'},
        {code: 'expect(screen.getElementById("very-long-identifier")).toBe(true);'},
        {
            code: '                    const expressionsOnSameLine = memberExpressions'
                + '\n.filter(hasObjectAndPropertyOnSameLine);',
        },
        {code: 'a().b()\n.c();'},
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
            code: 'a()\n.b()\n.c();',
            output: 'a().b()\n.c();',
            errors: [
                {
                    line: 1,
                    column: 4,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
        {
            code: 'a()\n.b\n.c();',
            output: 'a().b\n.c();',
            errors: [
                {
                    line: 1,
                    column: 4,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
        {
            code: 'a\n.b()\n.c();',
            output: 'a.b()\n.c();',
            errors: [
                {
                    line: 1,
                    column: 2,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
        {
            code: 'a()\n.b()\n.c()\n.d();',
            output: 'a().b()\n.c()\n.d();',
            errors: [
                {
                    line: 1,
                    column: 4,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
        {
            code: 'a()\n.b();',
            output: 'a().b();',
            errors: [
                {
                    line: 1,
                    column: 4,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
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
