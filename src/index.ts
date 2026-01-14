import type {ESLint} from 'eslint';
import {rules} from './rules';
import {createJavaScriptConfig} from './configs/javascript';
import {createTypescriptConfig} from './configs/typescript';
import {createReactConfig} from './configs/react';
import {createCypressConfig} from './configs/cypress';

// Create the plugin with just the rules first
const plugin = {
    // Cast from TypeScript Rule Module to ESLint RuleDefinition.
    // Due to variance, TS can't verify the type directly.
    rules: rules as unknown as ESLint.Plugin['rules'],
    configs: {},
} satisfies ESLint.Plugin;

// Create configs with the plugin reference
const javascriptConfig = createJavaScriptConfig(plugin);
const typescriptConfig = createTypescriptConfig(plugin, javascriptConfig);
const reactConfig = createReactConfig(plugin, javascriptConfig);
const cypressConfig = createCypressConfig(plugin, javascriptConfig);

export const configs = {
    javascript: javascriptConfig,
    typescript: typescriptConfig,
    react: reactConfig,
    cypress: cypressConfig,
} as const;

Object.assign(plugin.configs, configs);

// Export the plugin as default
export default plugin as ESLint.Plugin & {
    configs: typeof configs,
};

// Re-export rules and configs for convenience
export {rules};
