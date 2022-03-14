import {ESLintUtils} from '@typescript-eslint/utils';
import {parameterDestructuring} from './index';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});

ruleTester.run('parameter-destructuring', parameterDestructuring, {
    valid: [
        {code: 'function foo({content}) {}'},
        {code: 'function evaluate(expression, {timeout}) {}'},
        {code: 'const foo = function ({content}) {}'},
        {code: 'class Foo { someMethod({content}) {} }'},
        {code: '({content}) => {}'},
        {code: '({content}) => content'},
    ],
    invalid: [
        {
            code: 'function foo({\ncontent,\ntags,\nvalue}) {}',
            errors: [{
                messageId: 'unexpectedDestructuring',
                line: 1,
                column: 14,
                suggestions: [{
                    messageId: 'unexpectedDestructuring',
                    output: 'function foo(value) {\nconst {\ncontent,\ntags,\nvalue} = value;\n}',
                }],
            }],
        },
        {
            code: 'const foo = function ({\ncontent,\ntags,\nvalue}) {}',
            errors: [{
                messageId: 'unexpectedDestructuring',
                line: 1,
                column: 23,
                suggestions: [{
                    messageId: 'unexpectedDestructuring',
                    output: 'const foo = function (value) {\nconst {\ncontent,\ntags,\nvalue} '
                            + '= value;\n}',
                }],
            }],
        },
        {
            code: 'class Foo { someMethod({\ncontent,\ntags,\nvalue}) {} }',
            errors: [{
                messageId: 'unexpectedDestructuring',
                line: 1,
                column: 24,
                suggestions: [{
                    messageId: 'unexpectedDestructuring',
                    output: 'class Foo { someMethod(value) {\nconst {\ncontent,\ntags,\nvalue} '
                            + '= value;\n} }',
                }],
            }],
        },
        {
            code: '({\ncontent,\ntags,\nvalue}) => {}',
            errors: [{
                messageId: 'unexpectedDestructuring',
                line: 1,
                column: 2,
                suggestions: [{
                    messageId: 'unexpectedDestructuring',
                    output: '(value) => {\nconst {\ncontent,\ntags,\nvalue} = value;\n}',
                }],
            }],
        },
        {
            code: '({\ncontent,\ntags,\nvalue}) => content',
            errors: [{
                messageId: 'unexpectedDestructuring',
                line: 1,
                column: 2,
                suggestions: [],
            }],
        },
    ],
});
