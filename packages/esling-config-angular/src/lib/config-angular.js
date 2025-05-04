// @ts-check
import tseslint from 'typescript-eslint';
import angularEslint from 'angular-eslint';
import globals from 'globals';

export default tseslint.config(
  ...angularEslint.configs.tsRecommended.map((config) => ({
    files: ['**/*.ts'],
    ...config,
  })),
  {
    files: ['**/*.ts'],
    processor: angularEslint.processInlineTemplates,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2023,
      },
    },
    plugins: {
      '@angular-eslint': angularEslint.tsPlugin,
    },
  },

  {
    files: ['**/*.component.html'],
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
