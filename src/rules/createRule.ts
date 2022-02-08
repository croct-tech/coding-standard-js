import {ESLintUtils} from '@typescript-eslint/experimental-utils';

export const createRule = ESLintUtils.RuleCreator(
    name => `https://github.com/croct-tech/coding-standard-js/tree/master/docs/${name}.md`,
);
