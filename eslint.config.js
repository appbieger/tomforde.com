const globals = require('globals');
const pluginPrettier = require('eslint-plugin-prettier');
const configPrettier = require('eslint-config-prettier');

module.exports = [
  // Global ignores - applies to all configs
  {
    ignores: [
      'site/js/scripts.js', // Third-party bundled libraries
      '_site/**',
      '.jekyll-cache/**',
      'node_modules/**',
      'vendor/**',
      'site/vendor/**',
      'site/js/vendor/**', // Third-party ESM bundles (PhotoSwipe)
      'site/_cloudcannon/**',
      'site/js/bookshop-hosted.js',
    ],
  },

  // Browser JavaScript configuration (site/js/common.js)
  {
    files: ['site/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        // Third-party library globals
        Lightense: 'readonly',
        reframe: 'readonly',
        tns: 'readonly',
        ityped: 'readonly',
        itype_text: 'readonly',
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Variable declarations
      'prefer-const': 'error',
      'no-var': 'error',
      'no-redeclare': 'error',

      // Semicolons
      semi: ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],

      // Code quality
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],

      // Best practices
      'no-console': 'off', // Allow console for browser scripts
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',

      // Spacing and formatting (delegated to Prettier mostly)
      indent: 'off', // Prettier handles this
      'linebreak-style': ['error', 'unix'],
      quotes: 'off', // Prettier handles this
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
      'eol-last': ['error', 'always'],
    },
  },

  // Node.js scripts configuration
  {
    files: ['scripts/**/*.js', 'component-library/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Variable declarations
      'prefer-const': 'error',
      'no-var': 'error',
      'no-redeclare': 'error',

      // Semicolons
      semi: ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],

      // Code quality
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],

      // Best practices for Node.js
      'no-console': 'off', // Console is fine in Node.js scripts
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-process-exit': 'off', // Allow process.exit in scripts

      // Spacing and formatting
      indent: 'off', // Prettier handles this
      'linebreak-style': ['error', 'unix'],
      quotes: 'off', // Prettier handles this
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
      'eol-last': ['error', 'always'],
    },
  },

  // Apply Prettier config last to override any conflicting rules
  configPrettier,
];
