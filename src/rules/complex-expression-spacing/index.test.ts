// eslint-disable-next-line import/no-extraneous-dependencies
import {ESLintUtils} from '@typescript-eslint/utils';
import {complexExpressionSpacing} from './index';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('complex-expression-spacing', complexExpressionSpacing, {
    valid: [
        {
            code: 'foo => (foo === null ? 1 : 2)',
        },
        {
            code: `foo => bar(
            1,
            2,
            3)`,
        },
        {
            code: `foo => (
                foo === null ? 1 : 2
            )`,
        },
        {
            code: 'if (foo === null ? 1 : 2) return;',
        },
        {
            code: `if (
                foo === null ? 1 : 2
            ) return;`,
        },
    ],
    invalid: [
        {
            code: `foo => (foo === null
                    ? 1
                    : 2)`,
            output: `foo => (
foo === null
                    ? 1
                    : 2
)`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    endLine: 1,
                    column: 9,
                    endColumn: 9,
                },
                {
                    messageId: 'missing',
                    line: 3,
                    endLine: 3,
                    column: 24,
                    endColumn: 24,
                },
            ],
        },
        {
            code: `if (foo
            || bar) return`,
            output: `if (
foo
            || bar
) return`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    endLine: 1,
                    column: 5,
                    endColumn: 5,
                },
                {
                    messageId: 'missing',
                    line: 2,
                    endLine: 2,
                    column: 19,
                    endColumn: 19,
                },
            ],
        },
    ],
});
