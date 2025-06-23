// import angular from '@angular-eslint/builder/configs';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  ...angular(),
   // ① Angular 官方推的預設規則
  {
    files: ['**/*.ts'],
    plugins: { prettier: prettierPlugin },
    rules: {
      // ② 讓 Prettier 報錯顯示在 ESLint
      'prettier/prettier': 'error',
    },
  },
  {
    // ③ 關掉與 Prettier 衝突的規則
    ...prettierConfig,
  },
];
