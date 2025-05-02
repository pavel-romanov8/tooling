import baseConfig from '../../eslint.config.mjs';
import coreConfig from '../eslint-config-core/src/lib/config-core.mjs';

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
