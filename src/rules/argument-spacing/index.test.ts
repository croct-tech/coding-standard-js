// eslint-disable-next-line import/no-extraneous-dependencies
import {ESLintUtils} from '@typescript-eslint/utils';
import {argumentSpacing} from './index';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('argument-spacing', argumentSpacing, {
    valid: [
        {
            code: `foo(
            bar => true
            )`,
        },
        {
            code: 'new Example(1, 2, 3);',
        },
        {
            code: `new Example(
                1,
                2,
                3,
            );`,
        },
        {
            code: `new Example(1, () => {
                console.log('Example');
            });`,
        },
        {
            code: `example(1, () => {
                console.log('Example');
            });`,
        },
        {
            code: `new Example(() => {
                console.log('Example');
            });`,
        },
        {
            code: `example(() => {
                console.log('Example');
            });`,
        },
        {
            code: 'useEffect(() => console.log(1), []);',
        },
        {
            code: `useEffect(
                () => console.log(1),
                [],
            );`,
        },
        {
            code: `foo()
            .first(1, 2)
            .second(3, 4)
            .done();`,
        },
    ],
    invalid: [
        {
            code: `new Example(1,
            2,
            3);`,
            output: `new Example(
1,
            2,
            3
);`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    endLine: 1,
                    column: 13,
                    endColumn: 13,
                },
                {
                    messageId: 'missing',
                    line: 3,
                    endLine: 3,
                    column: 14,
                    endColumn: 14,
                },
            ],
        },
        {
            code: `new Example(1,
            2,
            3
            );`,
            output: `new Example(
1,
            2,
            3
            );`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    endLine: 1,
                    column: 13,
                    endColumn: 13,
                },
            ],
        },
        {
            code: `useEffect(() => {
                console.log(1);
            }, []);`,
            output: `useEffect(
() => {
                console.log(1);
            },
[]
);`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    endLine: 1,
                    column: 11,
                    endColumn: 11,
                },
                {
                    messageId: 'missing',
                    line: 3,
                    endLine: 3,
                    column: 15,
                    endColumn: 16,
                },
                {
                    messageId: 'missing',
                    line: 3,
                    endLine: 3,
                    column: 18,
                    endColumn: 18,
                },
            ],
        },
        {
            code: `useEffect(() => {
                console.log(1);
            },
            []);`,
            output: `useEffect(
() => {
                console.log(1);
            },
            []
);`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    endLine: 1,
                    column: 11,
                    endColumn: 11,
                },
                {
                    messageId: 'missing',
                    line: 4,
                    endLine: 4,
                    column: 15,
                    endColumn: 15,
                },
            ],
        },
        {
            code: `useEffect(() => {
                console.log(1);
            },
            []
            );`,
            output: `useEffect(
() => {
                console.log(1);
            },
            []
            );`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    endLine: 1,
                    column: 11,
                    endColumn: 11,
                },
            ],
        },
        {
            code: `useEffect(
            () => {
                console.log(1);
            }, []);`,
            output: `useEffect(
            () => {
                console.log(1);
            },
[]
);`,
            errors: [
                {
                    messageId: 'missing',
                    line: 4,
                    endLine: 4,
                    column: 15,
                    endColumn: 16,
                },
                {
                    messageId: 'missing',
                    line: 4,
                    endLine: 4,
                    column: 18,
                    endColumn: 18,
                },
            ],
        },
        {
            code: `foo(bar =>
                true
            );`,
            output: `foo(
bar =>
                true
            );`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    endLine: 1,
                    column: 5,
                    endColumn: 5,
                },
            ],
        },
    ],
});
