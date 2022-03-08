import {argumentSpacing} from './argument-spacing';
import {jsxAttributeSpacing} from './jsx-attribute-spacing';
import {complexExpressionSpacing} from './complex-expression-spacing';
import {newlinePerChainedCall} from './newline-per-chained-call';

export const rules = {
    'argument-spacing': argumentSpacing,
    'jsx-attribute-spacing': jsxAttributeSpacing,
    'complex-expression-spacing': complexExpressionSpacing,
    'newline-per-chained-call': newlinePerChainedCall,
};
