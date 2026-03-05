/**
 * Static shim for eslint-plugin-jest-dom.
 *
 * The original plugin uses `requireindex` to dynamically scan its `rules/`
 * directory at runtime, which breaks when bundled. This shim pre-resolves
 * all rule imports so the bundler can include them statically.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports -- CJS plugin with no ESM entry
const packageJson = require('eslint-plugin-jest-dom/package.json') as {name: string, version: string};

const pluginName = packageJson.name;
const pluginVersion = packageJson.version;

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferChecked = require('eslint-plugin-jest-dom/dist/rules/prefer-checked');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferEmpty = require('eslint-plugin-jest-dom/dist/rules/prefer-empty');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferEnabledDisabled = require('eslint-plugin-jest-dom/dist/rules/prefer-enabled-disabled');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferFocus = require('eslint-plugin-jest-dom/dist/rules/prefer-focus');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferInDocument = require('eslint-plugin-jest-dom/dist/rules/prefer-in-document');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferRequired = require('eslint-plugin-jest-dom/dist/rules/prefer-required');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferToHaveAttribute = require('eslint-plugin-jest-dom/dist/rules/prefer-to-have-attribute');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferToHaveClass = require('eslint-plugin-jest-dom/dist/rules/prefer-to-have-class');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferToHaveStyle = require('eslint-plugin-jest-dom/dist/rules/prefer-to-have-style');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferToHaveTextContent = require('eslint-plugin-jest-dom/dist/rules/prefer-to-have-text-content');

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Static rule imports
const preferToHaveValue = require('eslint-plugin-jest-dom/dist/rules/prefer-to-have-value');

const resolve = (m: {default?: unknown}): unknown => m.default ?? m;

const rules = {
    'prefer-checked': resolve(preferChecked),
    'prefer-empty': resolve(preferEmpty),
    'prefer-enabled-disabled': resolve(preferEnabledDisabled),
    'prefer-focus': resolve(preferFocus),
    'prefer-in-document': resolve(preferInDocument),
    'prefer-required': resolve(preferRequired),
    'prefer-to-have-attribute': resolve(preferToHaveAttribute),
    'prefer-to-have-class': resolve(preferToHaveClass),
    'prefer-to-have-style': resolve(preferToHaveStyle),
    'prefer-to-have-text-content': resolve(preferToHaveTextContent),
    'prefer-to-have-value': resolve(preferToHaveValue),
};

const allRules = Object.fromEntries(
    Object.keys(rules).map(rule => [`jest-dom/${rule}`, 'error']),
);

const rulesRef = {rules: rules};

const plugin = {
    meta: {
        name: pluginName,
        version: pluginVersion,
    },
    rules: rules,
    configs: {
        'flat/all': [{plugins: {'jest-dom': rulesRef}, rules: allRules}],
        'flat/recommended': [{plugins: {'jest-dom': rulesRef}, rules: allRules}],
    },
};

export default plugin;
