import {TSESTree} from '@typescript-eslint/utils';
import {createRule} from '../createRule';

const LINEBREAK_MATCHER = /\r\n|[\r\n\u2028\u2029]/u;

export const newlinePerChainedCall = createRule({
    name: 'newline-per-chained-call',
    meta: {
        type: 'layout',
        docs: {
            description: 'Require a newline after each call in a method chain',
        },
        fixable: 'whitespace',
        schema: [
            {
                type: 'object',
                properties: {
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
            expectedLineBreak: 'Expected line break before `{{propertyName}}`.',
        },
    },
    defaultOptions: [
        {
            ignoreChainDeeperThan: 2,
        },
    ],
    create: context => {
        const options = context.options[0] ?? {};
        const ignoreChainWithDepth = options.ignoreChainDeeperThan ?? 2;

        const sourceCode = context.getSourceCode();

        function getPropertyText(node: TSESTree.MemberExpression): string {
            const prefix = '.';
            const lines = sourceCode.getText(node.property).split(LINEBREAK_MATCHER);

            return prefix + lines[0];
        }

        function hasObjectAndPropertyOnSameLine(node: TSESTree.MemberExpression): boolean {
            return node.object.loc.end.line === node.property.loc.start.line;
        }

        function isNotClosingParenToken(token: TSESTree.Token): boolean {
            return token.value !== ')' || token.type !== TSESTree.AST_TOKEN_TYPES.Punctuator;
        }

        function validateCallExpressionIgnoreDepth(
            node: TSESTree.CallExpression | TSESTree.MemberExpression,
        ): void {
            let hasCallExpression = false;

            if (node.type === TSESTree.AST_NODE_TYPES.CallExpression) {
                hasCallExpression = true;
            }

            if (
                node.parent != null
                && node.parent.type !== TSESTree.AST_NODE_TYPES.CallExpression
                && node.parent.type !== TSESTree.AST_NODE_TYPES.MemberExpression
            ) {
                const memberExpressions = [];

                let currentNode: TSESTree.Expression = (
                    'callee' in node
                        ? node.callee
                        : node
                );

                while (
                    currentNode.type === TSESTree.AST_NODE_TYPES.CallExpression
                    || currentNode.type === TSESTree.AST_NODE_TYPES.MemberExpression
                ) {
                    if (currentNode.type === TSESTree.AST_NODE_TYPES.MemberExpression) {
                        if (
                            currentNode.property.type === TSESTree.AST_NODE_TYPES.Identifier
                            && !currentNode.computed
                        ) {
                            memberExpressions.push(currentNode);
                        }

                        currentNode = currentNode.object;
                    } else if (currentNode.type === TSESTree.AST_NODE_TYPES.CallExpression) {
                        currentNode = currentNode.callee;
                    }
                }

                if (
                    memberExpressions.length > ignoreChainWithDepth
                    && hasCallExpression
                    && memberExpressions.some(hasObjectAndPropertyOnSameLine)
                ) {
                    const expressionsOnSameLine = memberExpressions
                        .filter(hasObjectAndPropertyOnSameLine);
                    const rootNode = expressionsOnSameLine[expressionsOnSameLine.length - 1];

                    if (
                        rootNode.type === TSESTree.AST_NODE_TYPES.MemberExpression
                        && (rootNode.parent != null && (rootNode.parent.type === TSESTree.AST_NODE_TYPES.CallExpression
                            || rootNode.parent.type === TSESTree.AST_NODE_TYPES.MemberExpression))
                        && (rootNode.object.type === TSESTree.AST_NODE_TYPES.ThisExpression
                            || rootNode.object.type === TSESTree.AST_NODE_TYPES.Identifier)
                    ) {
                        expressionsOnSameLine.pop();
                    }

                    expressionsOnSameLine.forEach(memberExpression => {
                        context.report({
                            node: memberExpression.property,
                            loc: memberExpression.property.loc.start,
                            messageId: 'expectedLineBreak',
                            data: {
                                propertyName: getPropertyText(memberExpression),
                            },
                            fix: fixer => {
                                const firstTokenAfterObject = sourceCode.getTokenAfter(
                                    memberExpression.object,
                                    isNotClosingParenToken,
                                );

                                return fixer.insertTextBefore(firstTokenAfterObject!, '\n');
                            },
                        });
                    });
                }
            }
        }

        return {
            CallExpression: (node: TSESTree.CallExpression): void => {
                if (node.callee?.type === TSESTree.AST_NODE_TYPES.MemberExpression) {
                    validateCallExpressionIgnoreDepth(node);
                }
            },
            MemberExpression: (node: TSESTree.MemberExpression): void => {
                validateCallExpressionIgnoreDepth(node);
            },
        };
    },
});
