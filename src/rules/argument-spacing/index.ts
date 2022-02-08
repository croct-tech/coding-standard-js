/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/no-extraneous-dependencies
import {TSESTree} from '@typescript-eslint/experimental-utils';
import {createRule} from '../createRule';

export const argumentSpacing = createRule({
    name: 'argument-spacing',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforces consistent spacing in function call arguments.',
            recommended: 'error',
        },
        fixable: 'whitespace',
        schema: [],
        messages: {
            missing: 'Missing new line.',
        },
    },
    defaultOptions: [],
    create: context => {
        function check(node: TSESTree.NewExpression | TSESTree.CallExpression) {
            const sourceCode = context.getSourceCode();

            if (node.arguments.length === 0) {
                return;
            }

            const lastArgument = node.arguments[node.arguments.length - 1];

            const firstToken = sourceCode.getTokenBefore(node.arguments[0], {
                filter: token => token.value === '(',
            })!;

            const lastToken = sourceCode.getTokenAfter(lastArgument, {
                filter: token => token.value === ')',
            })!;

            if (firstToken.loc.start.line === lastToken.loc.end.line) {
                return;
            }

            const lastArgumentFirstToken = sourceCode.getFirstToken(lastArgument)!;

            if (firstToken.loc.start.line === lastArgumentFirstToken.loc.start.line) {
                return;
            }

            const tokens = [
                firstToken,
                ...node.arguments,
                lastToken,
            ];

            for (let i = 1; i < tokens.length; i++) {
                const previousToken = tokens[i - 1]!;
                const currentToken = tokens[i]!;

                if (previousToken.loc.end.line === currentToken.loc.start.line) {
                    const tokenBefore = sourceCode.getTokenBefore(
                        currentToken,
                        {includeComments: true},
                    )!;

                    context.report({
                        node: node,
                        loc: {
                            start: tokenBefore.loc.end,
                            end: currentToken.loc.start,
                        },
                        messageId: 'missing',
                        fix: fixer => fixer.replaceTextRange([tokenBefore.range[1], currentToken.range[0]], '\n'),
                    });
                }
            }
        }

        return {
            CallExpression(node) {
                check(node);
            },
            NewExpression(node) {
                check(node);
            },
        };
    },
});
