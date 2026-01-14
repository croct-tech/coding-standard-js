import {TSESTree} from '@typescript-eslint/utils';
import {createRule} from '../createRule';

export const complexExpressionSpacing = createRule({
    name: 'complex-expression-spacing',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforces a surrounding line break in complex expression.',
        },
        fixable: 'whitespace',
        schema: [],
        messages: {
            missing: 'Missing new line.',
        },
    },
    defaultOptions: [],
    create: context => {
        const sourceCode = context.getSourceCode();

        function check(node: TSESTree.Expression): void {
            const parentPreviousToken = sourceCode.getTokenBefore(node, {
                filter: token => token.type === TSESTree.AST_TOKEN_TYPES.Punctuator,
            })!;

            const parentNextToken = sourceCode.getTokenAfter(node, {
                filter: token => token.type === TSESTree.AST_TOKEN_TYPES.Punctuator,
            })!;

            if (parentPreviousToken.loc.end.line === parentNextToken.loc.start.line) {
                return;
            }

            const firstToken = sourceCode.getFirstToken(node)!;
            const lastToken = sourceCode.getLastToken(node)!;

            const tokens: Array<[TSESTree.Token, TSESTree.Token]> = [
                [parentPreviousToken, firstToken],
                [lastToken, parentNextToken],
            ];

            for (const [previousToken, currentToken] of tokens) {
                if (previousToken.loc.end.line !== currentToken.loc.start.line) {
                    continue;
                }

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
                    fix: fixer => fixer.replaceTextRange(
                        [tokenBefore.range[1], currentToken.range[0]],
                        '\n',
                    ),
                });
            }
        }

        return {
            ArrowFunctionExpression: (node): void => {
                const {body} = node;

                if (body.type === TSESTree.AST_NODE_TYPES.ConditionalExpression) {
                    check(body);
                }
            },
            IfStatement: (node): void => {
                check(node.test);
            },
        };
    },
});
