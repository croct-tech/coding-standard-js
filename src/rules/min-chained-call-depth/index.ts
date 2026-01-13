import {AST_TOKEN_TYPES, AST_NODE_TYPES, TSESTree} from '@typescript-eslint/utils';
import {isCommentToken} from '@typescript-eslint/utils/ast-utils';
import {createRule} from '../createRule';

export const minChainedCallDepth = createRule({
    name: 'min-chained-call-depth',
    meta: {
        type: 'layout',
        docs: {
            description: 'Enforces a minimum depth for multiline chained calls.',
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
                    ignoreChainDeeperThan: {
                        type: 'integer',
                        minimum: 1,
                        maximum: 10,
                        default: 2,
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
            ignoreChainDeeperThan: 2,
        },
    ],
    create: context => {
        const sourceCode = context.getSourceCode();
        let maxDepth = 0;

        function getDepth(node: TSESTree.MemberExpression | TSESTree.CallExpression): number {
            let depth = 0;
            let currentNode: TSESTree.Node = node;

            while (
                currentNode.type === AST_NODE_TYPES.CallExpression
                || currentNode.type === AST_NODE_TYPES.MemberExpression
            ) {
                if (currentNode.type === AST_NODE_TYPES.MemberExpression) {
                    currentNode = currentNode.object;

                    depth += 1;
                } else if (currentNode.type === AST_NODE_TYPES.CallExpression) {
                    currentNode = currentNode.callee;
                }
            }

            return depth;
        }

        function check(node: TSESTree.CallExpression | TSESTree.MemberExpression): void {
            // If the node is a member expression inside a call/new expression skip,
            // this is to ensure that we consider the correct line length of the result.
            //
            // Example:
            //     ```ts
            //     foo
            //        .bar();
            //     ```
            //     The replacement of this input should be `foo.bar();`, which has 10 character.
            //     Without this check it would consider the length up to `r`, which is 7.
            if (
                node.type === AST_NODE_TYPES.MemberExpression
                && node.parent?.type === AST_NODE_TYPES.CallExpression
            ) {
                return;
            }

            // If the node is a call/new expression we need to validate it's callee as a member
            // expression.
            // If the node itself is already a member expression, like the
            // `property` in `this.property.function()`, we validate the node directly.
            const callee = node.type === AST_NODE_TYPES.CallExpression
                ? node.callee
                : node;

            if (
                // If the callee is not a member expression, skip.
                // For example, root level calls like `foo();`.
                callee.type !== AST_NODE_TYPES.MemberExpression
                // If the callee is a computed member expression, like `foo[bar]()`, skip.
                || callee.computed
                || callee.object.type === AST_NODE_TYPES.NewExpression
                // If the callee is already in the same line as it's object, skip.
                || callee.object.loc.end.line === callee.property.loc.start.line
            ) {
                return;
            }

            const currentDepth = getDepth(callee);

            maxDepth = Math.max(maxDepth, currentDepth);

            // Only affect the root level as the total depth is must be known.
            // If the current call is nested inside another call, skip.
            if (currentDepth > 1) {
                return;
            }

            const {maxLineLength = 100, ignoreChainDeeperThan = 2} = context.options[0] ?? {};

            // If the max depth is greater than ignore threshold, skip
            //
            // Example:
            //     ```ts
            //     Array(10)
            //         .fill(0)
            //         .map(x => x + 1)
            //         .slice(0, 5);
            //     ```
            //     In this case the depth is 3, and the default value of ignoreChainDeeperThan is 2.
            //     So the check can be skipped.
            if (maxDepth > ignoreChainDeeperThan) {
                return;
            }

            const {property} = callee;
            const lastToken = sourceCode.getLastToken(node, {
                filter: token => token.loc.end.line === property.loc.start.line,
            })!;

            const semicolon = sourceCode.getLastToken(node.parent!, {
                filter: token => (
                    token.loc.start.line === property.loc.start.line
                    && token.type === AST_TOKEN_TYPES.Punctuator
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
