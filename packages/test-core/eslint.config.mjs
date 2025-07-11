import baseConfig from '../../eslint.config.mjs';
import coreConfig from '@pavl-ro/eslint-config-core';

export default [
  ...baseConfig,
  ...coreConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
