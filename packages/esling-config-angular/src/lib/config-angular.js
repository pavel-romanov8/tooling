import coreConfig from '@pavl-ro/eslint-config-core';
import tseslint from 'typescript-eslint';
import angularEslint from '@angular-eslint/eslint-plugin'; // Import the plugin itself
import angularTemplateParser from '@angular-eslint/template-parser';
import { configs as angularEslintConfigs } from 'angular-eslint'; // Keep access to configs

// --- Configuration Objects (assuming they are flat config compatible) ---
// It's often clearer to merge properties if unsure.
const angularTsRecommendedRules =
  angularEslintConfigs.tsRecommended?.rules ?? {};

const angularTemplateRecommendedRules =
  angularEslintConfigs.templateRecommended?.rules ?? {};

// processInlineTemplates is often a full config object to be included directly
const angularProcessInlineTemplatesConfig =
  angularEslintConfigs.processInlineTemplates;

export default tseslint.config(
  ...coreConfig,

  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslint,
    },
    rules: {
      ...angularTsRecommendedRules,
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true },
      ],
      'jsdoc/tag-lines': 'off',
      '@angular-eslint/no-host-metadata-property': [
        'error',
        { allowStatic: true },
      ],
    },
  },

  {
    files: ['**/*.component.html', '**/*.directive.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint': angularEslint,
    },
    rules: {
      ...angularTemplateRecommendedRules,
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/conditional-complexity': [
        'error',
        { maxComplexity: 1 },
      ],
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/no-inline-styles': [
        'error',
        { allowNgStyle: true, allowBindToStyle: true },
      ],
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
      '@angular-eslint/template/use-track-by-function': 'error',
    },
  },

  angularProcessInlineTemplatesConfig,

  {
    files: ['**/*.spec.ts'],
    rules: {
      'max-lines-per-function': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@angular-eslint/use-component-selector': 'off',
      'jsdoc/require-jsdoc': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
);
