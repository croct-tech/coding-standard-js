/*
 eslint-disable @typescript-eslint/no-non-null-assertion
 --
 Disable the rule to reduce the number of branches
 */
import {AST_NODE_TYPES} from '@typescript-eslint/types';
import {RuleFix} from '@typescript-eslint/utils/dist/ts-eslint';
import {createRule} from '../createRule';

export const parameterDestructuring = createRule({
    name: 'parameter-destructuring',
    meta: {
        type: 'layout',
        docs: {
            description: 'Prevent noisy destructuring on parameters',
            recommended: 'error',
        },
        hasSuggestions: true,
        schema: [
            {
                type: 'object',
                properties: {
                    allowSingleLine: {
                        type: 'boolean',
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            unexpectedDestructuring: (
                'Destructuring should not be done in the parameters. '
                + 'Bind to a variable and destructure inside the function.'
            ),
        },
    },
    defaultOptions: [
        {
            allowSingleLine: true,
        },
    ],
    create: context => {
        const options = context.options[0] ?? {};
        const allowSingleLine = options.allowSingleLine ?? true;

        const sourceCode = context.getSourceCode();

        return {
            ObjectPattern: function checkObjectPattern(node): void {
                const {parent} = node;

                // Skip for destructuring in contexts unrelated to function parameters
                if (
                    parent?.type !== AST_NODE_TYPES.FunctionExpression
                    && parent?.type !== AST_NODE_TYPES.FunctionDeclaration
                    && parent?.type !== AST_NODE_TYPES.ArrowFunctionExpression
                ) {
                    return;
                }

                // Allow one-line destructuring when there is a single parameter
                if (
                    allowSingleLine
                    && parent.params.length === 1
                    && parent.loc.start.line === node.loc.start.line
                    && parent.loc.start.line === node.loc.end.line
                ) {
                    return;
                }

                const {body} = parent;

                context.report({
                    node: node,
                    messageId: 'unexpectedDestructuring',
                    suggest: body.type === AST_NODE_TYPES.BlockStatement
                        ? [
                            {
                                messageId: 'unexpectedDestructuring',
                                fix: (fixer): RuleFix[] => [
                                    // Replace the destructuring with a variable declaration
                                    fixer.replaceText(node, 'value'),

                                    // Add the destructuring inside the body
                                    fixer.insertTextAfter(
                                        // Null safety: a block expression always have the `{` token
                                        // opening the body of the function.
                                        sourceCode.getFirstToken(body)!,
                                        `\nconst ${sourceCode.getText(node)} = value;\n`,
                                    ),
                                ],
                            },
                        ]
                        : null,
                });
            },
        };
    },
});
