import baseConfig from '../../eslint.config.mjs';
import coreConfig from '../eslint-config-core/src/lib/config-core.mjs';
import angularConfig from '../eslint-config-angular/src/lib/config-angular.mjs';

export default [
  ...baseConfig,
  ...coreConfig,
  ...angularConfig,
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
