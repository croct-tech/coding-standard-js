import {AST_NODE_TYPES} from '@typescript-eslint/utils';
import {RuleFix} from '@typescript-eslint/utils/ts-eslint';
import {createRule} from '../createRule';

export const parameterDestructuring = createRule({
    name: 'parameter-destructuring',
    meta: {
        type: 'layout',
        docs: {
            description: 'Prevent noisy destructuring on parameters',
            recommended: 'recommended',
        },
        hasSuggestions: true,
        schema: [],
        messages: {
            unexpectedDestructuring: (
                'Destructuring should not be done in the parameters. '
                + 'Bind to a variable and destructure inside the function.'
            ),
        },
    },
    defaultOptions: [],
    create: context => {
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

                // Allow one-line destructuring
                if (node.loc.start.line === node.loc.end.line) {
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
