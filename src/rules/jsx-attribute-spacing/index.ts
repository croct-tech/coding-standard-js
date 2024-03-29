import {TSESTree} from '@typescript-eslint/utils';
import {createRule} from '../createRule';

export const jsxAttributeSpacing = createRule({
    name: 'jsx-attribute-spacing',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforces a surrounding line break in multiline JSX attributes.',
            recommended: 'recommended',
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

        function check(node: TSESTree.JSXAttribute): void {
            const {value} = node;

            if (value === null || value.type !== 'JSXExpressionContainer') {
                return;
            }

            const firstToken = sourceCode.getFirstToken(value.expression)!;
            const lastToken = sourceCode.getLastToken(value.expression)!;

            if (
                (firstToken.type === 'Punctuator' && lastToken.type === 'Punctuator')
                            || (firstToken.loc.start.line === lastToken.loc.end.line)
            ) {
                return;
            }

            const leftBrace = sourceCode.getFirstToken(value)!;
            const rightBrace = sourceCode.getLastToken(value)!;

            const tokens: Array<[TSESTree.Token, TSESTree.Token]> = [
                [leftBrace, firstToken],
                [lastToken, rightBrace],
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
            JSXAttribute: check,
        };
    },
});
