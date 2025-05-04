// @ts-check
import coreConfig from '@pavl-ro/eslint-config-core';
import tseslint from 'typescript-eslint';
import angularEslint from 'angular-eslint';

export default tseslint.config(
  ...coreConfig,
  {
    files: ['**/*.ts'],
    extends: [...angularEslint.configs.tsRecommended],
    rules: {
      '@angular-eslint/no-host-metadata-property': [
        'error',
        { allowStatic: true },
      ],
    },
  },

  {
    files: ['**/*.component.ts', '**/*.component.html'],
    processor: angularEslint.processInlineTemplates,
    extends: [
      ...angularEslint.configs.templateRecommended,
      ...angularEslint.configs.templateAccessibility,
    ],
    rules: {
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
);
