import {argumentSpacing} from './argument-spacing';
import {jsxAttributeSpacing} from './jsx-attribute-spacing';
import {complexExpressionSpacing} from './complex-expression-spacing';
import {newlinePerChainedCall} from './newline-per-chained-call';
import {minChainedCallDepth} from './min-chained-call-depth';
import {parameterDestructuring} from './parameter-destructuring';

export const rules = {
    'argument-spacing': argumentSpacing,
    'jsx-attribute-spacing': jsxAttributeSpacing,
    'complex-expression-spacing': complexExpressionSpacing,
    'newline-per-chained-call': newlinePerChainedCall,
    'min-chained-call-depth': minChainedCallDepth,
    'parameter-destructuring': parameterDestructuring,
};
