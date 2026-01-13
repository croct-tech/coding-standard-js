import {RuleTester} from '@typescript-eslint/rule-tester';
import {jsxAttributeSpacing} from './index';

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

ruleTester.run('jsx-attribute-spacing', jsxAttributeSpacing, {
    valid: [
        {
            code: '<Foo bar />',
        },
        {
            code: '<Foo bar={true ? 1 : 2} />',
        },
        {
            code: `<Foo bar={
                    true 
                    ? 1 
                    : 2
                  } />`,
        },
        {
            code: `<Foo bar={{
                    a: 1,  
                    b: 2,
                    }} />`,
        },
        {
            code: `<Foo bar={(
                    true
                    )} />`,
        },
        {
            code: `<Foo bar={[
                    1,
                    2,  
                    ]} />`,
        },
    ],
    invalid: [
        {
            code: `<Foo bar={true
                    ? 1
                    : 2} />`,
            output: `<Foo bar={
true
                    ? 1
                    : 2
} />`,
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
                    column: 24,
                    endColumn: 24,
                },
            ],
        },
        {
            code: `<Foo bar={
                    true
                    ? 1
                    : 2} />`,
            output: `<Foo bar={
                    true
                    ? 1
                    : 2
} />`,
            errors: [
                {
                    messageId: 'missing',
                    line: 4,
                    endLine: 4,
                    column: 24,
                    endColumn: 24,
                },
            ],
        },
        {
            code: `<Foo bar={true
                    ? 1
                    : 2
                    } />`,
            output: `<Foo bar={
true
                    ? 1
                    : 2
                    } />`,
            errors: [
                {
                    messageId: 'missing',
                    line: 1,
                    column: 11,
                    endLine: 1,
                    endColumn: 11,
                },
            ],
        },
    ],
});
