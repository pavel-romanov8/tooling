import jsdoc from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';

const ignores = {
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.cache/**',
    '**/*.log',
  ],
};

// The older version of the globals library had this bug
// It was fixed in the later version, however some libraries
// that we're using might still relying on the old implementation.
// Therefore, it is safer to use this approach where we manually fix it
// Related GitHub issie: https://github.com/sindresorhus/globals/issues/239
const GLOBALS_BROWSER_FIX = Object.assign({}, globals.browser, {
  AudioWorkletGlobalScope:
    globals.browser['AudioWorkletGlobalScope '] || 'readonly',
});

delete GLOBALS_BROWSER_FIX['AudioWorkletGlobalScope '];

const customTsRules = {
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/explicit-member-accessibility': 'error',
  '@typescript-eslint/naming-convention': [
    'warn',
    {
      selector: 'default',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    {
      selector: 'enumMember',
      format: ['PascalCase'],
    },
  ],
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',
  '@typescript-eslint/prefer-includes': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/require-array-sort-compare': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/no-empty-object-type': [
    'error',
    {
      allowInterfaces: 'never',
      allowObjectTypes: 'always',
    },
  ],
  '@typescript-eslint/no-inferrable-types': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false,
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
    },
  ],
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/dot-notation': 'error',
};

const customJsDocRules = {
  'jsdoc/require-description-complete-sentence': [
    'error',
    {
      tags: ['see', 'copyright'],
    },
  ],
  'jsdoc/require-param': [
    'error',
    {
      checkDestructured: false,
      enableFixer: false,
    },
  ],
  'jsdoc/require-param-name': 'error',
  'jsdoc/require-param-description': 'error',
  'jsdoc/check-tag-names': 'error',
  'jsdoc/no-types': 'error',
  'jsdoc/check-alignment': 'error',
  'jsdoc/tag-lines': 'error',
  'jsdoc/no-bad-blocks': 'error',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-jsdoc': [
    'error',
    {
      contexts: [
        'ClassDeclaration',
        'TSEnumDeclaration',
        'ExportNamedDeclaration[declaration.type="TSInterfaceDeclaration"]',
        'TSInterfaceDeclaration :matches(TSCallSignatureDeclaration, TSMethodSignature, TSPropertySignature)',
        'TSTypeAliasDeclaration :matches(TSCallSignatureDeclaration, TSMethodSignature, TSPropertySignature)',
        'ExportNamedDeclaration[declaration.type="TSTypeAliasDeclaration"]',
        'ExportNamedDeclaration[declaration.type="VariableDeclaration"]',
        'MethodDefinition:not([accessibility="private"])',
        'PropertyDefinition:not([accessibility="private"])',
      ],
      checkConstructors: false,
      checkGetters: true,
      checkSetters: true,
      enableFixer: false,
    },
  ],
};

const jsDocRecommended = jsdoc.configs['flat/recommended-typescript-error'];

export default tseslint.config(
  ignores,
  js.configs.recommended,
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    extends: [tseslint.configs.strictTypeChecked, jsDocRecommended],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...GLOBALS_BROWSER_FIX,
        ...globals.node,
        ...globals.es2024,
      },
    },
    plugins: {
      jsdoc,
    },
    rules: {
      ...customTsRules,
      ...customJsDocRules,
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    extends: [jsDocRecommended],
    plugins: {
      jsdoc,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...GLOBALS_BROWSER_FIX,
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      ...customJsDocRules,
    },
  },
  {
    files: ['eslint.config.{js,mjs,cjs}'],
    extends: [jsDocRecommended],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      jsdoc,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Allow require if using .cjs
    },
  },
  {
    files: ['**/*.spec.ts'],
    extends: [jsDocRecommended],
    rules: {
      'max-lines-per-function': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'jsdoc/require-jsdoc': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
);
