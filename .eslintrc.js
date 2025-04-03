module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'prettier', // Keep this to avoid conflicts with Prettier
    ],
    rules: {
      // --- Relaxed Rules (Temporarily) ---
      '@typescript-eslint/no-unsafe-assignment': 'warn', // Warn instead of error
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
  
      // --- Keep These Enabled (Recommended) ---
      '@typescript-eslint/no-explicit-any': 'error', // Force avoiding `any`
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
  
      // --- Optional Relaxations (Add as needed) ---
      '@typescript-eslint/no-non-null-assertion': 'off', // Allow `!` operator
      '@typescript-eslint/ban-ts-comment': 'warn', // Allow `@ts-ignore` with warnings
    },
  };