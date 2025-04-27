import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  {
    
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
