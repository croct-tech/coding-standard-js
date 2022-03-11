/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {TSESTree} from '@typescript-eslint/experimental-utils';
import {isCommentToken} from '@typescript-eslint/utils/dist/ast-utils';
import {createRule} from '../createRule';

export const minChainedCallDepth = createRule({
    name: 'min-chained-call-depth',
    meta: {
        type: 'layout',
        docs: {
            description: 'Enforces a minimum depth for multiline chained calls.',
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

                    depth += 1;
                } else if (currentNode.type === 'CallExpression') {
                    currentNode = currentNode.callee;
                }
            }

            return depth;
        }

        function check(node: TSESTree.CallExpression | TSESTree.MemberExpression): void {
            // If the node is a member expression inside a call expression skip, this is to ensure
            // that we consider the correct line length of the result.
            //
            // Example:
            //     ```ts
            //     foo
            //        .bar();
            //     ```
            //     The replacement of this input should be `foo.bar();`, which has 10 character.
            //     Without this check it would consider the length up to `r`, which is 7.
            if (node.type === 'MemberExpression' && node.parent?.type === 'CallExpression') {
                return;
            }

            // If the node is a call expression we need to validate it's callee as a member
            // expression.
            // If the node itself already is a member expression, like the
            // `property` in `this.property.function()`, we validate the node directly.
            const callee = node.type === 'CallExpression' ? node.callee : node;

            if (
                // If the callee is not a member expression, we can skip.
                // For example, root level calls like `foo();`.
                callee.type !== 'MemberExpression'
                // If the callee is a computed member expression, like `foo[bar]()`, we can skip.
                || callee.computed
                // If the callee is already in the same line as it's object, we can skip.
                || callee.object.loc.end.line === callee.property.loc.start.line
            ) {
                return;
            }

            // We only inline the first level of chained calls.
            // If the current call is nested inside another call, we can skip.
            if (getDepth(callee) > 1) {
                return;
            }

            const {maxLineLength = 100} = context.options[0] ?? {};
            const {property} = callee;
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

            const lineLength = callee.object.loc.end.column
                + lastToken.loc.end.column - property.loc.start.column
                + 1
                + (semicolon !== null ? 1 : 0);

            if (maxLineLength !== null && lineLength > maxLineLength) {
                return;
            }

            const punctuator = sourceCode.getTokenBefore(callee.property)!;

            const previousToken = sourceCode.getTokenBefore(punctuator, {includeComments: true})!;
            const nextToken = sourceCode.getTokenAfter(punctuator, {includeComments: true})!;

            if (isCommentToken(previousToken) || isCommentToken(nextToken)) {
                return;
            }

            context.report({
                node: node,
                loc: {
                    start: callee.object.loc.end,
                    end: callee.property.loc.start,
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
            MemberExpression: (node: TSESTree.MemberExpression): void => {
                check(node);
            },
        };
    },
});
