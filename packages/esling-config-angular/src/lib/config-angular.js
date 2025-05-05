import angularEslint from 'angular-eslint';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const GLOBALS_BROWSER_FIX = Object.assign({}, globals.browser, {
  AudioWorkletGlobalScope:
    globals.browser['AudioWorkletGlobalScope '] || 'readonly',
});

delete GLOBALS_BROWSER_FIX['AudioWorkletGlobalScope '];

export default tseslint.config(
  {
    files: ['**/*.ts'],
    processor: angularEslint.processInlineTemplates,
    plugins: {
      '@angular-eslint': angularEslint.tsPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2024,
        ...GLOBALS_BROWSER_FIX,
      },
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
