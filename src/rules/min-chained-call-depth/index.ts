/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {TSESTree} from '@typescript-eslint/experimental-utils';
import {isCommentToken} from '@typescript-eslint/utils/dist/ast-utils';
import {createRule} from '../createRule';

export const minChainedCallDepth = createRule({
    name: 'min-chained-call-depth',
    meta: {
        type: 'layout',
        docs: {
            description: 'Require a minimum depth to allow multiline chained calls.',
            recommended: 'error',
        },
        fixable: 'whitespace',
        schema: [
            {
                type: 'object',
                properties: {
                    maxLineLength: {
                        type: 'integer',
                        minimum: 1,
                        default: 100,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            unexpectedLineBreak: 'Unexpected line break.',
        },
    },
    defaultOptions: [
        {
            maxLineLength: 100,
        },
    ],
    create: context => {
        const sourceCode = context.getSourceCode();

        function getDepth(node: TSESTree.MemberExpression | TSESTree.CallExpression): number {
            let depth = 0;
            let currentNode: TSESTree.Node = node;

            while (
                currentNode.type === 'CallExpression'
                || currentNode.type === 'MemberExpression'
            ) {
                if (currentNode.type === 'MemberExpression') {
                    currentNode = currentNode.object;
                } else if (currentNode.type === 'CallExpression') {
                    currentNode = currentNode.callee;
                }

                depth += 1;
            }

            return depth;
        }

        function check(node: TSESTree.CallExpression): void {
            if (
                node.parent?.type === 'MemberExpression'
                || node.parent?.type === 'CallExpression'
                || node.callee.type !== 'MemberExpression'
                || node.callee.computed
                || node.callee.object.loc.end.line === node.callee.property.loc.start.line
            ) {
                return;
            }

            if (getDepth(node) > 3) {
                return;
            }

            const {maxLineLength = 100} = context.options[0] ?? {};
            const {property} = node.callee;
            const lastToken = sourceCode.getLastToken(node, {
                filter: token => token.loc.end.line === property.loc.start.line,
            })!;

            const semicolon = sourceCode.getLastToken(node.parent!, {
                filter: token => (
                    token.loc.start.line === property.loc.start.line
                    && token.type === 'Punctuator'
                    && token.value === ';'
                ),
            });

            const lineLength = node.callee.object.loc.end.column
                + lastToken.loc.end.column - property.loc.start.column
                + 1
                + (semicolon !== null ? 1 : 0);

            if (maxLineLength !== null && lineLength > maxLineLength) {
                return;
            }

            const punctuator = sourceCode.getTokenBefore(node.callee.property)!;

            const previousToken = sourceCode.getTokenBefore(punctuator, {includeComments: true})!;
            const nextToken = sourceCode.getTokenAfter(punctuator, {includeComments: true})!;

            if (isCommentToken(previousToken) || isCommentToken(nextToken)) {
                return;
            }

            context.report({
                node: node,
                loc: {
                    start: node.callee.object.loc.end,
                    end: node.callee.property.loc.start,
                },
                messageId: 'unexpectedLineBreak',
                fix: fixer => fixer.replaceTextRange(
                    [previousToken.range[1], nextToken.range[0]],
                    punctuator.value,
                ),
            });
        }

        return {
            CallExpression: (node: TSESTree.CallExpression): void => {
                check(node);
            },
        };
    },
});
