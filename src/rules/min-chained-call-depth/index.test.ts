import {RuleTester} from '@typescript-eslint/rule-tester';
import {minChainedCallDepth} from './index';

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

ruleTester.run('min-chained-call-depth', minChainedCallDepth, {
    valid: [
        {
            code: 'Array(10)\n.fill(0)\n.map(foo => foo)\n.slice(1);',
        },
        {
            code: 'Array(10).fill(0)\n.map(foo => foo)\n.slice(1);',
            options: [
                {
                    maxLineLength: 100,
                    ignoreChainDeeperThan: 2,
                },
            ],
        },
        {
            code: 'Array(10)\n.foo\n.fill(0)\n.map(foo => foo)\n.slice(1);',
        },
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
                    ignoreChainDeeperThan: 3,
                },
            ],
        },
        {
            code: 'expect(screen.getElementById("very-long-identifier")).toBe({\nfoo: true\n});',
            options: [
                {
                    maxLineLength: 60,
                    ignoreChainDeeperThan: 3,
                },
            ],
        },
    ],
    invalid: [
        {
            code: 'Array(10)\n.fill(0)\n.map(foo => foo);',
            output: 'Array(10).fill(0)\n.map(foo => foo);',
            options: [
                {
                    maxLineLength: 100,
                    ignoreChainDeeperThan: 3,
                },
            ],
            errors: [
                {
                    line: 1,
                    column: 10,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
        {
            code: 'Array(10)\n.fill(10);',
            output: 'Array(10).fill(10);',
            errors: [
                {
                    line: 1,
                    column: 10,
                    messageId: 'unexpectedLineBreak',
                },
            ],
        },
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
                    ignoreChainDeeperThan: 3,
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
