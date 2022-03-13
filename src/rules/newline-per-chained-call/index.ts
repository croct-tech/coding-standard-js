/*
    eslint-disable @typescript-eslint/no-non-null-assertion
    --
    Disable the rule to reduce the number of branches
*/
import {TSESTree} from '@typescript-eslint/experimental-utils';
import {createRule} from '../createRule';

const LINEBREAK_MATCHER = /\r\n|[\r\n\u2028\u2029]/u;

export const newlinePerChainedCall = createRule({
    name: 'newline-per-chained-call',
    meta: {
        type: 'layout',
        docs: {
            description: 'Require a newline after each call in a method chain',
            recommended: 'error',
        },
        fixable: 'whitespace',
        schema: [
            {
                type: 'object',
                properties: {
                    ignoreChainWithDepth: {
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
            ignoreChainWithDepth: 2,
        },
    ],
    create: context => {
        const options = context.options[0] ?? {};
        const ignoreChainWithDepth = options.ignoreChainWithDepth ?? 2;

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
            return token.value !== ')' || token.type !== 'Punctuator';
        }

        function validateCallExpressionIgnoreDepth(
            node: TSESTree.CallExpression | TSESTree.MemberExpression,
        ): void {
            let hasCallExpression = false;

            if (node.type === 'CallExpression') {
                hasCallExpression = true;
            }

            if (
                (node.parent !== undefined)
                && node.parent.type !== 'CallExpression'
                && node.parent.type !== 'MemberExpression'
            ) {
                const memberExpressions = [];

                let currentNode = (
                    node.type === 'CallExpression'
                        ? node.callee
                        : node
                );

                while (
                    currentNode.type === 'CallExpression'
                    || currentNode.type === 'MemberExpression'
                ) {
                    if (currentNode.type === 'MemberExpression') {
                        if (
                            currentNode.property.type === 'Identifier'
                            && !currentNode.computed
                        ) {
                            memberExpressions.push(currentNode);
                        }

                        currentNode = currentNode.object;
                    } else if (currentNode.type === 'CallExpression') {
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
                        rootNode.type === 'MemberExpression'
                        && (rootNode.parent?.type === 'CallExpression'
                            || rootNode.parent?.type === 'MemberExpression')
                        && (rootNode.object.type === 'ThisExpression'
                            || rootNode.object.type === 'Identifier')
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
                if (node.callee?.type === 'MemberExpression') {
                    validateCallExpressionIgnoreDepth(node);
                }
            },
            MemberExpression: (node: TSESTree.MemberExpression): void => {
                validateCallExpressionIgnoreDepth(node);
            },
        };
    },
});
