// eslint-disable-next-line import/no-extraneous-dependencies
import {ESLintUtils} from '@typescript-eslint/utils';
import {newlinePerChainedCall} from './index';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});

ruleTester.run('newline-per-chained-call', newlinePerChainedCall, {
    valid: [
        {code: '_\n.chain({})\n.map(foo)\n.filter(bar)\n.value();'},
        {code: 'a()\n.b()\n.c\n.e'},
        {code: 'const a = m1.m2(); let b = m1.m2();\nvar c = m1.m2()'},
        {code: 'const a = m1()\n.m2();'},
        {code: 'const a = m1();'},
        {code: 'a().b().c'},
        {code: 'const foo = a.b.c.e.d'},
        {code: "a.b.c.e.d = 'foo'"},
        {code: 'a().b().c()'},
        {code: 'const a = window\n.location\n.href\n.match(/(^[^#]*)/)[0];'},
        {code: "const a = window['location']\n.href\n.match(/(^[^#]*)/)[0];"},
        {code: "const a = window['location'].href.match(/(^[^#]*)/)[0];"},
        {
            code: 'const a = m1().m2.m3().m4;',
            options: [
                {
                    ignoreChainWithDepth: 4,
                },
            ],
        },
        {
            code: 'const a = m1().m2.m3().m4.m5().m6.m7().m8.m9();',
            options: [
                {
                    ignoreChainWithDepth: 8,
                },
            ],
        },
    ],
    invalid: [
        {
            code: 'a.b.c.e.d()',
            output: 'a\n.b\n.c\n.e\n.d()',
            errors: [
                {
                    line: 1,
                    column: 3,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 1,
                    column: 5,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 1,
                    column: 7,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 1,
                    column: 9,
                    messageId: 'expectedLineBreak',
                },
            ],
        },
        {
            code: '_\n.chain({})\n.map(foo)\n.filter(bar).value();',
            output: '_\n.chain({})\n.map(foo)\n.filter(bar)\n.value();',
            errors: [
                {
                    messageId: 'expectedLineBreak',
                    line: 4,
                    column: 14,
                },
            ],
        },
        {
            code: 'a().b().c().e.d()',
            output: 'a()\n.b()\n.c()\n.e\n.d()',
            errors: [
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 5,
                },
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 9,
                },
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 13,
                },
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 15,
                },
            ],
        },
        {
            code: 'a.b.c().e().d()',
            output: 'a\n.b\n.c()\n.e()\n.d()',
            errors: [
                {
                    line: 1,
                    column: 3,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 1,
                    column: 5,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 1,
                    column: 9,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 1,
                    column: 13,
                    messageId: 'expectedLineBreak',
                },
            ],
        },
        {
            code: '_.chain({}).map(a).value();',
            output: '_\n.chain({})\n.map(a)\n.value();',
            errors: [
                {
                    line: 1,
                    column: 3,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 1,
                    column: 13,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 1,
                    column: 20,
                    messageId: 'expectedLineBreak',
                },
            ],
        },
        {
            code: 'const a = m1().m2\n.m3().m4().m5().m6().m7();',
            output: 'const a = m1()\n.m2\n.m3()\n.m4()\n.m5()\n.m6()\n.m7();',
            options: [
                {
                    ignoreChainWithDepth: 3,
                },
            ],
            errors: [
                {
                    line: 1,
                    column: 16,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 2,
                    column: 7,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 2,
                    column: 12,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 2,
                    column: 17,
                    messageId: 'expectedLineBreak',
                },
                {
                    line: 2,
                    column: 22,
                    messageId: 'expectedLineBreak',
                },
            ],
        },
        {
            code: '(foo).bar().biz()',
            output: '(foo)\n.bar()\n.biz()',
            options: [
                {
                    ignoreChainWithDepth: 1,
                },
            ],
            errors: [
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 7,
                },
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 13,
                },
            ],
        },
        {
            code: 'foo.bar(). /* comment */ biz()',
            output: 'foo\n.bar()\n. /* comment */ biz()',
            options: [
                {
                    ignoreChainWithDepth: 1,
                },
            ],
            errors: [
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 5,
                },
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 26,
                },
            ],
        },
        {
            code: 'foo.bar() /* comment */ .biz()',
            output: 'foo\n.bar() /* comment */ \n.biz()',
            options: [
                {
                    ignoreChainWithDepth: 1,
                },
            ],
            errors: [
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 5,
                },
                {
                    messageId: 'expectedLineBreak',
                    line: 1,
                    column: 26,
                },
            ],
        },
    ],
});
